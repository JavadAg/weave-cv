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
    :style="{
      backgroundColor: backgroundColor,
      color: props.headingColor,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      padding: '0.3em 1em',
      borderRadius: '1.5em'
    }"
  >
    {{ props.section.title }}
  </div>
</template>
