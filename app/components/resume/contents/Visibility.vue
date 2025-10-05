<script setup lang="ts">
import type { ButtonProps } from "@nuxt/ui"

const props = defineProps<{
  class?: string
  variant?: ButtonProps["variant"]
  size?: ButtonProps["size"]
  isVisible: boolean
  onToggle: () => void
}>()
</script>

<template>
  <UButton
    :class="props.class"
    :variant="props.variant ?? 'subtle'"
    :size="props.size ?? 'sm'"
    :icon="props.isVisible ? 'i-lucide-eye' : 'i-lucide-eye-off'"
    @click="props.onToggle"
  />
</template>
