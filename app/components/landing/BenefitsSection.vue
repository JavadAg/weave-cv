<script setup lang="ts">
interface Benefit {
  title: string
  description: string
}

defineProps<{
  benefits: readonly Benefit[]
}>()
</script>

<template>
  <section class="py-20 px-4 relative overflow-hidden">
    <div
      class="absolute inset-0 bg-gradient-to-r from-orange-600/10 via-amber-600/10 to-yellow-600/10 dark:from-orange-600/5 dark:via-amber-600/5 dark:to-yellow-600/5"
    />
    <div class="relative max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-default mb-4">Why Choose Weave CV?</h2>
        <p class="text-xl text-muted max-w-2xl mx-auto">
          Join thousands of professionals who trust Weave CV to create their resumes
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="benefit in benefits"
          :key="benefit.title"
          class="text-center p-8 rounded-2xl bg-default/80 backdrop-blur-sm border border-default/30"
        >
          <h3 class="text-2xl font-bold text-default mb-4">
            {{ benefit.title }}
          </h3>
          <p class="text-muted text-lg">
            {{ benefit.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
