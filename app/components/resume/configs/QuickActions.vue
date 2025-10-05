<script setup lang="ts">
interface Emits {
  (e: 'update:markdown', value: string): void
}

const props = defineProps<{
  markdown: string
}>()

const emit = defineEmits<Emits>()

const markdownModel = computed({
  get: () => props.markdown,
  set: (value: string) => emit('update:markdown', value)
})
</script>

<template>
  <div class="space-y-3">
    <h4
      class="text-sm font-semibold text-ui-foreground flex items-center gap-2">
      <UIcon name="i-heroicons-bolt" class="w-4 h-4" />
      Quick Actions
    </h4>
    <div class="space-y-2">
      <UButton
        variant="ghost"
        size="sm"
        class="w-full justify-start text-left"
        @click="markdownModel = markdownModel + '\n\n---\n\n'">
        <UIcon name="i-heroicons-minus" class="w-4 h-4 mr-2" />
        Add Divider
      </UButton>
      <UButton
        variant="ghost"
        size="sm"
        class="w-full justify-start text-left"
        @click="markdownModel = markdownModel + '\n\n## \n\n'">
        <UIcon name="i-heroicons-plus" class="w-4 h-4 mr-2" />
        Add Section
      </UButton>
      <UButton
        variant="ghost"
        size="sm"
        class="w-full justify-start text-left"
        @click="markdownModel = markdownModel + '\n- \n'">
        <UIcon name="i-heroicons-list-bullet" class="w-4 h-4 mr-2" />
        Add List Item
      </UButton>
    </div>
  </div>
</template>
