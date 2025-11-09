<script setup lang="ts">
import DeleteResumeModal from "~/components/dashboard/card/DeleteResumeModal.vue"
import type { TResume } from "~/types/resume.types"
import ResumeCardContent from "./ResumeCardContent.vue"

interface Props {
  resume: TResume
  disableDuplicate?: boolean
}

const props = defineProps<Props>()

const emits = defineEmits<{
  refresh: []
}>()

const isDeleteModalOpen = ref(false)
const isDuplicating = ref(false)
const toast = useToast()

const refreshData = () => {
  emits("refresh")
}

const handleDeleteClick = () => {
  isDeleteModalOpen.value = true
}

const handleDuplicateClick = async () => {
  if (isDuplicating.value) return

  isDuplicating.value = true

  try {
    await $fetch(`/api/resumes/${props.resume.id}/duplicate`, {
      method: "POST"
    })

    toast.add({
      title: "Success",
      description: "Resume duplicated successfully",
      color: "success"
    })

    refreshData()
  } catch (error) {
    console.error("Failed to duplicate resume:", error)

    toast.add({
      title: "Error",
      description: "Failed to duplicate resume",
      color: "error"
    })
  } finally {
    isDuplicating.value = false
  }
}
</script>

<template>
  <UCard class="hover:shadow-lg transition-shadow duration-200">
    <template #header>
      <div class="flex justify-between items-start">
        <h3 class="text-lg font-semibold text-default truncate">
          {{ resume.title }}
        </h3>
        <UDropdownMenu
          :items="[
            [
              {
                label: isDuplicating ? 'Duplicating...' : 'Duplicate',
                icon: 'i-lucide-copy',
                disabled: isDuplicating || disableDuplicate,
                onSelect: () => handleDuplicateClick()
              },
              {
                label: 'Delete',
                icon: 'i-lucide-trash',
                onSelect: () => handleDeleteClick()
              }
            ]
          ]"
          size="sm"
        >
          <UButton color="neutral" variant="ghost" icon="i-lucide-ellipsis-vertical" size="sm" />
        </UDropdownMenu>
      </div>
    </template>
    <ResumeCardContent :resume="resume" />
  </UCard>
  <DeleteResumeModal v-model="isDeleteModalOpen" :resume="resume" @deleted="refreshData" />
</template>
