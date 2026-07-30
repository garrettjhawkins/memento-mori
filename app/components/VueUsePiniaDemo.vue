<template>
  <UApp>
    <NuxtRouteAnnouncer />
    <div class="p-8 max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold mb-6">Nuxt UI + VueUse + Pinia Demo</h1>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- VueUse Examples -->
        <UCard>
          <template #header>
            <h2 class="text-xl font-semibold">🖱️ Mouse Position (VueUse)</h2>
          </template>
          <p class="text-lg">X: {{ x }} | Y: {{ y }}</p>
        </UCard>

        <UCard>
          <template #header>
            <h2 class="text-xl font-semibold">🌙 Theme Preference (VueUse)</h2>
          </template>
          <p class="text-lg">Prefers dark mode: {{ isDark }}</p>
        </UCard>

        <!-- Pinia Counter Store -->
        <UCard>
          <template #header>
            <h2 class="text-xl font-semibold">🔢 Counter Store (Pinia)</h2>
          </template>
          <div class="space-y-3">
            <p class="text-lg">Count: {{ count }}</p>
            <p class="text-lg">Double: {{ doubleCount }}</p>
            <div class="flex gap-2">
              <UButton @click="counterStore.increment()" color="primary">+</UButton>
              <UButton @click="counterStore.decrement()" color="primary">-</UButton>
              <UButton @click="counterStore.reset()" color="neutral">Reset</UButton>
            </div>
          </div>
        </UCard>

        <!-- Pinia User Store -->
        <UCard>
          <template #header>
            <h2 class="text-xl font-semibold">👤 User Store (Pinia)</h2>
          </template>
          <div class="space-y-3">
            <p class="text-lg">Username: {{ username }}</p>
            <p class="text-lg">Status: {{ isLoggedIn ? '✅ Logged In' : '❌ Logged Out' }}</p>
            <div class="flex gap-2" v-if="!isLoggedIn">
              <UButton @click="userStore.login('John Doe')" color="primary">Login</UButton>
            </div>
            <div class="flex gap-2" v-else>
              <UButton @click="userStore.logout()" color="error">Logout</UButton>
            </div>
          </div>
        </UCard>
      </div>
    </div>
  </UApp>
</template>

<script setup lang="ts">
import {storeToRefs} from 'pinia';

// VueUse functions are auto-imported, no need to import them!
const {x, y} = useMouse()
const isDark = usePreferredDark()

// Pinia stores are auto-imported from the stores folder!
const counterStore = useCounterStore()
const userStore = useUserStore()

// You can use storeToRefs to extract reactive refs from the store
const {count, doubleCount} = storeToRefs(counterStore)
const {username, isLoggedIn} = storeToRefs(userStore)
</script>
