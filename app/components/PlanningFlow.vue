<script setup lang="ts">
import {
  FOCUS_LABELS,
  FOCUS_PLACEHOLDERS,
  PLAN_TITLES,
  TIMEFRAMES,
} from '~/data/lifeModes'
import type { FocusKey, ModeKey, PlanPayload } from '~/types/life'

const emit = defineEmits<{ back: [] }>()

const store = useLifeStore()
const firebase = inject<ReturnType<typeof useFirebase>>('firebase')!
const { saveLatestGoalToFirebase } = firebase

const step = ref<1 | 2 | 3 | 4>(1)
const focus = ref<FocusKey | null>(null)
const weeks = ref(0)
const timeLabel = ref('')
const goalText = ref('')

onMounted(() => {
  if (store.activePlan) {
    const p = store.activePlan
    focus.value = p.focus
    weeks.value = p.weeks
    timeLabel.value = p.timeLabel
    goalText.value = p.goal
    step.value = 4
  }
})

const title = computed(() => PLAN_TITLES[store.mode as ModeKey] || PLAN_TITLES.skulls)

function goFocus(f: FocusKey) {
  focus.value = f
  step.value = 2
}

function goTimeframe(w: number, label: string) {
  weeks.value = w
  timeLabel.value = label
  step.value = 3
}

function submitGoal(input: string) {
  const g = input.trim() || placeholder.value
  const payload: PlanPayload = {
    focus: focus.value!,
    weeks: weeks.value,
    timeLabel: timeLabel.value,
    goal: g,
  }
  store.setActivePlan(payload)
  if (import.meta.client) {
    localStorage.setItem('mm_plan', JSON.stringify(payload))
  }
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'goal_created', {
      focus: payload.focus,
      weeks: payload.weeks,
      goal_length: payload.goal.length,
    })
  }
  saveLatestGoalToFirebase(payload)
  step.value = 4
}

const placeholder = computed(() =>
  focus.value ? FOCUS_PLACEHOLDERS[focus.value] : 'Describe your goal',
)

const shareCopied = ref(false)

async function shareGoal() {
  const p = store.activePlan
  if (!p) return
  const text = `I'm focusing on ${FOCUS_LABELS[p.focus]} for the next ${p.timeLabel}: "${p.goal}" — track your own life at ${location.href}`
  if (navigator.share) {
    await navigator.share({ title: 'My Goal', text, url: location.href })
  } else {
    await navigator.clipboard.writeText(text)
    shareCopied.value = true
    window.setTimeout(() => {
      shareCopied.value = false
    }, 2000)
  }
}

function backTo3() {
  step.value = 3
}

function backTo2() {
  step.value = 2
}

function backTo1() {
  step.value = 1
  focus.value = null
}

function backFrom1() {
  emit('back')
}
</script>

