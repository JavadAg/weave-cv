<script setup lang="ts">
const user = useSupabaseUser()
</script>

<template>
  <section class="relative overflow-hidden pt-20 pb-32 px-4">
    <div
      class="absolute inset-0 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-orange-950/20 dark:via-amber-950/20 dark:to-yellow-950/20"
    />
    <div class="relative max-w-7xl mx-auto">
      <div class="text-center max-w-4xl mx-auto">
        <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold text-default mb-6 leading-tight">
          Create Your
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-400 dark:to-amber-400"
          >
            Professional Resume
          </span>
          in Minutes
        </h1>
        <p class="text-xl md:text-2xl text-muted mb-10 max-w-2xl mx-auto">
          Build, edit, and download beautiful resumes that help you land your dream job. No design experience needed.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <UButton v-if="!user" to="/register" size="xl" color="primary" class="px-8 py-6 text-lg font-semibold">
            Get Started Free
          </UButton>
          <UButton v-else to="/dashboard" size="xl" color="primary" class="px-8 py-6 text-lg font-semibold">
            Go to Dashboard
          </UButton>
          <UButton to="/login" size="xl" variant="outline" color="neutral" class="px-8 py-6 text-lg font-semibold">
            Sign In
          </UButton>
        </div>
        <div class="flex flex-wrap justify-center items-center gap-8 text-muted text-sm">
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-check-circle" class="size-5 text-green-600 dark:text-green-400" />
            <span>No credit card required</span>
          </div>
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-check-circle" class="size-5 text-green-600 dark:text-green-400" />
            <span>Free to use</span>
          </div>
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-check-circle" class="size-5 text-green-600 dark:text-green-400" />
            <span>Up to 4 resumes</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
