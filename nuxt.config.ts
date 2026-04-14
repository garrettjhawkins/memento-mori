// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@vueuse/nuxt", "@pinia/nuxt"],
  css: [
    "~/assets/css/imports.css",      // Tailwind + Nuxt UI (must be .css)
    "~/assets/scss/main.scss",  // Your SCSS custom styles
  ],
});
