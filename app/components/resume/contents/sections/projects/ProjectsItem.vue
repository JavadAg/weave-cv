<script setup lang="ts">
import Delete from "~/components/resume/contents/Delete.vue"
import Visibility from "~/components/resume/contents/Visibility.vue"
import type { TProjectData } from "~/utils/schemas/content.schema"
import ProjectsInfoEditor from "./ProjectsInfoEditor.vue"

interface Props {
  id: string
  project: TProjectData
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
  updateContent(`${props.id}.data.${props.project.id}.isVisible`, !props.project.isVisible)
}
</script>

<template>
  <template v-if="isEditing">
    <ProjectsInfoEditor :id="props.id" :project="props.project" @close-edit="closeEditMode" />
  </template>
  <div v-else class="flex items-center gap-2">
    <button
      type="button"
      class="flex flex-1 items-center hover:bg-accented/80 duration-150 bg-accented/50 rounded-md p-2 divide-x divide-accented [&>*]:px-2 [&>*]:text-sm"
      @click="isEditing = !isEditing"
    >
      <span class="font-bold">{{ project.title }}</span>
      <span>{{ project.subtitle }}</span>
    </button>
    <Visibility :is-visible="project.isVisible ?? true" :on-toggle="() => handleToggleVisibility()" />
    <Delete :on-delete="() => emits('delete')" />
  </div>
</template>
