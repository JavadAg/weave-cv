<script setup lang="ts">
const emit = defineEmits<{
  (e: "updateHeight", height: number): void
}>()

const elementRef = ref<HTMLElement>()
const { height } = useElementSize(elementRef)

watch(height, (newHeight) => {
  if (newHeight !== undefined) {
    emit("updateHeight", newHeight)
  }
})
</script>
<template>
  <div ref="elementRef">
    <slot />
  </div>
</template>
