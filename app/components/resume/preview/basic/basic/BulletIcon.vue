<script setup lang="ts">
interface Props {
  sizeInPx: number
  color: string
  filled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  filled: false
})

const iconStyle = computed(() => ({
  width: `${props.sizeInPx}px`,
  height: `${props.sizeInPx}px`,
  fill: props.filled ? props.color : "none",
  stroke: props.color,
  strokeWidth: props.filled ? "0" : "2"
}))
</script>

<template>
  <svg :style="iconStyle" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="6" />
  </svg>
</template>
