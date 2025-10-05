<script setup lang="ts">
import logo from "~/assets/images/logo.webp"
import Theme from "~/components/layout/Theme.vue"
</script>
<template>
  <div
    class="w-full relative grid gap-4 min-h-dvh mx-auto pb-2 grid-rows-[auto_1fr] after:content-[''] after:absolute after:top-0 after:z-[-2] after:size-full after:bg-[radial-gradient(#ccc_1px,#e9e9e9_1px)] after:[background-size:16px_16px] dark:after:bg-[radial-gradient(#2b2b2b_1px,#15161e_1px)] dark:after:[background-size:20px_20px]"
  >
    <header class="h-16 bg-default/80 border-b border-default/30">
      <div class="max-w-[1600px] mx-auto h-full flex justify-between py-2 px-4 items-center">
        <NuxtLink to="/" class="flex h-full w-fit">
          <img :src="logo" alt="Logo" />
        </NuxtLink>
        <Theme />
      </div>
    </header>
    <main class="w-full px-3 max-w-[1600px] mx-auto [&>div]:h-full">
      <slot />
    </main>
  </div>
</template>
