<script setup lang="ts">
import type { Tables } from "~/types/database.types"
import ResumeCard from "./ResumeCard.vue"

interface Props {
  resumes: Tables<"resumes">[]
}

defineProps<Props>()

const emit = defineEmits<{
  edit: [id: string]
  delete: [id: string]
}>()
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <ResumeCard
      v-for="resume in resumes"
      :key="resume.id"
      :resume="resume"
      @edit="emit('edit', $event)"
      @delete="emit('delete', $event)"
    />
  </div>
</template>
