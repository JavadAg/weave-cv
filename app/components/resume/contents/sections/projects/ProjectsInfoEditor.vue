<script setup lang="ts">
import RichTextEditor from "~/components/ui/rich-text/RichTextEditor.vue"
import TextInput from "~/components/ui/TextInput.vue"
import type { SectionByType } from "~/types/resume.types"

interface Props {
  id: string
  project: SectionByType<"projects">["data"][number]
}
const props = defineProps<Props>()
const emit = defineEmits(["closeEdit"])

const { updateContent } = useResumeStore()

const handleFieldUpdate = (field: keyof SectionByType<"projects">["data"][number], value: unknown) => {
  updateContent(`${props.id}.data.${props.project.id}.${field}`, value)
}

const handleDone = () => {
  emit("closeEdit")
}
</script>

<template>
  <div class="flex flex-col gap-4 rounded-lg p-3 w-full bg-accented/40">
    <span class="text-lg font-semibold">Edit Project</span>
    <div class="space-y-3">
      <TextInput
        :model-value="props.project.title"
        label="Project Name"
        placeholder="e.g. My Awesome App"
        @update:model-value="(value) => handleFieldUpdate('title', value)"
      />
      <TextInput
        :model-value="props.project.subtitle"
        label="Project Description"
        placeholder="e.g. A web application for task management"
        @update:model-value="(value) => handleFieldUpdate('subtitle', value)"
      />
      <TextInput
        :model-value="props.project.url || ''"
        label="Project URL"
        placeholder="e.g. https://myproject.com"
        type="url"
        @update:model-value="(value) => handleFieldUpdate('url', value)"
      />
    </div>
    <RichTextEditor
      :content="props.project.description || ''"
      label="Project Details"
      placeholder="Enter your project details..."
      @update:content="(value) => handleFieldUpdate('description', value)"
    />
    <UButton size="lg" class="w-full justify-center" label="Done" @click="handleDone" />
  </div>
</template>
