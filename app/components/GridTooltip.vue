<script setup lang="ts">
defineProps<{
  text: string
  visible: boolean
  left: number
  top: number
}>()
</script>

<template>
  <div
    id="mm-tooltip"
    class="tooltip"
    :style="{ display: visible ? 'block' : 'none', left: `${left}px`, top: `${top}px` }"
  >
    {{ text }}
  </div>
</template>
