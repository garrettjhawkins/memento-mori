<script setup lang="ts">
useHead({
  title: 'Memento Mori',
})

useMode()

const firebase = useFirebase()
provide('firebase', firebase)

const tooltip = useGridTooltip()
provide('mm-tooltip', tooltip)

const mainHinted = ref(false)
</script>

<template>
  <div class="main-screen relative flex h-screen flex-col overflow-hidden px-6 pb-2.5 pt-3.5 max-[600px]:px-3.5 max-[600px]:pb-2 max-[600px]:pt-2.5" :class="{ hinted: mainHinted }">
    <AppHeader />
    <GridTooltip :text="tooltip.text" :visible="tooltip.visible" :left="tooltip.left" :top="tooltip.top" />

    <StatsBar />

    <LifeGrid />

    <AppFooter v-model:hinted="mainHinted" />

    <NextSection />
  </div>
</template>
