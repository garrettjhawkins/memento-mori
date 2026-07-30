import type { FocusKey, ModeKey, PlanPayload } from '~/types/life'

export const useLifeStore = defineStore('life', () => {
  const mode = ref<ModeKey>('skulls')
  const birthdate = ref('')
  const milestonesActive = ref(false)
  const birthdateEnteredOnce = ref(false)
  const activePlan = ref<PlanPayload | null>(null)

  function setMode(m: ModeKey) {
    mode.value = m
  }

  function setBirthdate(v: string) {
    birthdate.value = v
    if (v && !birthdateEnteredOnce.value) {
      birthdateEnteredOnce.value = true
      milestonesActive.value = true
    }
  }

  function toggleMilestones() {
    milestonesActive.value = !milestonesActive.value
  }

  function setActivePlan(p: PlanPayload | null) {
    activePlan.value = p
  }

  return {
    mode,
    birthdate,
    milestonesActive,
    birthdateEnteredOnce,
    activePlan,
    setMode,
    setBirthdate,
    toggleMilestones,
    setActivePlan,
  }
})
