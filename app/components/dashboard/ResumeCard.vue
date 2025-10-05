<script setup lang="ts">
import type { Tables } from "~/types/database.types"

interface Props {
  resume: Tables<"resumes">
}

defineProps<Props>()

const emit = defineEmits<{
  edit: [id: string]
  delete: [id: string]
}>()

const formatDate = (dateString: string | null) => {
  if (!dateString) return ""
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  })
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
                label: 'Edit',
                icon: 'i-lucide-pencil',
                click: () => emit('edit', resume.id)
              }
            ],
            [
              {
                label: 'Delete',
                icon: 'i-lucide-trash',
                click: () => emit('delete', resume.id)
              }
            ]
          ]"
          size="sm"
        >
          <UButton color="neutral" variant="ghost" icon="i-lucide-ellipsis-vertical" size="sm" />
        </UDropdownMenu>
      </div>
    </template>
    <div class="space-y-3">
      <!-- TODO: Add resume content -->
      <p class="text-sm text-muted line-clamp-3">Resume content</p>
      <div class="flex justify-between items-center text-xs text-muted">
        <span>Created {{ formatDate(resume.created_at) }}</span>
        <span v-if="resume.updated_at !== resume.created_at"> Updated {{ formatDate(resume.updated_at) }} </span>
      </div>
    </div>
    <template #footer>
      <div class="flex gap-2">
        <UButton color="neutral" variant="soft" size="sm" class="flex-1" @click="emit('edit', resume.id)">
          Edit
        </UButton>
        <UButton color="error" variant="soft" size="sm" icon="i-lucide-trash" @click="emit('delete', resume.id)" />
      </div>
    </template>
  </UCard>
</template>
