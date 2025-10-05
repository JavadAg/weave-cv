<script setup lang="ts">
import { DEFAULT_EDUCATION_ITEM } from "~/constants/default"
import type { TEducationData } from "~/utils/schemas/content.schema"
import EducationItem from "./EducationItem.vue"

interface Props {
  id: string
  educations: TEducationData[]
}

const props = defineProps<Props>()

const { updateContent } = useResumeStore()

const handleAddEducation = () => {
  const newEducation: TEducationData = {
    id: `education-${Date.now()}`,
    ...DEFAULT_EDUCATION_ITEM
  }

  updateContent(`${props.id}.data`, [...props.educations, newEducation])
}

const handleDeleteEducation = (id: string) => {
  updateContent(
    `${props.id}.data`,
    props.educations.filter((education) => education.id !== id)
  )
}
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="flex flex-col gap-2">
      <EducationItem
        v-for="education in props.educations"
        :id="id"
        :key="education.id"
        :education="education"
        class="relative group"
        @delete="handleDeleteEducation(education.id)"
      />
    </div>
    <UButton variant="subtle" class="flex justify-center items-center" @click="handleAddEducation">
      + Add Education
    </UButton>
  </div>
</template>
