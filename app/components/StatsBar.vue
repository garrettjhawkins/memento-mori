<script setup lang="ts">
import { MODES } from '~/data/lifeModes'
import type { ModeKey } from '~/types/life'

const store = useLifeStore()
const { hasDate, stats } = useStats()

const livedLabel = computed(() => MODES[store.mode as ModeKey].livedLabel)
const leftLabel = computed(() => MODES[store.mode as ModeKey].leftLabel)
</script>

<template>
  <div
    class="stats-wrap flex w-full shrink-0 items-center justify-center gap-5 border-y border-[var(--faint)] py-[7px] max-[600px]:flex-col max-[600px]:items-center max-[600px]:gap-2.5 max-[600px]:py-4"
    :class="{ visible: hasDate }"
  >
    <span class="no-date-prompt text-base uppercase tracking-[0.12em] text-[var(--black)]">
      Enter your birthdate above to begin...
    </span>
    <span class="stats-aside stats-aside--left text-right text-[0.8rem] text-[var(--black)] opacity-75 max-[600px]:max-w-[320px] max-[600px]:whitespace-normal max-[600px]:text-center">
      {{ stats.statsLeft }}
    </span>
    <div class="stats flex justify-center gap-8 px-6">
      <div class="stat text-center">
        <span class="stat-value block text-base font-bold leading-none tracking-[-0.02em]">{{ stats.age }}</span>
        <span class="stat-label mt-1 text-[0.58rem] uppercase tracking-[0.12em] text-[var(--muted)]">Age</span>
      </div>
      <div class="stat text-center">
        <span class="stat-value block text-base font-bold leading-none tracking-[-0.02em]">{{ stats.lived }}</span>
        <span class="stat-label mt-1 text-[0.58rem] uppercase tracking-[0.12em] text-[var(--muted)]">{{ livedLabel }}</span>
      </div>
      <div class="stat text-center">
        <span class="stat-value block text-base font-bold leading-none tracking-[-0.02em]">{{ stats.left }}</span>
        <span class="stat-label mt-1 text-[0.58rem] uppercase tracking-[0.12em] text-[var(--muted)]">{{ leftLabel }}</span>
      </div>
      <div class="stat text-center">
        <span class="stat-value block text-base font-bold leading-none tracking-[-0.02em]">{{ stats.pct }}</span>
        <span class="stat-label mt-1 text-[0.58rem] uppercase tracking-[0.12em] text-[var(--muted)]">Complete</span>
      </div>
    </div>
    <span class="stats-aside stats-aside--right text-left text-[0.8rem] text-[var(--black)] opacity-75 max-[600px]:max-w-[320px] max-[600px]:whitespace-normal max-[600px]:text-center">
      {{ stats.rightPhrase }}
    </span>
  </div>
</template>
