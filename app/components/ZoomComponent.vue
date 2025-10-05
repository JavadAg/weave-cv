<script setup lang="ts">
interface Props {
  scale: number
}

const props = defineProps<Props>()

const container = ref<HTMLElement>()

const transformStyle = computed(() => ({
  width: "fit-content",
  transformOrigin: "top left",
  transform: `scale(${props.scale})`
}))
</script>

<template>
  <div ref="container" :style="transformStyle">
    <slot />
  </div>
</template>
