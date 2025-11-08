<script setup lang="ts">
import type { TResume } from "~/types/resume.types"
import TemplateSelectionModal from "./TemplateSelectionModal.vue"

const emit = defineEmits<{
  created: [resume: TResume]
}>()

const isModalOpen = ref(false)

const handleModalOpen = () => {
  isModalOpen.value = true
}

const handleResumeCreated = (resume: TResume) => {
  emit("created", resume)
}
</script>

<template>
  <div>
    <UButton color="primary" size="lg" icon="i-lucide-plus" @click="handleModalOpen">
      <slot>Create New Resume</slot>
    </UButton>
    <TemplateSelectionModal v-model="isModalOpen" @created="handleResumeCreated" />
  </div>
</template>
