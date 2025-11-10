<script setup lang="ts">
const user = useSupabaseUser()
</script>

<template>
  <section
    class="relative overflow-hidden bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 dark:from-orange-600 dark:via-amber-600 dark:to-yellow-600"
  >
    <div class="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]" />
    <div class="absolute inset-0 bg-gradient-to-t from-default/10 to-transparent" />

    <div class="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
      <div class="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 700, ease: 'easeOut' } }"
          class="text-inverted"
        >
          <h1 class="text-5xl sm:text-6xl lg:text-7xl font-medium mb-6">Create Your Professional Resume in Minutes</h1>
          <p class="text-xl sm:text-2xl mb-8 opacity-90">
            Build stunning, ATS-friendly resumes that help you stand out to employers and land your dream job.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 mb-8">
            <UButton
              to="/dashboard"
              :icon="'i-lucide-sparkles'"
              class="text-primary bg-default/90 hover:bg-default/100"
              size="xl"
            >
              Go to Dashboard
            </UButton>
            <UButton v-if="!user" to="/login" size="xl" variant="outline" class="ring-default text-inverted">
              Sign In
            </UButton>
          </div>
          <div class="flex flex-wrap gap-3">
            <span
              class="inline-flex items-center gap-1 bg-default/20 font-medium backdrop-blur px-3 py-1.5 rounded-full text-sm"
            >
              <UIcon name="i-lucide-check-circle" class="h-3 w-3" />
              No credit card required
            </span>
            <span
              class="inline-flex items-center gap-1 bg-default/20 font-medium backdrop-blur px-3 py-1.5 rounded-full text-sm"
            >
              <UIcon name="i-lucide-check-circle" class="h-3 w-3" />
              Free to use
            </span>
            <span
              class="inline-flex items-center gap-1 bg-default/20 font-medium backdrop-blur px-3 py-1.5 rounded-full text-sm"
            >
              <UIcon name="i-lucide-check-circle" class="h-3 w-3" />
              Up to 4 resumes
            </span>
          </div>
        </div>
        <div
          v-motion
          :initial="{ opacity: 0, scale: 0.95 }"
          :enter="{ opacity: 1, scale: 1, transition: { duration: 700, ease: 'easeOut', delay: 100 } }"
          class="relative"
        >
          <div
            class="relative rounded-2xl overflow-hidden shadow-2xl bg-default/90 p-8 transform rotate-2 hover:rotate-0 transition-transform duration-300"
          >
            <div class="relative w-full aspect-[4/3] rounded-lg bg-muted overflow-hidden">
              <NuxtImg
                src="/images/hero.webp"
                alt="Professional resume preview"
                class="w-full h-full object-cover rounded-lg"
                loading="eager"
                format="webp"
                placeholder
              />
            </div>
            <div
              class="absolute inset-0 bg-gradient-to-t from-default/50 to-transparent pointer-events-none rounded-2xl"
            />
          </div>
          <div
            v-motion
            :initial="{ opacity: 0, y: -10 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 500, ease: 'easeOut', delay: 800 } }"
            class="absolute -top-4 -right-4 bg-green-500 text-inverted px-4 py-2 rounded-full shadow-lg animate-bounce-slow"
          >
            ATS-Friendly ✓
          </div>
          <div
            v-motion
            :initial="{ opacity: 0, y: 10 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 500, ease: 'easeOut', delay: 1000 } }"
            class="absolute -bottom-4 -left-4 bg-blue-500 text-inverted px-4 py-2 rounded-full shadow-lg animate-bounce-slow-delay"
          >
            Professional Design
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes bounce-slow {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes bounce-slow-delay {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

.animate-bounce-slow {
  animation: bounce-slow 2s ease-in-out infinite;
}

.animate-bounce-slow-delay {
  animation: bounce-slow-delay 2.5s ease-in-out infinite;
  animation-delay: 0.5s;
}
</style>
