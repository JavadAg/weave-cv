<script setup lang="ts">
import DatePicker from "~/components/ui/DatePicker.vue"
import RichTextEditor from "~/components/ui/rich-text/RichTextEditor.vue"
import TextInput from "~/components/ui/TextInput.vue"
import ToggleInput from "~/components/ui/ToggleInput.vue"
import type { SectionByType } from "~/types/resume.types"

interface Props {
  id: string
  education: SectionByType<"education">["data"][number]
}
const props = defineProps<Props>()
const emit = defineEmits(["closeEdit"])

const { updateContent } = useResumeStore()

const handleFieldUpdate = (field: keyof SectionByType<"education">["data"][number], value: unknown) => {
  updateContent(`${props.id}.data.${props.education.id}.${field}`, value)
}

const handleDone = () => {
  emit("closeEdit")
}
</script>

<template>
  <div class="flex flex-col gap-4 rounded-lg p-3 w-full bg-accented/40">
    <span class="text-lg font-semibold">Edit Education</span>
    <div class="space-y-3">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextInput
          :model-value="props.education.degree"
          label="Degree"
          placeholder="e.g. Bachelor of Science"
          @update:model-value="(value) => handleFieldUpdate('degree', value)"
        />

        <TextInput
          :model-value="props.education.school"
          label="School"
          placeholder="e.g. University of California"
          @update:model-value="(value) => handleFieldUpdate('school', value)"
        />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DatePicker
          :model-value="props.education.from"
          label="Start Date"
          placeholder="e.g. 2020-01-01"
          @update:model-value="(value) => handleFieldUpdate('from', value)"
        />
        <div class="flex flex-col gap-2">
          <DatePicker
            :model-value="props.education.to"
            label="End Date"
            :disabled="props.education.present"
            placeholder="e.g. 2022-12-31"
            @update:model-value="(value) => handleFieldUpdate('to', value)"
          />
          <ToggleInput
            :model-value="props.education.present || false"
            label="Currently studying here"
            @update:model-value="(value) => handleFieldUpdate('present', value)"
          />
        </div>
      </div>
      <TextInput
        :model-value="props.education.location"
        label="Location"
        placeholder="e.g. Berkeley, CA"
        @update:model-value="(value) => handleFieldUpdate('location', value)"
      />
      <RichTextEditor
        :content="props.education.description || ''"
        label="Description"
        placeholder="Enter your description..."
        @update:content="(htmlContent) => handleFieldUpdate('description', htmlContent)"
      />
    </div>
    <UButton size="lg" class="w-full justify-center" label="Done" @click="handleDone" />
  </div>
</template>
