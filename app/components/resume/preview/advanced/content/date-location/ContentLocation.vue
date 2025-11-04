<script setup lang="ts">
import { computed, type CSSProperties } from "vue"

interface Props {
  position: string
  location?: string
}

const props = defineProps<Props>()

const getTextAlign = () => {
  if (["contentFirst", "stacked"].includes(props.position)) {
    return "right"
  }
  return
}

const locationStyles = computed<CSSProperties>(() => ({
  textAlign: getTextAlign()
}))
</script>

<template>
  <span :style="locationStyles">
    {{ location }}
  </span>
</template>
