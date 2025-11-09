<script setup lang="ts">
import logo from "~/assets/images/logo.webp"
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-default text-inverted">
    <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div class="flex flex-col items-center justify-center text-center">
        <div class="flex items-center gap-2 mb-4">
          <img :src="logo" alt="Weave CV" class="w-36" />
        </div>
        <p class="text-default/70 mb-6 max-w-md">Create professional resumes that get you hired.</p>
      </div>
      <div class="border-t border-default/30 pt-8 text-center text-muted">
        <p>&copy; {{ currentYear }} Weave CV. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>
