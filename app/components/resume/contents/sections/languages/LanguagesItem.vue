<script setup lang="ts">
import Visibility from "~/components/resume/contents/Visibility.vue"
import type { TLanguageData } from "~/utils/schemas/content.schema"
import Delete from "../../Delete.vue"
import LanguagesInfoEditor from "./LanguagesInfoEditor.vue"

interface Props {
  id: string
  language: TLanguageData
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
  updateContent(`${props.id}.data.${props.language.id}.isVisible`, !props.language.isVisible)
}
</script>

<template>
  <template v-if="isEditing">
    <LanguagesInfoEditor :id="props.id" :language="props.language" @close-edit="closeEditMode" />
  </template>
  <div v-else class="flex items-center gap-2">
    <button
      type="button"
      class="flex flex-1 items-center hover:bg-accented/80 duration-150 bg-accented/50 rounded-md p-2 divide-x divide-accented [&>*]:px-2 [&>*]:text-sm"
      @click="isEditing = !isEditing"
    >
      <span class="font-bold">{{ language.title }}</span>
      <span v-if="language.description">{{ language.description }}</span>
    </button>
    <Visibility :is-visible="language.isVisible ?? true" :on-toggle="() => handleToggleVisibility()" />
    <Delete :on-delete="() => emits('delete')" />
  </div>
</template>
