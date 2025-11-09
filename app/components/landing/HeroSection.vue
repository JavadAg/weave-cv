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
        <Transition
          appear
          enter-active-class="transition-all duration-700 ease-out"
          enter-from-class="opacity-0 translate-y-5"
          enter-to-class="opacity-100 translate-y-0"
        >
          <div class="text-inverted">
            <h1 class="text-5xl sm:text-6xl lg:text-7xl font-medium mb-6">
              Create Your Professional Resume in Minutes
            </h1>
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
        </Transition>
        <Transition
          appear
          enter-active-class="transition-all duration-700 ease-out"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
        >
          <div class="relative">
            <div
              class="relative rounded-2xl overflow-hidden shadow-2xl bg-default/90 p-8 transform rotate-2 hover:rotate-0 transition-transform duration-300"
            >
              <NuxtImg
                src="https://images.unsplash.com/photo-1587116987928-21e47bd76cd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjByZXN1bWUlMjBkb2N1bWVudHxlbnwxfHx8fDE3NjI3MTk0MTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Professional resume preview"
                class="w-full h-auto rounded-lg"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-default/50 to-transparent pointer-events-none" />
            </div>
            <div
              class="absolute -top-4 -right-4 bg-green-500 text-inverted px-4 py-2 rounded-full shadow-lg animate-bounce-slow"
            >
              ATS-Friendly ✓
            </div>
            <div
              class="absolute -bottom-4 -left-4 bg-blue-500 text-inverted px-4 py-2 rounded-full shadow-lg animate-bounce-slow-delay"
            >
              Professional Design
            </div>
          </div>
        </Transition>
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
