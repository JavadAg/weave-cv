<script setup lang="ts">
import { DEFAULT_EXPERIENCE_ITEM } from "~/constants/default"
import type { TExperienceData } from "~/utils/schemas/content.schema"
import ExperienceItem from "./ExperienceItem.vue"

interface Props {
  id: string
  experiences: TExperienceData[]
}

const props = defineProps<Props>()

const { updateContent } = useResumeStore()

const handleAddExperience = () => {
  const newExperience: TExperienceData = {
    id: `experience-${Date.now()}`,
    ...DEFAULT_EXPERIENCE_ITEM
  }

  updateContent(`${props.id}.data`, [...props.experiences, newExperience])
}

const handleDeleteExperience = (id: string) => {
  updateContent(
    `${props.id}.data`,
    props.experiences.filter((experience) => experience.id !== id)
  )
}
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="flex flex-col gap-2">
      <ExperienceItem
        v-for="experience in props.experiences"
        :id="id"
        :key="experience.id"
        :experience="experience"
        class="relative group"
        @delete="handleDeleteExperience(experience.id)"
      />
    </div>
    <UButton variant="subtle" class="flex justify-center items-center" @click="handleAddExperience">
      + Add Experience
    </UButton>
  </div>
</template>
