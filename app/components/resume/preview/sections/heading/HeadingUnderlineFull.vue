<script setup lang="ts">
const props = defineProps<{ section: { title: string }; headingColor: string }>()
</script>
<template>
  <div class="flex items-center w-full border-b-2 pb-1">
    {{ props.section.title }}
  </div>
</template>
