<script setup lang="ts">
const props = defineProps<{ section: { title: string } }>()
</script>
<template>
  <span class="flex items-center">{{ props.section.title }}</span>
</template>
