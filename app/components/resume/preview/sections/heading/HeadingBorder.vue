<script setup lang="ts">
const props = defineProps<{ section: { title: string }; headingColor: string }>()
</script>
<template>
  <div
    :style="{
      borderColor: props.headingColor,
      borderBlockStartWidth: '0.15em',
      borderBlockEndWidth: '0.15em',
      padding: '0.15em 0.5em',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      borderRadius: '0.2em'
    }"
  >
    {{ props.section.title }}
  </div>
</template>