<template>
  <div>
    <template v-if="step === 1">
      <button type="button" class="impact-back impact-fade mb-7 inline-block cursor-pointer border-none bg-transparent p-0 font-[inherit] text-[0.6rem] uppercase tracking-[0.12em] text-[var(--muted)] hover:text-[var(--black)]" @click="backFrom1">
        ← Back
      </button>
      <p class="next-section-title impact-fade mb-2.5 text-[1.6rem] font-bold leading-tight tracking-[0.05em] text-[var(--black)] max-[600px]:text-[1.2rem]">
        {{ title }}
      </p>
      <p class="next-section-sub impact-fade mb-3 text-[0.78rem] tracking-[0.1em] text-[var(--muted)]">What do you want to focus on?</p>
      <div class="impact-options impact-fade mb-3 flex flex-wrap justify-center gap-3">
        <button
          v-for="key in Object.keys(FOCUS_LABELS) as FocusKey[]"
          :key="key"
          type="button"
          class="impact-option cursor-pointer rounded-md border border-[var(--border)] bg-transparent px-[22px] py-2.5 font-[inherit] text-[0.72rem] uppercase tracking-[0.12em] text-[var(--muted)] transition-colors duration-200 hover:border-[var(--black)] hover:bg-[var(--faint)] hover:text-[var(--black)]"
          @click="goFocus(key)"
        >
          {{ FOCUS_LABELS[key] }}
        </button>
      </div>
    </template>

    <template v-else-if="step === 2">
      <button type="button" class="impact-back impact-fade mb-7 inline-block cursor-pointer border-none bg-transparent p-0 font-[inherit] text-[0.6rem] uppercase tracking-[0.12em] text-[var(--muted)] hover:text-[var(--black)]" @click="backTo1">
        ← Back
      </button>
      <p class="next-section-title impact-fade mb-2.5 text-[1.6rem] font-bold leading-tight tracking-[0.05em] text-[var(--black)] max-[600px]:text-[1.2rem]">
        What timeframe feels right?
      </p>
      <p class="next-section-sub impact-fade mb-3 text-[0.78rem] tracking-[0.1em] text-[var(--muted)]">
        {{ focus ? FOCUS_LABELS[focus] : '' }}
      </p>
      <div class="impact-options impact-fade mb-3 flex flex-wrap justify-center gap-3">
        <button
          v-for="t in TIMEFRAMES"
          :key="t.label"
          type="button"
          class="impact-option cursor-pointer rounded-md border border-[var(--border)] bg-transparent px-[22px] py-2.5 font-[inherit] text-[0.72rem] uppercase tracking-[0.12em] text-[var(--muted)] transition-colors duration-200 hover:border-[var(--black)] hover:bg-[var(--faint)] hover:text-[var(--black)]"
          @click="goTimeframe(t.weeks, t.label)"
        >
          {{ t.label }}
        </button>
      </div>
    </template>

    <template v-else-if="step === 3">
      <button type="button" class="impact-back impact-fade mb-7 inline-block cursor-pointer border-none bg-transparent p-0 font-[inherit] text-[0.6rem] uppercase tracking-[0.12em] text-[var(--muted)] hover:text-[var(--black)]" @click="backTo2">
        ← Back
      </button>
      <p class="next-section-title impact-fade mb-2.5 text-[1.6rem] font-bold leading-tight tracking-[0.05em] text-[var(--black)] max-[600px]:text-[1.2rem]">
        What does progress look like?
      </p>
      <p class="next-section-sub impact-fade mb-3 text-[0.78rem] tracking-[0.1em] text-[var(--muted)]">
        {{ focus ? `${FOCUS_LABELS[focus]} · ${timeLabel}` : '' }}
      </p>
      <div class="planning-input-wrap impact-fade mb-3 flex flex-wrap justify-center gap-3">
        <input
          v-model="goalText"
          type="text"
          class="planning-text-input h-11 max-w-[420px] min-w-[200px] flex-[1_1_260px] rounded-md border border-[var(--border)] bg-[var(--input-bg)] px-4 font-[inherit] text-[0.88rem] text-[var(--black)] outline-none transition-[border-color] duration-200 placeholder:text-[var(--muted)] focus:border-[var(--black)]"
          :placeholder="placeholder"
          maxlength="80"
          autocomplete="off"
          @keydown.enter="submitGoal(goalText)"
        >
        <button type="button" class="planning-submit-btn h-11 whitespace-nowrap rounded-md border border-[var(--border)] bg-transparent px-7 font-[inherit] text-[0.72rem] uppercase tracking-[0.15em] text-[var(--muted)] transition-colors duration-200 hover:border-[var(--black)] hover:bg-[var(--faint)] hover:text-[var(--black)]" @click="submitGoal(goalText)">
          Set goal
        </button>
      </div>
    </template>

    <template v-else-if="step === 4 && store.activePlan">
      <button type="button" class="impact-back impact-fade mb-7 inline-block cursor-pointer border-none bg-transparent p-0 font-[inherit] text-[0.6rem] uppercase tracking-[0.12em] text-[var(--muted)] hover:text-[var(--black)]" @click="backTo3">
        ← Back
      </button>
      <span class="plan-result-badge impact-fade mb-5 inline-block rounded border border-[var(--border)] px-1.5 py-0.5 text-[0.55rem] uppercase tracking-[0.15em] text-[var(--muted)]">
        {{ FOCUS_LABELS[store.activePlan.focus] }}
      </span>
      <p class="plan-result-weeks impact-fade mb-1 text-[3.5rem] font-bold leading-none tracking-[-0.04em] text-[var(--black)]">
        {{ store.activePlan.timeLabel }}
      </p>
      <p class="plan-result-weeks-label impact-fade mb-4 text-[0.6rem] uppercase tracking-[0.15em] text-[var(--muted)]">
        or about {{ store.activePlan.weeks }} weeks
      </p>
      <p class="plan-result-message impact-fade mb-2.5 text-base leading-snug tracking-[0.04em] text-[var(--black)]">
        This is how your next {{ store.activePlan.weeks }} weeks fit into your timeline.
      </p>
      <p class="plan-result-goal impact-fade mb-0 text-[0.82rem] italic tracking-[0.04em] text-[var(--black)] opacity-70">
        "{{ store.activePlan.goal }}"
      </p>

      <PlanMiniGrid :plan="store.activePlan">
        <template #share>
          <button
            type="button"
            class="plan-share-btn absolute right-0 rounded-md border border-[var(--border)] bg-transparent px-[18px] py-2 font-[inherit] text-[0.72rem] uppercase tracking-[0.15em] text-[var(--muted)] transition-colors duration-200 hover:border-[var(--black)] hover:bg-[var(--faint)] hover:text-[var(--black)] max-[600px]:static max-[600px]:w-auto"
            :class="{ copied: shareCopied }"
            @click="shareGoal"
          >
            {{ shareCopied ? 'Copied!' : 'Share Goal' }}
          </button>
        </template>
      </PlanMiniGrid>
    </template>
  </div>
</template>
