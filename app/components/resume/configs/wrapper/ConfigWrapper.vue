<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    variant?: "stacked" | "grid"
  }>(),
  {
    variant: "stacked"
  }
)
</script>

<template>
  <div>
    <h4 class="text-sm font-medium text-default mb-1">{{ title }}</h4>
    <div v-if="variant === 'grid'" class="grid grid-cols-2 gap-2">
      <slot />
    </div>
    <div v-else class="space-y-2"><slot /></div>
  </div>
</template>
