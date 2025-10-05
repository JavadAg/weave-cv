<script setup lang="ts">
const emit = defineEmits<{
  create: []
}>()
</script>

<template>
  <div class="text-center py-12">
    <div class="mx-auto size-24 bg-muted rounded-full flex items-center justify-center border border-default/20 mb-6">
      <UIcon name="i-lucide-file-text" class="size-12 text-muted" />
    </div>
    <h3 class="text-xl font-semibold text-default mb-2">No resumes yet</h3>
    <p class="text-muted mb-6">Create your first resume to get started</p>
    <UButton color="primary" size="lg" icon="i-lucide-plus" @click="emit('create')"> Create Your First Resume </UButton>
  </div>
</template>
