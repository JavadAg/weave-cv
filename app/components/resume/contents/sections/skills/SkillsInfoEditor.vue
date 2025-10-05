<script setup lang="ts">
import RichTextEditor from "~/components/ui/rich-text/RichTextEditor.vue"
import TextInput from "~/components/ui/TextInput.vue"
import type { SectionByType } from "~/types/resume.types"

interface Props {
  id: string
  skillGroup: SectionByType<"skills">["data"][number]
}
const props = defineProps<Props>()
const emit = defineEmits(["closeEdit"])

const { updateContent } = useResumeStore()

const handleFieldUpdate = (field: keyof SectionByType<"skills">["data"][number], value: unknown) => {
  updateContent(`${props.id}.data.${props.skillGroup.id}.${field}`, value)
}

const handleDone = () => {
  emit("closeEdit")
}
</script>

<template>
  <div class="flex flex-col gap-4 rounded-lg p-3 w-full bg-accented/40">
    <span class="text-lg font-semibold">Edit Skill Group</span>
    <TextInput
      :model-value="props.skillGroup.title"
      label="Group Title"
      placeholder="e.g. Programming Languages"
      @update:model-value="(value) => handleFieldUpdate('title', value)"
    />
    <RichTextEditor
      :content="props.skillGroup.description"
      label="Description"
      placeholder="Enter your description..."
      @update:content="(htmlContent) => handleFieldUpdate('description', htmlContent)"
    />
    <UButton size="lg" class="w-full justify-center" label="Done" @click="handleDone" />
  </div>
</template>
