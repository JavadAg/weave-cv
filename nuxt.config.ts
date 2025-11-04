import tailwindcss from "@tailwindcss/vite"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/supabase",
    "@nuxt/ui",
    "@nuxt/eslint",
    "@vueuse/nuxt",
    "reka-ui/nuxt",
    "@pinia/nuxt",
    "nuxt-tiptap-editor",
    "nuxt-color-picker"
  ],
  css: ["~/assets/css/tailwind.css"],
  vite: { plugins: [tailwindcss()] },
  supabase: {
    types: "~/types/database.types.ts",
    redirectOptions: {
      exclude: ["/", "/register"],
      include: ["/dashboard", "/editor/:id"],
      login: "/login",
      callback: "/confirm"
    }
  },
  routeRules: {
    "/editor/**": {
      ssr: false
    }
  },
  runtimeConfig: {
    public: {
      googleFontsKey: process.env.GOOGLE_FONT_APIKEY || ""
    }
  }
})
