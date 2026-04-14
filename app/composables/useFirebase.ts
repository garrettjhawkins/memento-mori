import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'
import type { ModeKey, PlanPayload } from '~/types/life'

const firebaseConfigRest = {
  authDomain: 'memento-mori-cc734.firebaseapp.com',
  projectId: 'memento-mori-cc734',
  storageBucket: 'memento-mori-cc734.firebasestorage.app',
  messagingSenderId: '187129185019',
  appId: '1:187129185019:web:5dbfbc3d557a121949a65e',
} as const

let app: ReturnType<typeof initializeApp> | null = null
let db: ReturnType<typeof getFirestore> | null = null
let auth: ReturnType<typeof getAuth> | null = null

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export function useFirebase() {
  const runtimeConfig = useRuntimeConfig()
  const currentUser = ref<import('firebase/auth').User | null>(null)
  const store = useLifeStore()

  function ensureApp() {
    if (!import.meta.client) return
    if (!app) {
      const apiKey = runtimeConfig.public.firebaseApiKey as string | undefined
      if (!apiKey) {
        console.error('[Firebase] Missing FIREBASE_API_KEY (set in env, exposed as runtimeConfig.public.firebaseApiKey)')
        return
      }
      app = initializeApp({ apiKey, ...firebaseConfigRest })
      db = getFirestore(app)
      auth = getAuth(app)
    }
  }

  async function ensureUserDoc(user: import('firebase/auth').User) {
    ensureApp()
    if (!db) return
    const docRef = doc(db, 'users', user.uid)
    const docSnap = await getDoc(docRef)
    if (!docSnap.exists()) {
      await setDoc(docRef, {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      return
    }
    const data = docSnap.data()
    if (!data.createdAt) {
      await setDoc(
        docRef,
        {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        { merge: true },
      )
    }
  }

  async function saveUserData(updates: Record<string, unknown>) {
    const u = currentUser.value
    if (!u || !db) return
    const docRef = doc(db, 'users', u.uid)
    await setDoc(
      docRef,
      {
        ...updates,
        updatedAt: new Date().toISOString(),
      },
      { merge: true },
    )
  }

  async function loadUserData() {
    const u = currentUser.value
    if (!u || !db) return
    const docRef = doc(db, 'users', u.uid)
    const docSnap = await getDoc(docRef)
    if (!docSnap.exists()) return
    const data = docSnap.data() as {
      mode?: string
      birthdate?: string
      latestGoal?: PlanPayload
    }

    if (data.mode) {
      store.setMode(data.mode as ModeKey)
    }
    if (data.birthdate) {
      store.setBirthdate(data.birthdate)
    }
    if (data.latestGoal) {
      if (import.meta.client) {
        localStorage.setItem('mm_plan', JSON.stringify(data.latestGoal))
      }
      store.setActivePlan(data.latestGoal)
    }
  }

  async function signIn() {
    ensureApp()
    if (!auth) return
    const provider = new GoogleAuthProvider()
    try {
      await signInWithPopup(auth, provider)
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'sign_in', { method: 'google' })
      }
    } catch (e) {
      console.error('Auth error:', e)
    }
  }

  async function handleSignOut() {
    ensureApp()
    if (!auth) return
    await signOut(auth)
  }

  async function saveLatestGoalToFirebase(planPayload: PlanPayload) {
    if (!currentUser.value) return
    try {
      await saveUserData({ latestGoal: planPayload })
    } catch (e) {
      console.error('Error saving latestGoal:', e)
    }
  }

  onMounted(() => {
    if (!import.meta.client) return
    ensureApp()
    if (!auth) return
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        currentUser.value = user
        const providerId = user.providerData[0]?.providerId ?? 'unknown'
        console.info('[Firebase Auth] Signed in', {
          uid: user.uid,
          email: user.email ?? '(none)',
          displayName: user.displayName ?? '(none)',
          emailVerified: user.emailVerified,
          providerId,
        })
        if (typeof window.gtag === 'function') {
          window.gtag('config', 'G-ZEKX6ET0ST', { user_id: user.uid })
        }
        await ensureUserDoc(user)
        await loadUserData()
        console.info('[Firebase Auth] User document synced and profile data loaded')
      } else {
        currentUser.value = null
        console.info('[Firebase Auth] Signed out (no active session)')
      }
    })
  })

  watch(
    () => store.birthdate,
    (v) => {
      if (currentUser.value) saveUserData({ birthdate: v })
    },
  )

  watch(
    () => store.mode,
    (m) => {
      if (currentUser.value) saveUserData({ mode: m })
    },
  )

  return {
    currentUser,
    signIn,
    signOut: handleSignOut,
    saveUserData,
    saveLatestGoalToFirebase,
  }
}
