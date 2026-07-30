<script setup lang="ts">
import { MODES } from '~/data/lifeModes'
import type { ModeKey } from '~/types/life'

const store = useLifeStore()
const { creatorStat } = useCreatorStat()

const footerText = computed(() => {
  const mode = MODES[store.mode as ModeKey]
  const total = 82 * mode.cols
  return mode.footer(total)
})

const scrollCueVisible = ref(false)
const mainHinted = defineModel<boolean>('hinted', { default: false })

let scrollCueTimer: ReturnType<typeof setTimeout> | undefined

watch(
  () => store.birthdate,
  (v) => {
    if (!v) {
      scrollCueVisible.value = false
      mainHinted.value = false
      clearTimeout(scrollCueTimer)
      return
    }
    clearTimeout(scrollCueTimer)
    scrollCueTimer = setTimeout(() => {
      scrollCueVisible.value = true
      mainHinted.value = true
    }, 11000)
  },
)

onMounted(() => {
  if (store.birthdate) {
    scrollCueTimer = setTimeout(() => {
      scrollCueVisible.value = true
      mainHinted.value = true
    }, 11000)
  }
})

function onWindowScroll() {
  if (window.scrollY > 0) {
    scrollCueVisible.value = false
    mainHinted.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', onWindowScroll, { passive: true })
})
onUnmounted(() => {
  window.removeEventListener('scroll', onWindowScroll)
  clearTimeout(scrollCueTimer)
})
</script>

<template>
  <footer id="footer" class="relative z-[1] mt-2.5 flex shrink-0 flex-col items-center gap-1.5">
    <div class="footer-row flex items-center justify-center gap-11 text-[0.6rem] uppercase tracking-[0.1em] text-[#999]">
      <div class="scroll-cue flex flex-col items-center gap-1 transition-opacity duration-[800ms]" :class="{ visible: scrollCueVisible }">
        <span class="scroll-cue-label text-[0.55rem] uppercase tracking-[0.2em] text-[var(--muted)]">Scroll</span>
        <div class="scroll-cue-arrow h-3.5 w-3.5 rotate-45 border-b-[1.5px] border-r-[1.5px] border-[var(--muted)]" />
      </div>
      <span id="footer-text">{{ footerText }}</span>
      <div class="scroll-cue flex flex-col items-center gap-1 transition-opacity duration-[800ms]" :class="{ visible: scrollCueVisible }">
        <span class="scroll-cue-label text-[0.55rem] uppercase tracking-[0.2em] text-[var(--muted)]">Scroll</span>
        <div class="scroll-cue-arrow h-3.5 w-3.5 rotate-45 border-b-[1.5px] border-r-[1.5px] border-[var(--muted)]" />
      </div>
    </div>
    <p class="creator-credit text-[0.58rem] tracking-[0.08em] text-[var(--muted)]">
      Created by
      <a href="https://garrettjhawkins.com" target="_blank" rel="noopener" class="border-b border-transparent text-[var(--muted)] no-underline transition-colors duration-200 hover:border-[var(--black)] hover:text-[var(--black)]">Garrett Hawkins</a>,
      <span id="creator-stat">{{ creatorStat }}</span>
    </p>
  </footer>
</template>
