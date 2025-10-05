<script setup lang="ts">
import Delete from "~/components/resume/contents/Delete.vue"
import Visibility from "~/components/resume/contents/Visibility.vue"
import type { TSkillData } from "~/utils/schemas/content.schema"
import SkillsInfoEditor from "./SkillsInfoEditor.vue"

interface Props {
  id: string
  skillGroup: TSkillData
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
  updateContent(`${props.id}.data.${props.skillGroup.id}.isVisible`, !props.skillGroup.isVisible)
}
</script>

<template>
  <template v-if="isEditing">
    <SkillsInfoEditor :id="props.id" :skill-group="props.skillGroup" @close-edit="closeEditMode" />
  </template>
  <div v-else class="flex items-center gap-2">
    <button
      type="button"
      class="flex flex-1 items-center hover:bg-accented/80 duration-150 bg-accented/50 rounded-md p-2 divide-x divide-accented [&>*]:px-2 [&>*]:text-sm"
      @click="isEditing = !isEditing"
    >
      <span class="font-bold">{{ skillGroup.title }}</span>
    </button>
    <Visibility :is-visible="skillGroup.isVisible ?? true" :on-toggle="() => handleToggleVisibility()" />
    <Delete :on-delete="() => emits('delete')" />
  </div>
</template>
