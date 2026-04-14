<script setup lang="ts">
import type { PlanPayload } from '~/types/life'

const store = useLifeStore()

type View = 'home' | 'impact' | 'plan'

const view = ref<View>('home')
const fading = ref(false)
const scrollAfterNav = ref(false)

onMounted(() => {
  const raw = import.meta.client ? localStorage.getItem('mm_plan') : null
  if (raw && !store.activePlan) {
    try {
      const p = JSON.parse(raw) as { focus?: string }
      if (p?.focus) store.setActivePlan(p as PlanPayload)
    } catch {
      /* ignore */
    }
  }
  if (store.activePlan) {
    view.value = 'plan'
  }
})

watch(
  () => store.activePlan,
  (p) => {
    if (p && view.value === 'home') view.value = 'plan'
  },
)

function scrollToNextIfNeeded() {
  nextTick(() => {
    const el = document.getElementById('next-section')
    if (!el) return
    const rect = el.getBoundingClientRect()
    if (rect.bottom > window.innerHeight) {
      const start = window.scrollY
      const target = start + rect.bottom - window.innerHeight
      const duration = 900
      const began = performance.now()
      function step(now: number) {
        const t = Math.min((now - began) / duration, 1)
        const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
        window.scrollTo(0, start + (target - start) * ease)
        if (t < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }
  })
}

function swap(next: View) {
  fading.value = true
  window.setTimeout(() => {
    view.value = next
    fading.value = false
    if (scrollAfterNav.value) {
      window.setTimeout(() => scrollToNextIfNeeded(), 200)
      scrollAfterNav.value = false
    }
  }, 150)
}

function goPlan() {
  scrollAfterNav.value = true
  swap('plan')
}

function goImpact() {
  scrollAfterNav.value = true
  swap('impact')
}

function goHome() {
  swap('home')
}
</script>

<template>
  <section id="next-section" class="next-section border-t border-[var(--border)] px-6 pb-8 pt-20 text-center max-[600px]:px-4 max-[600px]:pb-6 max-[600px]:pt-12">
    <div id="next-inner" :class="{ fading }">
      <NextHome v-if="view === 'home'" @plan="goPlan" @impact="goImpact" />
      <ImpactFlow v-else-if="view === 'impact'" @back="goHome" />
      <PlanningFlow v-else @back="goHome" />
    </div>
  </section>
</template>
