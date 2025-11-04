<script setup lang="ts">
import type { ButtonProps } from "@nuxt/ui"

const props = defineProps<{
  class?: string
  variant?: ButtonProps["variant"]
  size?: ButtonProps["size"]
  onDelete: () => void
}>()
</script>

<template>
  <UButton
    :class="props.class"
    :variant="props.variant ?? 'ghost'"
    :size="props.size ?? 'sm'"
    icon="i-lucide-trash-2"
    @click="props.onDelete"
  />
</template>
