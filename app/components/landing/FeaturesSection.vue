<script setup lang="ts">
interface Feature {
  icon: string
  title: string
  description: string
}

defineProps<{
  features: readonly Feature[]
}>()
</script>

<template>
  <section class="py-20 px-4 bg-default/50">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-default mb-4">Everything You Need</h2>
        <p class="text-xl text-muted max-w-2xl mx-auto">Powerful features to help you create the perfect resume</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <UCard
          v-for="feature in features"
          :key="feature.title"
          class="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-default"
        >
          <div class="flex flex-col items-start">
            <div class="p-3 rounded-lg bg-primary/10 mb-4">
              <UIcon :name="feature.icon" class="size-6 text-primary" />
            </div>
            <h3 class="text-xl font-semibold text-default mb-2">
              {{ feature.title }}
            </h3>
            <p class="text-muted">
              {{ feature.description }}
            </p>
          </div>
        </UCard>
      </div>
    </div>
  </section>
</template>
