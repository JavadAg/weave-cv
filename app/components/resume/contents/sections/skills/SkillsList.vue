<script setup lang="ts">
import { DEFAULT_SKILL_ITEM } from "~/constants/default"
import type { TSkillData } from "~/utils/schemas/content.schema"
import SkillsItem from "./SkillsItem.vue"

interface Props {
  id: string
  skills: TSkillData[]
}

const props = defineProps<Props>()

const { updateContent } = useResumeStore()

const handleAddSkillGroup = () => {
  const newSkillGroup: TSkillData = { id: `skill-${Date.now()}`, ...DEFAULT_SKILL_ITEM }

  updateContent(`${props.id}.data`, [...props.skills, newSkillGroup])
}

const handleDeleteSkillGroup = (id: string) => {
  updateContent(
    `${props.id}.data`,
    props.skills.filter((skillGroup) => skillGroup.id !== id)
  )
}
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="flex flex-col gap-2">
      <SkillsItem
        v-for="skillGroup in props.skills"
        :id="id"
        :key="skillGroup.id"
        :skill-group="skillGroup"
        class="relative group"
        @delete="handleDeleteSkillGroup(skillGroup.id)"
      />
    </div>
    <UButton
      variant="subtle"
      class="w-full flex justify-center items-center"
      type="button"
      @click="handleAddSkillGroup"
    >
      + Add Skill Group
    </UButton>
  </div>
</template>
