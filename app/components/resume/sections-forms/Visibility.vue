<script setup lang="ts">
import type { ButtonProps } from "@nuxt/ui"

const props = defineProps<{
  class?: string
  variant?: ButtonProps["variant"]
  size?: ButtonProps["size"]
  isHidden: boolean
  onToggle: () => void
}>()
</script>

<template>
  <UButton
    :class="props.class"
    :variant="props.variant ?? 'ghost'"
    :size="props.size ?? 'sm'"
    :icon="props.isHidden ? 'i-lucide-eye-off' : 'i-lucide-eye'"
    @click="props.onToggle"
  />
</template>
