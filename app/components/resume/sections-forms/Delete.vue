<script setup lang="ts">
import type { ButtonProps } from "@nuxt/ui"

const props = defineProps<{
  class?: string
  variant?: ButtonProps["variant"]
  size?: ButtonProps["size"]
  onDelete: () => void
  tooltip?: string
}>()

const isOpen = ref(false)

const handleDelete = () => {
  props.onDelete()
  isOpen.value = false
}

const handleCancel = () => {
  isOpen.value = false
}
</script>

<template>
  <UPopover v-model:open="isOpen">
    <UTooltip :text="props.tooltip ?? 'Delete'">
      <UButton
        :class="props.class"
        :variant="props.variant ?? 'ghost'"
        :size="props.size ?? 'sm'"
        icon="i-lucide-trash-2"
        aria-label="Delete section"
        @click="isOpen = true"
      />
    </UTooltip>
    <template #content>
      <div class="p-3 space-y-3">
        <p class="text-sm text-default">Are you sure you want to delete this?</p>
        <div class="flex justify-end gap-2">
          <UButton size="sm" color="neutral" variant="ghost" @click="handleCancel">Cancel</UButton>
          <UButton size="sm" color="error" @click="handleDelete">Delete</UButton>
        </div>
      </div>
    </template>
  </UPopover>
</template>
