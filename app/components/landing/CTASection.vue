<script setup lang="ts">
const user = useSupabaseUser()

const sectionRef = ref<HTMLElement>()
const contentVisible = ref(false)

const { stop } = useIntersectionObserver(
  sectionRef,
  (entries) => {
    const entry = entries[0]
    if (entry?.isIntersecting) {
      contentVisible.value = true
      stop()
    }
  },
  {
    threshold: 0.1
  }
)
</script>

<template>
  <section
    ref="sectionRef"
    class="relative overflow-hidden bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 dark:from-orange-600 dark:via-amber-600 dark:to-yellow-600"
  >
    <div class="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]" />
    <div class="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />

    <div class="relative mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8 sm:py-32 text-center">
      <Transition
        enter-active-class="transition-all duration-700 ease-out"
        enter-from-class="opacity-0 translate-y-5"
        enter-to-class="opacity-100 translate-y-0"
      >
        <div v-if="contentVisible">
          <h2 class="text-4xl sm:text-5xl font-medium lg:text-6xl mb-6 text-inverted">
            Ready to Build Your Dream Resume?
          </h2>
          <p class="text-xl sm:text-2xl mb-8 text-inverted/90">
            Join thousands of job seekers who've landed their dream jobs with professional resumes from Weave CV.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <UButton
              :icon="user ? 'i-lucide-sparkles' : 'i-lucide-plus'"
              to="/dashboard"
              :trailing-icon="user ? 'i-lucide-arrow-right' : 'i-lucide-plus'"
              size="xl"
              class="bg-default text-orange-600 hover:bg-default/90 shadow-xl"
            >
              {{ user ? "Go to Dashboard" : "Create Your Resume" }}
            </UButton>
          </div>

          <p class="text-inverted/90">No credit card required • Free forever plan • Up to 4 resumes</p>
        </div>
      </Transition>
    </div>
  </section>
</template>
