<script setup lang="ts">
import logo from "~/assets/images/logo.webp"
import Theme from "~/components/layout/Theme.vue"

const route = useRoute()
const isLandingPage = computed(() => route.path === "/")
</script>
<template>
  <div
    class="w-full relative grid min-h-dvh mx-auto grid-rows-[auto_1fr] after:content-[''] after:absolute after:top-0 after:z-[-2] after:size-full after:bg-[radial-gradient(#ddd_1px,#efefef_1px)] after:[background-size:16px_16px] dark:after:bg-[radial-gradient(#3b3b3b_1px,#222226_1px)] dark:after:[background-size:20px_20px]"
  >
    <header class="h-16 bg-default/80 border-b border-default/30">
      <div
        :class="[
          'mx-auto max-w-[1600px] h-full flex justify-between py-2 px-4 items-center',
          !isLandingPage && 'max-w-[1600px]'
        ]"
      >
        <NuxtLink to="/" class="flex h-full w-fit">
          <img :src="logo" alt="Logo" />
        </NuxtLink>
        <Theme />
      </div>
    </header>
    <main
      :class="['w-full mx-auto [&>div]:h-full', !isLandingPage && 'max-w-[1600px] py-4 px-3 sm:px-5 md:px-8 lg:px-10']"
    >
      <slot />
    </main>
  </div>
</template>
