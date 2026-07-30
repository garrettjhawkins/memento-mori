export type ModeKey = 'skulls' | 'hotdogs' | 'steps' | 'sneezes'

export interface ThemeTokens {
  bg?: string
  future?: string
  lived?: string
  mid?: string
  black?: string
  muted?: string
  border?: string
  faint?: string
  milestone?: string
  notable?: string
  inputBg?: string
}

export interface ModeConfig {
  tagline: string
  title?: string
  toneLine?: string
  statsLeft?: string
  rightPhrases?: string[]
  cols: number
  unitLabel: string
  livedLabel: string
  leftLabel: string
  livedFmt: (n: number, t: number) => string
  leftFmt: (n: number, t: number) => string
  footer: (t: number) => string
  theme?: ThemeTokens
}

export interface MilestoneDef {
  year: number
  fraction: number
  label: string
}

export interface NotableFigure {
  weeks: number
  name: string
  label: string
}

export interface Opportunity {
  title: string
  desc: string
  badge: string
  url: string
}

export type FocusKey =
  | 'career'
  | 'health'
  | 'relationships'
  | 'creativity'
  | 'financial'
  | 'growth'

export interface PlanPayload {
  focus: FocusKey
  weeks: number
  timeLabel: string
  goal: string
}

export interface WeekBoxCell {
  i: number
  lived: boolean
  current: boolean
  milestone: boolean
  notable: boolean
  tooltip?: string
}
