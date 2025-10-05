<script setup lang="ts">
import Visibility from "~/components/resume/contents/Visibility.vue"
import type { TExperienceData } from "~/utils/schemas/content.schema"
import Delete from "../../Delete.vue"
import ExperienceInfoEditor from "./ExperienceInfoEditor.vue"

interface Props {
  id: string
  experience: TExperienceData
}

const props = defineProps<Props>()
const emits = defineEmits<{
  (e: "delete"): void
}>()

const isEditing = ref(false)

const closeEditMode = () => {
  isEditing.value = false
}

const { updateContent } = useResumeStore()

const handleToggleVisibility = () => {
  updateContent(`${props.id}.data.${props.experience.id}.isVisible`, !props.experience.isVisible)
}
</script>

<template>
  <template v-if="isEditing">
    <ExperienceInfoEditor :id="props.id" :experience="props.experience" @close-edit="closeEditMode" />
  </template>
  <div v-else class="flex items-center gap-2">
    <button
      type="button"
      class="flex flex-1 items-center hover:bg-accented/80 duration-150 bg-accented/50 rounded-md p-2 divide-x divide-accented [&>*]:px-2 [&>*]:text-sm"
      @click="isEditing = !isEditing"
    >
      <span class="font-bold">{{ experience.role }}</span>
      <span>{{ experience.company }}</span>
      <span>{{ experience.location }}</span>
    </button>
    <Visibility :is-visible="experience.isVisible" :on-toggle="() => handleToggleVisibility()" />
    <Delete :on-delete="() => emits('delete')" />
  </div>
</template>
