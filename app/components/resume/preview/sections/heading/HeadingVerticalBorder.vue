<script setup lang="ts">
const props = defineProps<{ section: { title: string }; headingColor: string }>()
</script>
<template>
  <div class="flex items-center border-l-4 pl-2" :style="{ borderLeftColor: props.headingColor }">
    {{ props.section.title }}
  </div>
</template>
