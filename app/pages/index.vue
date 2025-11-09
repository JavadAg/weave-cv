<script setup lang="ts">
import BenefitsSection from "~/components/landing/BenefitsSection.vue"
import CTASection from "~/components/landing/CTASection.vue"
import FeaturesSection from "~/components/landing/FeaturesSection.vue"
import HeroSection from "~/components/landing/HeroSection.vue"
import LandingFooter from "~/components/landing/LandingFooter.vue"
import { LANDING_BENEFITS, LANDING_FEATURES } from "~/constants/landing"

useHead({
  title: "Weave CV - Create Professional Resumes",
  meta: [
    {
      name: "description",
      content: "Create professional resumes with ease. Build, edit, and download your resume in minutes with Weave CV."
    },
    {
      property: "og:title",
      content: "Weave CV - Create Professional Resumes"
    },
    {
      property: "og:description",
      content: "Create professional resumes with ease. Build, edit, and download your resume in minutes with Weave CV."
    },
    {
      property: "og:url",
      content: "/"
    },
    {
      name: "twitter:title",
      content: "Weave CV - Create Professional Resumes"
    },
    {
      name: "twitter:description",
      content: "Create professional resumes with ease. Build, edit, and download your resume in minutes with Weave CV."
    }
  ]
})
</script>

<template>
  <div class="grid w-full">
    <HeroSection />
    <FeaturesSection :features="LANDING_FEATURES" />
    <BenefitsSection :benefits="LANDING_BENEFITS" />
    <CTASection />
    <LandingFooter />
  </div>
</template>
