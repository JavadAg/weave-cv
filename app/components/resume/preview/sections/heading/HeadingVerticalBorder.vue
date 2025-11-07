<script setup lang="ts">
const props = defineProps<{ section: { title: string }; headingColor: string }>()
</script>
<template>
  <div
    :style="{
      borderLeftColor: props.headingColor,
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '0.3em',
      borderLeftWidth: '0.2em'
    }"
  >
    {{ props.section.title }}
  </div>
</template>
