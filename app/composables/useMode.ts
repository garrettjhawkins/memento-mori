import { MODES, PATHS } from '~/data/lifeModes'
import type { ModeKey } from '~/types/life'

const THEME_DEFAULTS = {
  bg: '#0f0f0f',
  future: '#333',
  lived: '#686868',
  mid: '#b8b8b8',
  black: '#e2e2e2',
  muted: '#6b6b6b',
  border: '#2a2a2a',
  faint: '#1c1c1c',
  milestone: '#f97316',
  notable: '#c084fc',
  inputBg: '#1a1a1a',
} as const

export function maskUrl(d: string, fillRule: string) {
  return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cpath fill='white' fill-rule='${fillRule}' d='${d}'/%3E%3C/svg%3E")`
}

export function applyModeCss(key: ModeKey) {
  if (!import.meta.client) return
  const mode = MODES[key]
  const p = PATHS[key]
  const root = document.documentElement
  root.style.setProperty('--skull', maskUrl(p.d, p.fillRule))
  const t = { ...THEME_DEFAULTS, ...mode.theme }
  root.style.setProperty('--bg', t.bg)
  root.style.setProperty('--future', t.future)
  root.style.setProperty('--lived', t.lived)
  root.style.setProperty('--mid', t.mid)
  root.style.setProperty('--black', t.black)
  root.style.setProperty('--muted', t.muted)
  root.style.setProperty('--border', t.border)
  root.style.setProperty('--faint', t.faint)
  root.style.setProperty('--milestone', t.milestone)
  root.style.setProperty('--notable', t.notable)
  root.style.setProperty('--input-bg', t.inputBg)
  root.style.setProperty('--tooltip-bg', key === 'skulls' ? '#111' : t.notable)
  root.style.setProperty('--tooltip-text', '#fff')
}

export function useMode() {
  const store = useLifeStore()

  watch(
    () => store.mode,
    (k) => applyModeCss(k),
    { immediate: true },
  )

  return {
    MODES,
    PATHS,
    applyModeCss,
  }
}
