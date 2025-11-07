<script setup lang="ts">
const props = defineProps<{ section: { title: string } }>()
</script>
<template>
  <span :style="{ display: 'flex', alignItems: 'center' }">{{ props.section.title }}</span>
</template>
