<script setup lang="ts">
const props = defineProps<{ section: { title: string }; headingColor: string }>()
</script>
<template>
  <div class="flex items-center border-b-2 pb-1" :style="{ borderBottomColor: props.headingColor }">
    {{ props.section.title }}
  </div>
</template>
