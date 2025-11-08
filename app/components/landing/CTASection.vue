<script setup lang="ts">
const user = useSupabaseUser()
</script>

<template>
  <section class="py-20 px-4 bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-700 dark:to-amber-700">
    <div class="max-w-4xl mx-auto text-center">
      <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Create Your Resume?</h2>
      <p class="text-xl text-orange-50 mb-10 max-w-2xl mx-auto">
        Start building your professional resume today. It's free, easy, and takes just minutes.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <UButton
          v-if="!user"
          to="/register"
          size="xl"
          color="neutral"
          variant="solid"
          class="px-8 py-6 text-lg font-semibold !bg-white !text-orange-600 hover:!bg-white/90"
        >
          Get Started Free
        </UButton>
        <UButton
          v-else
          to="/dashboard"
          size="xl"
          color="neutral"
          variant="solid"
          class="px-8 py-6 text-lg font-semibold !bg-white !text-orange-600 hover:!bg-white/90"
        >
          Go to Dashboard
        </UButton>
        <UButton to="/login" size="xl" variant="outline" color="neutral" class="px-8 py-6 text-lg font-semibold">
          Sign In
        </UButton>
      </div>
    </div>
  </section>
</template>

