<script setup lang="ts">
import DatePicker from "~/components/ui/DatePicker.vue"
import RichTextEditor from "~/components/ui/rich-text/RichTextEditor.vue"
import TextInput from "~/components/ui/TextInput.vue"
import ToggleInput from "~/components/ui/ToggleInput.vue"
import type { TExperienceData } from "~/utils/schemas/content.schema"

interface Props {
  id: string
  experience: TExperienceData
}
const props = defineProps<Props>()
const emit = defineEmits(["closeEdit"])

const { updateContent } = useResumeStore()

const handleFieldUpdate = (field: keyof TExperienceData, value: unknown) => {
  updateContent(`${props.id}.data.${props.experience.id}.${field}`, value)
}

const handleDone = () => {
  emit("closeEdit")
}
</script>

<template>
  <div class="flex flex-col gap-4 rounded-lg p-3 w-full bg-accented/40">
    <span class="text-lg font-semibold">Edit Experience</span>
    <div class="space-y-3">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextInput
          :model-value="props.experience.role"
          label="Role"
          placeholder="e.g. Software Engineer"
          @update:model-value="(value) => handleFieldUpdate('role', value)"
        />
        <TextInput
          :model-value="props.experience.company"
          label="Company"
          placeholder="e.g. Google"
          @update:model-value="(value) => handleFieldUpdate('company', value)"
        />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DatePicker
          :model-value="props.experience.from"
          label="Start Date"
          placeholder="e.g. 2020-01-01"
          @update:model-value="(value) => handleFieldUpdate('from', value)"
        />
        <div class="flex flex-col gap-2">
          <DatePicker
            :model-value="props.experience.to"
            label="End Date"
            :disabled="props.experience.present"
            placeholder="e.g. 2022-12-31"
            @update:model-value="(value) => handleFieldUpdate('to', value)"
          />
          <ToggleInput
            :model-value="props.experience.present || false"
            label="Currently working here"
            @update:model-value="(value) => handleFieldUpdate('present', value)"
          />
        </div>
      </div>
      <TextInput
        :model-value="props.experience.location"
        label="Location"
        placeholder="e.g. San Francisco, CA"
        @update:model-value="(value) => handleFieldUpdate('location', value)"
      />
      <TextInput
        :model-value="props.experience.url"
        label="Company URL"
        placeholder="e.g. https://company.com"
        type="url"
        @update:model-value="(value) => handleFieldUpdate('url', value)"
      />
      <RichTextEditor
        :content="props.experience.description"
        label="Achievements & Responsibilities"
        placeholder="Enter your achievements and responsibilities..."
        @update:content="(htmlContent) => handleFieldUpdate('description', htmlContent)"
      />
    </div>
    <UButton size="lg" class="w-full justify-center" label="Done" @click="handleDone" />
  </div>
</template>
