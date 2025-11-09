<script setup lang="ts">
import { LANDING_BENEFITS } from "~/constants/landing"

const sectionRef = ref<HTMLElement>()
const headerVisible = ref(false)
const benefitsVisible = ref<boolean[]>([])

const { stop: stopHeader } = useIntersectionObserver(
  sectionRef,
  (entries) => {
    const entry = entries[0]
    if (entry?.isIntersecting) {
      headerVisible.value = true
      stopHeader()

      for (const [index] of LANDING_BENEFITS.entries()) {
        setTimeout(() => {
          benefitsVisible.value[index] = true
        }, index * 150)
      }
    }
  },
  {
    threshold: 0.1
  }
)

onMounted(() => {
  benefitsVisible.value = Array.from({ length: LANDING_BENEFITS.length }, () => false)
})
</script>

<template>
  <section ref="sectionRef" class="py-20 sm:py-32 bg-muted">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Transition
        enter-active-class="transition-all duration-700 ease-out"
        enter-from-class="opacity-0 translate-y-5"
        enter-to-class="opacity-100 translate-y-0"
      >
        <div v-if="headerVisible" class="text-center mb-16">
          <h2 class="text-4xl sm:text-5xl mb-4 text-default font-medium">Why Job Seekers Love Weave CV</h2>
          <p class="text-xl text-muted max-w-3xl mx-auto">
            Real benefits that help you achieve your career goals faster.
          </p>
        </div>
      </Transition>

      <div class="grid md:grid-cols-3 gap-8">
        <Transition
          v-for="(benefit, index) in LANDING_BENEFITS"
          :key="benefit.title"
          enter-active-class="transition-all duration-500 ease-out"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
        >
          <UCard
            v-if="benefitsVisible[index]"
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
        </Transition>
      </div>
    </div>
  </section>
</template>
