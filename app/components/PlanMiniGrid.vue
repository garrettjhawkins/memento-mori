<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { MODES, PLAN_HIGHLIGHT_COLORS, ROWS } from '~/data/lifeModes'
import type { ModeKey, PlanPayload } from '~/types/life'

const props = defineProps<{ plan: PlanPayload }>()

const store = useLifeStore()
const { width } = useWindowSize()
const isMobile = computed(() => width.value <= 600)

const cols = computed(() => MODES[store.mode as ModeKey].cols)

const gridTemplateStyle = computed(() => {
  const c = cols.value
  if (isMobile.value) {
    return {
      gridTemplateColumns: `repeat(${c}, var(--box))`,
      gridTemplateRows: '',
    }
  }
  return {
    gridTemplateRows: `repeat(${c}, var(--box))`,
    gridTemplateColumns: '',
  }
})

const tooltip = inject<ReturnType<typeof useGridTooltip>>('mm-tooltip')!

onMounted(() => {
  const key = store.mode as ModeKey
  document.documentElement.style.setProperty('--plan-highlight', PLAN_HIGHLIGHT_COLORS[key] || '#4338ca')
})

function clampedLived() {
  const val = store.birthdate
  const mode = MODES[store.mode as ModeKey]
  if (!val) return -1
  const [yr, mo, dy] = val.split('-').map(Number)
  const birth = new Date(yr, mo - 1, dy)
  const now = new Date()
  const TOTAL = ROWS * mode.cols
  const MS_PER_BOX = (365.25 * 24 * 60 * 60 * 1000) / mode.cols
  const lived = Math.max(0, Math.floor((+now - +birth) / MS_PER_BOX))
  return Math.min(lived, TOTAL)
}

const currentIdx = computed(() => {
  const c = clampedLived()
  if (c < 0) return -1
  return c - 1
})

const goalEnd = computed(() => {
  if (currentIdx.value === -1) return 0
  return currentIdx.value + 1 + props.plan.weeks
})

const totalCells = computed(() => ROWS * cols.value)

const miniCells = computed(() => {
  const total = totalCells.value
  const cur = currentIdx.value
  const end = goalEnd.value
  const hasDate = cur !== -1
  const out: { i: number; classes: string; goal?: string }[] = []
  for (let i = 0; i < total; i++) {
    let cls = 'week-box'
    if (hasDate) {
      if (i < cur) cls += ' lived'
      else if (i === cur) cls += ' current'
      else if (i < end) {
        cls += ' plan-highlight'
        out.push({ i, classes: cls, goal: props.plan.goal })
        continue
      }
    }
    out.push({ i, classes: cls })
  }
  return out
})

const yearLabels = computed(() => Array.from({ length: ROWS }, (_, y) => y))
const weekLabels = computed(() => Array.from({ length: cols.value }, (_, w) => w))

function onMove(e: MouseEvent, cell: (typeof miniCells.value)[0]) {
  const text =
    cell.goal || (cell.classes.includes('current') ? 'You are here.' : null)
  tooltip.show(e, text)
}

function onLeave() {
  tooltip.hide()
}
</script>

<template>
  <div class="plan-mini-grid-wrap mx-auto mt-5 flex max-w-full flex-col items-center justify-center gap-4">
    <div class="plan-grid-and-btn inline-flex max-w-full flex-col gap-4">
      <div class="plan-grid-scroll flex max-w-full justify-center overflow-x-auto">
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
              >{{ MODES[store.mode as ModeKey].unitLabel }}</span>
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
            <div class="grid shrink-0 gap-[var(--gap)]" :style="gridTemplateStyle">
              <div
                v-for="cell in miniCells"
                :key="cell.i"
                :class="cell.classes"
                @mousemove="(e) => onMove(e, cell)"
                @mouseleave="onLeave"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="plan-legend-row relative flex items-center justify-center max-[600px]:flex-col max-[600px]:gap-3">
        <div class="plan-mini-legend flex flex-wrap justify-center gap-5">
          <div class="plan-mini-legend-item flex items-center gap-1.5 text-[0.6rem] uppercase tracking-[0.12em] text-[var(--muted)]">
            <div class="plan-mini-swatch lived h-[11px] w-[11px] shrink-0" />
            <span>{{ MODES[store.mode as ModeKey].livedLabel }}</span>
          </div>
          <div class="plan-mini-legend-item flex items-center gap-1.5 text-[0.6rem] uppercase tracking-[0.12em] text-[var(--muted)]">
            <div class="plan-mini-swatch current h-[11px] w-[11px] shrink-0" />
            <span>Current</span>
          </div>
          <div class="plan-mini-legend-item flex items-center gap-1.5 text-[0.6rem] uppercase tracking-[0.12em] text-[var(--muted)]">
            <div class="plan-mini-swatch future h-[11px] w-[11px] shrink-0" />
            <span>{{ MODES[store.mode as ModeKey].leftLabel }}</span>
          </div>
          <div class="plan-mini-legend-item flex items-center gap-1.5 text-[0.6rem] uppercase tracking-[0.12em] text-[var(--muted)]">
            <div class="plan-mini-swatch goal h-[11px] w-[11px] shrink-0" />
            <span>Goal Timeline</span>
          </div>
        </div>
        <slot name="share" />
      </div>
    </div>
  </div>
</template>
