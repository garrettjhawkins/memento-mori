<script setup lang="ts">
import { PATHS } from '~/data/lifeModes'
import type { ModeKey } from '~/types/life'

const store = useLifeStore()
const { MODES } = useMode()

const modeOptions: { value: ModeKey; label: string }[] = [
  { value: 'skulls', label: '💀  Skulls' },
  { value: 'hotdogs', label: '🌭  Hot Dogs' },
  { value: 'steps', label: '👟  Steps' },
  { value: 'sneezes', label: '🤧  Sneezes' },
]

const headerPath = computed(() => PATHS[store.mode as ModeKey])

const maxBirth = computed(() => new Date().toISOString().split('T')[0])

function onModeChange(e: Event) {
  const v = (e.target as HTMLSelectElement).value as ModeKey
  store.setMode(v)
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'mode_changed', { mode: v })
  }
}

function onBirthChange(e: Event) {
  const v = (e.target as HTMLInputElement).value
  store.setBirthdate(v)
}

function onMilestoneClick() {
  store.toggleMilestones()
}

const firebase = inject<ReturnType<typeof useFirebase>>('firebase')!
const { currentUser, signIn, signOut } = firebase

function onAuthClick() {
  if (currentUser.value) signOut()
  else signIn()
}

const authLabel = computed(() =>
  currentUser.value ? 'Sign out' : 'Sign in with Google',
)

const title = computed(() => MODES[store.mode as ModeKey].title || 'Memento Mori')
const tagline = computed(() => MODES[store.mode as ModeKey].tagline)
</script>

<template>
  <div class="top-bar flex shrink-0 items-center gap-7 max-[600px]:mb-2 max-[600px]:flex-col max-[600px]:items-stretch max-[600px]:gap-2">
    <header class="flex shrink-0 items-center gap-2.5 max-[600px]:justify-center">
      <svg
        class="header-icon h-5 w-5 shrink-0 text-[var(--black)]"
        viewBox="0 0 32 32"
        fill="currentColor"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path :fill-rule="headerPath.fillRule" :d="headerPath.d" />
      </svg>
      <div class="brand-text flex flex-col">
        <h1 class="whitespace-nowrap text-[0.9rem] font-bold uppercase tracking-[0.35em]">
          {{ title }}
        </h1>
        <p class="tagline mt-[3px] text-[0.6rem] lowercase tracking-[0.12em] text-[var(--muted)]">
          {{ tagline }}
        </p>
      </div>
    </header>

    <div class="input-section flex min-h-0 shrink-0 flex-1 items-end gap-3 max-[600px]:flex-col max-[600px]:items-stretch">
      <div class="input-group flex min-w-0 flex-1 flex-col gap-1.5">
        <label class="input-label block text-[0.62rem] uppercase tracking-[0.15em] text-[var(--muted)]" for="mode">View as</label>
        <select
          id="mode"
          :value="store.mode"
          class="h-[34px] w-full cursor-pointer appearance-none rounded-md border border-[var(--border)] bg-[var(--input-bg)] px-3 text-[0.88rem] text-[var(--black)] outline-none transition-[border-color] duration-200 focus:border-[var(--black)]"
          style="
            background-image: url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2712%27 height=%2712%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23888%27 stroke-width=%272%27%3E%3Cpolyline points=%276 9 12 15 18 9%27%3E%3C/polyline%3E%3C/svg%3E');
            background-repeat: no-repeat;
            background-position: right 10px center;
            padding-right: 30px;
          "
          @change="onModeChange"
        >
          <option v-for="opt in modeOptions" :key="opt.value" :value="opt.value">
            {{ opt.label }}
          </option>
        </select>
      </div>
      <div class="input-group flex min-w-0 flex-1 flex-col gap-1.5">
        <label class="input-label block text-[0.62rem] uppercase tracking-[0.15em] text-[var(--muted)]" for="birthdate">Date of birth</label>
        <input
          id="birthdate"
          type="date"
          :value="store.birthdate"
          :max="maxBirth"
          class="h-[34px] w-full cursor-pointer appearance-none rounded-md border border-[var(--border)] bg-[var(--input-bg)] px-3 text-[0.88rem] leading-[32px] text-[var(--black)] outline-none transition-[border-color] duration-200 focus:border-[var(--black)]"
          @input="onBirthChange"
          @change="onBirthChange"
        />
      </div>
      <div class="input-group flex w-auto shrink-0 flex-col gap-1.5" style="flex: 0 0 auto">
        <label class="input-label block text-[0.62rem] uppercase tracking-[0.15em] text-[var(--muted)]">Milestones</label>
        <button
          type="button"
          class="milestone-btn h-[34px] w-full rounded-md border border-[var(--border)] bg-[var(--input-bg)] px-3 text-center text-[0.88rem] text-[var(--black)] transition-colors duration-150"
          :class="{ active: store.milestonesActive }"
          @click="onMilestoneClick"
        >
          {{ store.milestonesActive ? 'On' : 'Off' }}
        </button>
      </div>
      <div class="input-group flex w-auto shrink-0 flex-col gap-1.5" style="flex: 0 0 auto">
        <label class="input-label block text-[0.62rem] uppercase tracking-[0.15em] text-[var(--muted)]">Sign In</label>
        <button
          type="button"
          class="milestone-btn h-[34px] w-full rounded-md border border-[var(--border)] bg-[var(--input-bg)] px-3 text-center text-[0.88rem] text-[var(--black)] transition-colors duration-150"
          @click="onAuthClick"
        >
          {{ authLabel }}
        </button>
      </div>
    </div>
  </div>
</template>
