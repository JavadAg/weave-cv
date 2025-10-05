<script setup lang="ts">
import RichTextEditor from "~/components/ui/rich-text/RichTextEditor.vue"
import TextInput from "~/components/ui/TextInput.vue"
import type { TLanguageData } from "~/utils/schemas/content.schema"

interface Props {
  id: string
  language: TLanguageData
}
const props = defineProps<Props>()
const emit = defineEmits(["closeEdit"])

const { updateContent } = useResumeStore()

const handleFieldUpdate = (field: keyof TLanguageData, value: unknown) => {
  updateContent(`${props.id}.data.${props.language.id}.${field}`, value)
}

const handleDone = () => {
  emit("closeEdit")
}
</script>

<template>
  <div class="flex flex-col gap-4 rounded-lg p-3 w-full bg-accented/40">
    <span class="text-lg font-semibold">Edit Language</span>
    <div class="space-y-3">
      <TextInput
        :model-value="props.language.title"
        label="Language"
        placeholder="e.g. English, Spanish, French"
        @update:model-value="(value) => handleFieldUpdate('title', value)"
      />
      <RichTextEditor
        :content="props.language.description || ''"
        label="Description"
        placeholder="e.g. Native, Fluent, Intermediate, Beginner"
        @update:content="(value) => handleFieldUpdate('description', value)"
      />
    </div>
    <UButton size="lg" class="w-full justify-center" label="Done" @click="handleDone" />
  </div>
</template>
