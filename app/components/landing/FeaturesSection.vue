<script setup lang="ts">
import { LANDING_FEATURES } from "~/constants/landing"

const sectionRef = ref<HTMLElement>()
const headerVisible = ref(false)
const featuresVisible = ref<boolean[]>([])

const { stop: stopHeader } = useIntersectionObserver(
  sectionRef,
  (entries) => {
    const entry = entries[0]
    if (entry?.isIntersecting) {
      headerVisible.value = true
      stopHeader()

      for (const [index] of LANDING_FEATURES.entries()) {
        setTimeout(() => {
          featuresVisible.value[index] = true
        }, index * 100)
      }
    }
  },
  {
    threshold: 0.1
  }
)

onMounted(() => {
  featuresVisible.value = Array.from({ length: LANDING_FEATURES.length }, () => false)
})
</script>

<template>
  <section ref="sectionRef" class="py-20 sm:py-32">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Transition
        enter-active-class="transition-all duration-700 ease-out"
        enter-from-class="opacity-0 translate-y-5"
        enter-to-class="opacity-100 translate-y-0"
      >
        <div v-if="headerVisible" class="text-center mb-16">
          <h2 class="text-4xl sm:text-5xl mb-4 text-default font-medium">Everything You Need to Build Great Resumes</h2>
          <p class="text-xl text-muted max-w-3xl mx-auto">
            Powerful features designed to help you create professional resumes that get results.
          </p>
        </div>
      </Transition>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <Transition
          v-for="(feature, index) in LANDING_FEATURES"
          :key="feature.title"
          enter-active-class="transition-all duration-500 ease-out"
          enter-from-class="opacity-0 translate-y-5"
          enter-to-class="opacity-100 translate-y-0"
        >
          <UCard
            v-if="featuresVisible[index]"
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
        </Transition>
      </div>
    </div>
  </section>
</template>
