import { MODES } from '~/data/lifeModes'
import type { ModeKey } from '~/types/life'

const DEFAULT_RIGHT = [
  "There's still a lot of time to shape what comes next.",
  "There's still plenty of time to build what matters to you.",
  "There's still meaningful time to shape what comes next.",
  "There's still time to focus on what matters most.",
  'Each week carries its own kind of meaning.',
]

export function useStats() {
  const store = useLifeStore()

  const hasDate = computed(() => Boolean(store.birthdate))

  const stats = computed(() => {
    const val = store.birthdate
    const modeKey = store.mode as ModeKey
    const mode = MODES[modeKey]
    if (!val) {
      return {
        age: '—',
        lived: '—',
        left: '—',
        pct: '—',
        rightPhrase: '',
        statsLeft: mode.statsLeft || 'Based on an average life expectancy of ~82 years,',
      }
    }
    const [yr, mo, dy] = val.split('-').map(Number)
    const birth = new Date(yr, mo - 1, dy)
    const now = new Date()
    const TOTAL = 82 * mode.cols
    const MS_PER_BOX = (365.25 * 24 * 60 * 60 * 1000) / mode.cols
    const lived = Math.max(0, Math.floor((+now - +birth) / MS_PER_BOX))
    const clamped = Math.min(lived, TOTAL)
    let age = now.getFullYear() - birth.getFullYear()
    if (now < new Date(now.getFullYear(), birth.getMonth(), birth.getDate())) age--
    age = Math.max(0, age)
    const rp = mode.rightPhrases || DEFAULT_RIGHT
    const rightPhrase =
      age <= 25 ? rp[0] : age <= 40 ? rp[1] : age <= 55 ? rp[2] : age <= 70 ? rp[3] : rp[4]
    const pct = ((clamped / TOTAL) * 100).toFixed(1)
    return {
      age: String(age),
      lived: mode.livedFmt(clamped, TOTAL),
      left: mode.leftFmt(clamped, TOTAL),
      pct: `${pct}%`,
      rightPhrase,
      statsLeft: mode.statsLeft || 'Based on an average life expectancy of ~82 years,',
    }
  })

  return { hasDate, stats }
}
