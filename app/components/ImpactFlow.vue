<script setup lang="ts">
import { CAUSE_LABELS, IMPACT_TITLES, TYPE_LABELS } from '~/data/lifeModes'
import { OPPORTUNITIES } from '~/data/opportunities'
import type { ModeKey } from '~/types/life'

const emit = defineEmits<{ back: [] }>()

const store = useLifeStore()

const step = ref<1 | 2 | 3>(1)
const cause = ref<string | null>(null)
const contributionType = ref<string | null>(null)

const title = computed(() => IMPACT_TITLES[store.mode as ModeKey] || IMPACT_TITLES.skulls)

const results = computed(() => {
  const t = contributionType.value
  const c = cause.value
  if (!t || !c) return []
  return OPPORTUNITIES[t as keyof typeof OPPORTUNITIES]?.[c] ?? []
})

function pickCause(c: string) {
  cause.value = c
  step.value = 2
}

function pickType(t: string) {
  contributionType.value = t
  step.value = 3
}

function backFrom2() {
  step.value = 1
  cause.value = null
}

function backFrom3() {
  step.value = 2
  contributionType.value = null
}
</script>

<template>
  <div>
    <template v-if="step === 1">
      <button type="button" class="impact-back impact-fade mb-7 inline-block cursor-pointer border-none bg-transparent p-0 font-[inherit] text-[0.6rem] uppercase tracking-[0.12em] text-[var(--muted)] hover:text-[var(--black)]" @click="emit('back')">
        ← Back
      </button>
      <p class="next-section-title impact-fade mb-2.5 text-[1.6rem] font-bold leading-tight tracking-[0.05em] text-[var(--black)] max-[600px]:text-[1.2rem]">
        {{ title }}
      </p>
      <p class="next-section-sub impact-fade mb-3 text-[0.78rem] tracking-[0.1em] text-[var(--muted)]">What matters to you?</p>
      <div class="impact-options impact-fade mb-3 flex flex-wrap justify-center gap-3">
        <button
          v-for="key in Object.keys(CAUSE_LABELS)"
          :key="key"
          type="button"
          class="impact-option cursor-pointer rounded-md border border-[var(--border)] bg-transparent px-[22px] py-2.5 font-[inherit] text-[0.72rem] uppercase tracking-[0.12em] text-[var(--muted)] transition-colors duration-200 hover:border-[var(--black)] hover:bg-[var(--faint)] hover:text-[var(--black)]"
          @click="pickCause(key)"
        >
          {{ CAUSE_LABELS[key as keyof typeof CAUSE_LABELS] }}
        </button>
      </div>
    </template>

    <template v-else-if="step === 2">
      <button type="button" class="impact-back impact-fade mb-7 inline-block cursor-pointer border-none bg-transparent p-0 font-[inherit] text-[0.6rem] uppercase tracking-[0.12em] text-[var(--muted)] hover:text-[var(--black)]" @click="backFrom2">
        ← Back
      </button>
      <p class="next-section-title impact-fade mb-2.5 text-[1.6rem] font-bold leading-tight tracking-[0.05em] text-[var(--black)] max-[600px]:text-[1.2rem]">
        How do you want to help?
      </p>
      <p class="next-section-sub impact-fade mb-3 text-[0.78rem] tracking-[0.1em] text-[var(--muted)]">Pick a contribution type</p>
      <div class="impact-options impact-fade mb-3 flex flex-wrap justify-center gap-3">
        <button type="button" class="impact-option cursor-pointer rounded-md border border-[var(--border)] bg-transparent px-[22px] py-2.5 font-[inherit] text-[0.72rem] uppercase tracking-[0.12em] text-[var(--muted)] transition-colors duration-200 hover:border-[var(--black)] hover:bg-[var(--faint)] hover:text-[var(--black)]" @click="pickType('time')">
          Give time
        </button>
        <button type="button" class="impact-option cursor-pointer rounded-md border border-[var(--border)] bg-transparent px-[22px] py-2.5 font-[inherit] text-[0.72rem] uppercase tracking-[0.12em] text-[var(--muted)] transition-colors duration-200 hover:border-[var(--black)] hover:bg-[var(--faint)] hover:text-[var(--black)]" @click="pickType('money')">
          Give money
        </button>
        <button type="button" class="impact-option cursor-pointer rounded-md border border-[var(--border)] bg-transparent px-[22px] py-2.5 font-[inherit] text-[0.72rem] uppercase tracking-[0.12em] text-[var(--muted)] transition-colors duration-200 hover:border-[var(--black)] hover:bg-[var(--faint)] hover:text-[var(--black)]" @click="pickType('skills')">
          Use your skills
        </button>
      </div>
    </template>

    <template v-else>
      <button type="button" class="impact-back impact-fade mb-7 inline-block cursor-pointer border-none bg-transparent p-0 font-[inherit] text-[0.6rem] uppercase tracking-[0.12em] text-[var(--muted)] hover:text-[var(--black)]" @click="backFrom3">
        ← Back
      </button>
      <p class="next-section-title impact-fade mb-2.5 text-[1.6rem] font-bold leading-tight tracking-[0.05em] text-[var(--black)] max-[600px]:text-[1.2rem]">
        {{ cause ? CAUSE_LABELS[cause] : '' }}
      </p>
      <p class="next-section-sub impact-fade mb-3 text-[0.78rem] tracking-[0.1em] text-[var(--muted)]">
        {{ contributionType ? TYPE_LABELS[contributionType] : '' }} · A few places to start
      </p>
      <div class="impact-results impact-fade mx-auto flex max-w-[900px] flex-wrap justify-center gap-5">
        <div
          v-for="(r, idx) in results"
          :key="idx"
          class="impact-result-card flex-[0_1_260px] rounded-lg border border-[var(--border)] bg-[var(--input-bg)] px-[22px] pb-5 pt-5 text-left"
        >
          <span class="impact-result-badge mb-2.5 inline-block rounded border border-[var(--border)] px-1.5 py-0.5 text-[0.55rem] uppercase tracking-[0.15em] text-[var(--muted)]">{{ r.badge }}</span>
          <p class="impact-result-title mb-1.5 text-[0.82rem] font-bold uppercase tracking-[0.1em] text-[var(--black)]">{{ r.title }}</p>
          <p class="impact-result-desc mb-4 text-[0.72rem] leading-relaxed text-[var(--muted)]">{{ r.desc }}</p>
          <a :href="r.url" target="_blank" rel="noopener" class="impact-result-btn block h-9 w-full cursor-pointer rounded-md border border-[var(--border)] bg-transparent text-center font-[inherit] text-[0.65rem] uppercase leading-[34px] tracking-[0.15em] text-[var(--muted)] no-underline transition-colors duration-200 hover:border-[var(--black)] hover:text-[var(--black)]">Learn more</a>
        </div>
      </div>
    </template>
  </div>
</template>
