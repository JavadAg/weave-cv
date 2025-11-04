<script setup lang="ts">
const props = defineProps<{ section: { title: string }; headingColor: string }>()

const backgroundColor = computed(() => {
  const hex = props.headingColor.replace("#", "")
  const r = Number.parseInt(hex.slice(0, 2), 16)
  const g = Number.parseInt(hex.slice(2, 4), 16)
  const b = Number.parseInt(hex.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, 0.15)`
})
</script>

<template>
  <div
    class="flex items-center justify-center w-full px-3 py-2 rounded-full"
    :style="{ backgroundColor: backgroundColor, color: props.headingColor }"
  >
    {{ props.section.title }}
  </div>
</template>
