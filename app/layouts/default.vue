<script setup lang="ts">
import logo from '~/assets/images/logo.webp'
import Theme from '~/components/layout/Theme.vue'
</script>
<template>
  <div
    class="w-full relative grid gap-2 px-3 mx-auto grid-rows-[auto_1fr_auto] min-h-dvh after:content-[''] after:absolute after:top-0 after:z-[-2] after:size-full after:bg-default after:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"
  >
    <header class="flex items-center h-16 justify-between py-2 px-4">
      <NuxtLink to="/" class="flex h-full w-fit">
        <img :src="logo" alt="Logo" />
      </NuxtLink>
      <Theme />
    </header>
    <main class="w-full [&>div]:h-full">
      <slot />
    </main>
  </div>
</template>
