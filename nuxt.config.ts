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
    "nuxt-tiptap-editor"
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
  },
  app: {
    head: {
      charset: "utf8",
      viewport: "width=device-width, initial-scale=1",
      title: "Weave CV - Create Professional Resumes",
      meta: [
        {
          name: "description",
          content: "Create professional resumes with ease. Build, edit, and download your resume in minutes."
        },
        {
          property: "og:type",
          content: "website"
        },
        {
          property: "og:site_name",
          content: "Weave CV"
        },
        {
          name: "twitter:card",
          content: "summary_large_image"
        }
      ]
    }
  }
})
