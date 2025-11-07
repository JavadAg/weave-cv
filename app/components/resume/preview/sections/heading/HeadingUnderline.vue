<script setup lang="ts">
const props = defineProps<{ section: { title: string }; headingColor: string }>()
</script>
<template>
  <div :style="{ borderBottomColor: props.headingColor, borderBottomWidth: '0.2em', paddingBottom: '0.15em' }">
    {{ props.section.title }}
  </div>
</template>
