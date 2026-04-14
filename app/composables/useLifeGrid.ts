import { useDebounceFn, useResizeObserver, useWindowSize } from '@vueuse/core'
import { MILESTONES, NOTABLE_FIGURES } from '~/data/milestones'
import { MODES, ROWS } from '~/data/lifeModes'
import type { ModeKey, WeekBoxCell } from '~/types/life'

export function useLifeGrid(
  gridSectionRef: Ref<HTMLElement | null>,
  legendRef: Ref<HTMLElement | null>,
  toneLineRef: Ref<HTMLElement | null>,
) {
  const store = useLifeStore()
  const { width } = useWindowSize()

  const isMobile = computed(() => width.value <= 600)

  const cols = computed(() => MODES[store.mode as ModeKey].cols)

  const totalCells = computed(() => ROWS * cols.value)

  const clampedLived = computed(() => {
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
  })

  const currentIndex = computed(() => {
    const c = clampedLived.value
    if (c < 0) return -1
    return c - 1
  })

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

  const weekBoxes = computed((): WeekBoxCell[] => {
    const modeKey = store.mode as ModeKey
    const mode = MODES[modeKey]
    const c = cols.value
    const total = ROWS * c
    const birth = store.birthdate
    const cells: WeekBoxCell[] = []

    const milestoneMap = new Map<number, string>()
    const notableMap = new Map<number, string>()

    if (store.milestonesActive) {
      for (const m of MILESTONES) {
        const idx = Math.floor((m.year + m.fraction) * c)
        if (idx >= 0 && idx < total) milestoneMap.set(idx, m.label)
      }
      for (const f of NOTABLE_FIGURES) {
        const idx = Math.floor((f.weeks / 52) * c)
        if (idx >= 0 && idx < total) {
          const suffix =
            modeKey === 'skulls'
              ? ` — at ${f.weeks.toLocaleString()} weeks old`
              : modeKey === 'hotdogs'
                ? ` — after eating about ${Math.round((f.weeks / 52) * 50).toLocaleString()} hot dogs`
                : ''
          notableMap.set(idx, `${f.name} — ${f.label}${suffix}`)
        }
      }
    }

    for (let i = 0; i < total; i++) {
      let lived = false
      let current = false
      let milestone = false
      let notable = false
      let tooltip: string | undefined

      if (birth) {
        const cl = clampedLived.value
        if (i < cl - 1) lived = true
        else if (i === cl - 1) {
          current = true
          tooltip = 'You are here.'
        }
      }

      if (milestoneMap.has(i)) {
        milestone = true
        tooltip = milestoneMap.get(i)
      }
      if (notableMap.has(i)) {
        notable = true
        tooltip = notableMap.get(i)
      }

      cells.push({ i, lived, current, milestone, notable, tooltip })
    }

    return cells
  })

  const fitGrid = () => {
    const mode = MODES[store.mode as ModeKey]
    const mobile = isMobile.value
    const legendEl = legendRef.value
    const toneLineEl = toneLineRef.value
    const gridSectionEl = gridSectionRef.value
    if (!legendEl || !toneLineEl || !gridSectionEl) return

    const LEGEND_H = legendEl.offsetHeight + toneLineEl.offsetHeight + 12
    const r = 0.18
    const TITLE_H = 16

    let numCols: number
    let numRows: number
    let availW: number
    let availH: number

    if (mobile) {
      numCols = mode.cols
      numRows = ROWS
      const YEAR_COL_W = 22 + 6
      const WEEK_ROW_H = TITLE_H + 13 + 4
      availW = gridSectionEl.clientWidth - YEAR_COL_W
      availH = gridSectionEl.clientHeight - WEEK_ROW_H - LEGEND_H
    } else {
      numCols = ROWS
      numRows = mode.cols
      const YEAR_ROW_H = TITLE_H + 13 + 4
      const WEEK_COL_W = 12 + 4 + 22 + 4
      availW = gridSectionEl.clientWidth - WEEK_COL_W
      availH = gridSectionEl.clientHeight - YEAR_ROW_H - LEGEND_H
    }

    if (availW < 10 || availH < 10) return

    const boxFromW = availW / (numCols + (numCols - 1) * r)
    const boxFromH = availH / (numRows + (numRows - 1) * r)
    const box = Math.max(3, Math.floor(Math.min(boxFromW, boxFromH)))
    const gap = Math.max(1, Math.round(box * r))

    document.documentElement.style.setProperty('--box', `${box}px`)
    document.documentElement.style.setProperty('--gap', `${gap}px`)
  }

  const debouncedFit = useDebounceFn(fitGrid, 40)

  useResizeObserver(gridSectionRef, () => debouncedFit())

  watch([width, () => store.mode, () => cols.value], () => {
    debouncedFit()
  })

  watch(
    () => [store.birthdate, store.milestonesActive, store.mode] as const,
    () => {
      nextTick(() => debouncedFit())
    },
  )

  return {
    isMobile,
    cols,
    totalCells,
    clampedLived,
    currentIndex,
    gridTemplateStyle,
    weekBoxes,
    fitGrid: debouncedFit,
  }
}
