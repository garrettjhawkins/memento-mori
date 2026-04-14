import { CREATOR_BIRTH, CREATOR_PHRASES, MODES } from '~/data/lifeModes'
import type { ModeKey } from '~/types/life'

export function useCreatorStat() {
  const store = useLifeStore()

  const creatorStat = computed(() => {
    const key = store.mode as ModeKey
    const mode = MODES[key]
    const ms = Date.now() - CREATOR_BIRTH.getTime()
    const lived = Math.floor(ms / ((365.25 * 24 * 60 * 60 * 1000) / mode.cols))
    const n = mode.livedFmt(lived, 0)
    return CREATOR_PHRASES[key](n)
  })

  return { creatorStat }
}
