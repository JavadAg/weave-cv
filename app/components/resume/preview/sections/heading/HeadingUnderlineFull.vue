<script setup lang="ts">
const props = defineProps<{ section: { title: string }; headingColor: string }>()
</script>
<template>
  <div
    :style="{
      borderBottomColor: props.headingColor,
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      borderBottomWidth: '0.15em',
      paddingBottom: '0.15em'
    }"
  >
    {{ props.section.title }}
  </div>
</template>
