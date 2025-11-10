<script setup lang="ts">
import { LANDING_FEATURES } from "~/constants/landing"
</script>

<template>
  <section class="py-20 sm:py-32">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 700, ease: 'easeOut' } }"
        :visible-once="true"
        class="text-center mb-16"
      >
        <h2 class="text-4xl sm:text-5xl mb-4 text-default font-medium">Everything You Need to Build Great Resumes</h2>
        <p class="text-xl text-muted max-w-3xl mx-auto">
          Powerful features designed to help you create professional resumes that get results.
        </p>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <UCard
          v-for="(feature, index) in LANDING_FEATURES"
          :key="feature.title"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 500, ease: 'easeOut', delay: index * 100 } }"
          :visible-once="true"
          class="p-6 h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-default/90 border-default/30"
        >
          <div
            class="rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 w-12 h-12 flex items-center justify-center mb-4"
          >
            <UIcon :name="feature.icon" class="h-6 w-6 text-inverted" />
          </div>
          <h3 class="text-xl mb-2 text-default">
            {{ feature.title }}
          </h3>
          <p class="text-muted">
            {{ feature.description }}
          </p>
        </UCard>
      </div>
    </div>
  </section>
</template>
