<script setup lang="ts">
const props = defineProps<{ section: { title: string }; headingColor: string }>()
</script>
<template>
  <div class="flex items-center w-full border-y-2 py-1 px-2 rounded-md" :style="{ borderColor: props.headingColor }">
    {{ props.section.title }}
  </div>
</template>
