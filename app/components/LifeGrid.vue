<script setup lang="ts">
import { MODES, ROWS } from '~/data/lifeModes'
import type { ModeKey } from '~/types/life'

const store = useLifeStore()
const gridSectionRef = ref<HTMLElement | null>(null)
const legendRef = ref<HTMLElement | null>(null)
const toneLineRef = ref<HTMLElement | null>(null)

const {
  isMobile,
  cols,
  gridTemplateStyle,
  weekBoxes,
  fitGrid,
} = useLifeGrid(gridSectionRef, legendRef, toneLineRef)

const tooltip = inject<ReturnType<typeof useGridTooltip>>('mm-tooltip')!

const gridAnimating = ref(true)

watch(
  () => store.mode,
  () => {
    gridAnimating.value = true
    window.setTimeout(() => {
      gridAnimating.value = false
    }, 1200)
  },
)

onMounted(() => {
  nextTick(() => fitGrid())
  window.setTimeout(() => {
    gridAnimating.value = false
  }, 1200)
})

const yearLabels = computed(() => Array.from({ length: ROWS }, (_, y) => y))
const weekLabels = computed(() => Array.from({ length: cols.value }, (_, w) => w))

const unitLabel = computed(() => MODES[store.mode as ModeKey].unitLabel)

const toneLineText = computed(
  () =>
    MODES[store.mode as ModeKey].toneLine ||
    "There's no correct timeline. These are just reference points.",
)

const legendItems = computed(() => {
  const mode = MODES[store.mode as ModeKey]
  if (!store.birthdate) {
    return [{ type: 'future' as const, label: 'Remaining' }]
  }
  const items: { type: 'lived' | 'current' | 'future' | 'milestone' | 'notable'; label: string }[] = [
    { type: 'lived', label: mode.livedLabel },
    { type: 'current', label: 'Current' },
    { type: 'future', label: mode.leftLabel },
  ]
  if (store.milestonesActive) {
    items.push({ type: 'milestone', label: 'Milestone' }, { type: 'notable', label: 'Notable Figure' })
  }
  return items
})

function onBoxMove(e: MouseEvent, cell: (typeof weekBoxes.value)[0]) {
  const t =
    cell.tooltip ||
    (cell.current ? 'You are here.' : null)
  tooltip.show(e, t)
}

function onBoxLeave() {
  tooltip.hide()
}

function boxClass(cell: (typeof weekBoxes.value)[0]) {
  return {
    lived: cell.lived,
    current: cell.current,
    milestone: cell.milestone,
    notable: cell.notable,
    animating: gridAnimating.value,
  }
}
</script>

<template>
  <div id="grid-section" ref="gridSectionRef" class="grid-section flex min-h-0 flex-1 flex-col justify-start overflow-hidden">
    <div class="grid-outer mx-auto flex flex-col items-start gap-1">
      <div class="axis-row flex flex-row items-start gap-1 max-[600px]:flex-col max-[600px]:items-end">
        <div class="corner max-[600px]:h-[27px] max-[600px]:w-[22px]" />
        <div class="year-wrap flex shrink-0 flex-col max-[600px]:w-[22px]">
          <span class="axis-title max-[600px]:hidden">Age</span>
          <div class="year-col flex shrink-0 flex-row gap-[var(--gap)] max-[600px]:flex-col">
            <div
              v-for="y in yearLabels"
              :key="y"
              class="year-label flex shrink-0 items-end justify-center text-[8px] font-medium leading-none text-[#888] tabular-nums max-[600px]:h-[var(--box)] max-[600px]:w-[22px] max-[600px]:items-center max-[600px]:justify-end max-[600px]:pr-0.5"
              :style="{ width: isMobile ? '22px' : 'var(--box)', height: isMobile ? 'var(--box)' : '13px' }"
            >
              {{ y % 10 === 0 ? String(y) : '' }}
            </div>
          </div>
        </div>
      </div>
      <div class="axis-body flex flex-row gap-1 max-[600px]:flex-col">
        <div class="week-wrap flex shrink-0 flex-row items-stretch gap-1 max-[600px]:w-auto max-[600px]:flex-col max-[600px]:gap-0">
          <span
            class="axis-title max-[600px]:mb-1 max-[600px]:w-full max-[600px]:self-auto max-[600px]:text-center max-[600px]:[writing-mode:horizontal-tb] max-[600px]:[transform:none]"
            id="unit-label"
          >{{ unitLabel }}</span>
          <div
            class="week-col flex shrink-0 flex-col gap-[var(--gap)] max-[600px]:h-[13px] max-[600px]:w-auto max-[600px]:flex-row"
            :style="{ width: isMobile ? 'auto' : '22px' }"
          >
            <div
              v-for="w in weekLabels"
              :key="w"
              class="week-label flex shrink-0 items-center justify-end pr-[3px] text-[8px] font-medium leading-none text-[#888] tabular-nums max-[600px]:h-[13px] max-[600px]:w-[var(--box)] max-[600px]:items-end max-[600px]:justify-center max-[600px]:p-0"
            >
              {{ w % 10 === 0 ? String(w) : '' }}
            </div>
          </div>
        </div>
        <div
          id="grid"
          :key="`${isMobile}-${store.mode}`"
          class="grid shrink-0 gap-[var(--gap)]"
          :style="gridTemplateStyle"
        >
          <div
            v-for="cell in weekBoxes"
            :key="cell.i"
            class="week-box relative overflow-visible"
            :class="boxClass(cell)"
            :style="gridAnimating ? { animationDelay: `${Math.min(cell.i * 3, 800)}ms` } : undefined"
            @mousemove="(e) => onBoxMove(e, cell)"
            @mouseleave="onBoxLeave"
          />
        </div>
      </div>
    </div>
    <p ref="toneLineRef" class="tone-line my-2 text-center text-[0.72rem] text-[#444]">
      {{ toneLineText }}
    </p>
    <div id="legend" ref="legendRef" class="legend mt-3 flex shrink-0 flex-wrap items-center justify-center gap-5 text-[0.62rem] uppercase tracking-[0.1em] text-[var(--muted)]">
      <div v-for="(item, idx) in legendItems" :key="idx" class="legend-item flex items-center gap-1.5">
        <div class="legend-swatch h-[11px] w-[11px] shrink-0" :class="item.type" />
        <span>{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>
