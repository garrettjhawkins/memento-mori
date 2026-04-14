import type { FocusKey, ModeConfig, ModeKey } from '~/types/life'

export const ROWS = 82

export const PATHS: Record<ModeKey, { d: string; fillRule: string }> = {
  skulls: {
    d: 'M16 2C8.82 2 3 7.82 3 15c0 4.42 2.1 8.35 5.36 10.84L8.5 28v2h15v-2l.14-2.16C26.9 23.35 29 19.42 29 15 29 7.82 23.18 2 16 2zm-5 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm10 0a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm-6.5 5v-3h3v3h-3z',
    fillRule: 'evenodd',
  },
  hotdogs: {
    d: 'M3 12C3 8 8 6 16 6C24 6 29 8 29 12V20C29 24 24 26 16 26C8 26 3 24 3 20V12Z',
    fillRule: 'nonzero',
  },
  steps: {
    d: 'M7 25L7 10Q7 7 10 7L14 7Q17 7 17 10L17 15Q17 19 21 19L26 19Q29 19 29 22L29 25Z',
    fillRule: 'nonzero',
  },
  sneezes: {
    d: 'M16 4C20 9 25 13 25 19C25 24 21 28 16 28C11 28 7 24 7 19C7 13 12 9 16 4Z',
    fillRule: 'nonzero',
  },
}

export const MODES: Record<ModeKey, ModeConfig> = {
  skulls: {
    tagline: 'your life in weeks',
    cols: 52,
    unitLabel: 'Weeks',
    livedLabel: 'Weeks lived',
    leftLabel: 'Weeks left',
    livedFmt: (n) => n.toLocaleString(),
    leftFmt: (n, t) => (t - n).toLocaleString(),
    footer: (t) => `82 years · 52 weeks/year · ${t.toLocaleString()} total`,
    theme: { bg: '#0f0f0f', future: '#333', lived: '#686868', mid: '#b8b8b8' },
  },
  hotdogs: {
    tagline: 'your life in hot dogs',
    title: 'Memento Hot Dogs',
    toneLine: 'No pressure. Just hot dogs.',
    statsLeft: 'Americans eat an average of ~50 hot dogs a year,',
    rightPhrases: [
      "There's still a lot of time to eat what comes next.",
      "There's still plenty of time to eat what matters to you.",
      "There's still meaningful time to savor what comes next.",
      "There's still time to focus on what tastes best.",
      'Each hot dog carries its own kind of meaning.',
    ],
    cols: 50,
    unitLabel: 'Weeks',
    livedLabel: 'Hot dogs eaten',
    leftLabel: 'Hot dogs left',
    livedFmt: (n) => n.toLocaleString(),
    leftFmt: (n, t) => (t - n).toLocaleString(),
    footer: (t) => `82 years · ~50 hot dogs/year · ${t.toLocaleString()} total`,
    theme: {
      bg: '#fffdf7',
      future: '#e8d9bc',
      lived: '#c2820e',
      mid: '#e03400',
      black: '#1a0800',
      muted: '#8a6030',
      border: '#d4b896',
      faint: '#ede0c8',
      milestone: '#f59e0b',
      notable: '#dc2626',
      inputBg: '#f5ead6',
    },
  },
  steps: {
    tagline: 'your life in steps',
    title: 'Memento Steps',
    toneLine: 'No set path. Just steps forward.',
    statsLeft: 'Based on an average of ~8,000 steps a day,',
    rightPhrases: [
      'There’s still a lot of ground ahead of you.',
      'There’s still plenty of distance left to go.',
      'There’s still meaningful ground to cover.',
      'There’s still time to walk your own path.',
      'Every step still has somewhere to lead.',
    ],
    cols: 52,
    unitLabel: 'Weeks',
    livedLabel: 'Steps taken',
    leftLabel: 'Steps left',
    livedFmt: (n) => (n * 56000).toLocaleString(),
    leftFmt: (n, t) => ((t - n) * 56000).toLocaleString(),
    footer: () => '82 years · ~56,000 steps per box · ~239M lifetime',
    theme: { bg: '#04110a', future: '#0a2416', lived: '#166534', mid: '#4ade80' },
  },
  sneezes: {
    tagline: 'your life in sneezes',
    title: 'Memento Sneezes',
    toneLine: 'You don’t control when they come. Just how you handle them.',
    statsLeft: 'Based on an average of ~4 sneezes a day,',
    rightPhrases: [
      'There’s still a lot left to let out.',
      'There’s still more on the way.',
      'There’s still time before the next one builds.',
      'There’s still time to reach for a tissue.',
      'Not everything has made its way to you yet.',
    ],
    cols: 52,
    unitLabel: 'Weeks',
    livedLabel: 'Times sneezed',
    leftLabel: 'Sneezes left',
    livedFmt: (n) => Math.round(n * 3.85).toLocaleString(),
    leftFmt: (n, t) => Math.round((t - n) * 3.85).toLocaleString(),
    footer: () => '82 years · ~4 sneezes per box · ~16,400 lifetime',
    theme: { bg: '#04080f', future: '#0c1828', lived: '#1d4ed8', mid: '#7dd3fc' },
  },
}

export const IMPACT_TITLES: Record<ModeKey, string> = {
  skulls: 'Lets make a difference!',
  hotdogs: 'A few meaningful ways to spend your hot dogs',
  steps: 'Put your steps toward something that matters',
  sneezes: 'Bless someone else with your time',
}

export const PLAN_TITLES: Record<ModeKey, string> = {
  skulls: 'Your next chapter starts here.',
  hotdogs: 'A few good hot dogs in your future.',
  steps: 'A few steps in a clear direction.',
  sneezes: 'Time well spent, however it comes out.',
}

export const CAUSE_LABELS: Record<string, string> = {
  education: 'Education',
  environment: 'Environment',
  health: 'Health',
  community: 'Community',
  poverty: 'Poverty',
}

export const TYPE_LABELS: Record<string, string> = {
  time: 'Give time',
  money: 'Give money',
  skills: 'Use your skills',
}

export const FOCUS_LABELS: Record<FocusKey, string> = {
  career: 'Career',
  health: 'Health',
  relationships: 'Relationships',
  creativity: 'Creativity',
  financial: 'Financial Stability',
  growth: 'Personal Growth',
}

export const TIMEFRAMES = [
  { label: '30 days', weeks: 4 },
  { label: '90 days', weeks: 13 },
  { label: '1 year', weeks: 52 },
] as const

export const FOCUS_PLACEHOLDERS: Record<FocusKey, string> = {
  career: 'Apply to 3 new roles',
  health: 'Work out 3x per week',
  relationships: 'Schedule one intentional catch-up per week',
  creativity: 'Finish a personal project',
  financial: 'Save $2,000',
  growth: 'Read one book per month',
}

export const PLAN_HIGHLIGHT_COLORS: Record<ModeKey, string> = {
  skulls: '#4338ca',
  hotdogs: '#0369a1',
  steps: '#fb923c',
  sneezes: '#c084fc',
}

export const CREATOR_BIRTH = new Date(1993, 7, 10)

export const CREATOR_PHRASES: Record<ModeKey, (n: string) => string> = {
  skulls: (n) => `who's lived about ${n} weeks`,
  hotdogs: (n) => `who's eaten about ${n} hot dogs`,
  steps: (n) => `who's walked about ${n} steps`,
  sneezes: (n) => `who's sneezed about ${n} times`,
}
