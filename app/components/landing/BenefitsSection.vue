<script setup lang="ts">
import { LANDING_BENEFITS } from "~/constants/landing"
</script>

<template>
  <section class="py-20 sm:py-32 bg-muted">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 700, ease: 'easeOut' } }"
        :visible-once="true"
        class="text-center mb-16"
      >
        <h2 class="text-4xl sm:text-5xl mb-4 text-default font-medium">Why Job Seekers Love Weave CV</h2>
        <p class="text-xl text-muted max-w-3xl mx-auto">
          Real benefits that help you achieve your career goals faster.
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        <UCard
          v-for="(benefit, index) in LANDING_BENEFITS"
          :key="benefit.title"
          v-motion
          :initial="{ opacity: 0, scale: 0.95 }"
          :visible="{ opacity: 1, scale: 1, transition: { duration: 500, ease: 'easeOut', delay: index * 150 } }"
          :visible-once="true"
          class="p-8 h-full text-center hover:shadow-xl transition-all duration-300 bg-default/90 border-default/30"
        >
          <div
            class="mx-auto rounded-full bg-gradient-to-br from-orange-500 to-amber-500 w-16 h-16 flex items-center justify-center mb-6"
          >
            <UIcon :name="benefit.icon" class="h-8 w-8 text-inverted" />
          </div>
          <h3 class="text-2xl mb-3 text-default">
            {{ benefit.title }}
          </h3>
          <p class="text-lg text-muted">
            {{ benefit.description }}
          </p>
        </UCard>
      </div>
    </div>
  </section>
</template>
