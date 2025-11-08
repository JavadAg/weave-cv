<script setup lang="ts">
import type { TResume } from "~/types/resume.types"
import ResumeCard from "./card/ResumeCard.vue"

interface Props {
  resumes: TResume[]
}

defineProps<Props>()

const emits = defineEmits<{
  refresh: []
}>()
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <ResumeCard v-for="resume in resumes" :key="resume.id" :resume="resume" @refresh="emits('refresh')" />
  </div>
</template>
