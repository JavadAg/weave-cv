<script setup lang="ts">
import Visibility from "~/components/resume/contents/Visibility.vue"
import type { TEducationData } from "~/utils/schemas/content.schema"
import Delete from "../../Delete.vue"
import EducationInfoEditor from "./EducationInfoEditor.vue"

interface Props {
  id: string
  education: TEducationData
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
  updateContent(`${props.id}.data.${props.education.id}.isVisible`, !props.education.isVisible)
}
</script>

<template>
  <template v-if="isEditing">
    <EducationInfoEditor :id="props.id" :education="props.education" @close-edit="closeEditMode" />
  </template>
  <div v-else class="flex items-center gap-2">
    <button
      type="button"
      class="flex flex-1 items-center hover:bg-accented/80 duration-150 bg-accented/50 rounded-md p-2 divide-x divide-accented [&>*]:px-2 [&>*]:text-sm"
      @click="isEditing = !isEditing"
    >
      <span class="font-bold">{{ education.degree }}</span>
      <span>{{ education.school }}</span>
      <span>{{ education.location }}</span>
    </button>
    <Visibility :is-visible="education.isVisible ?? true" :on-toggle="() => handleToggleVisibility()" />
    <Delete :on-delete="() => emits('delete')" />
  </div>
</template>
