<script setup lang="ts">
import DatePicker from "~/components/ui/DatePicker.vue"
import RichTextEditor from "~/components/ui/rich-text/RichTextEditor.vue"
import TextInput from "~/components/ui/TextInput.vue"
import ToggleInput from "~/components/ui/ToggleInput.vue"
import { SECTION_FIELDS_CONFIG, type EditorField } from "~/constants/sectionFields"
import type { TAdvancedContent, TBasicContent, TCoreSectionType } from "~/utils/schemas/content.schema"

interface Props {
  sectionId: string
  isAdvancedSection: boolean
  sectionType: TCoreSectionType
  content: TAdvancedContent | TBasicContent
}
const props = defineProps<Props>()
const emit = defineEmits(["closeEdit"])

const { updateContent } = useResumeStore()

const sectionFieldsConfig = computed(() => SECTION_FIELDS_CONFIG[props.sectionType])

const getFieldConfig = (field: EditorField) => {
  return sectionFieldsConfig.value.find((config) => config.field === field)
}

const hasField = (field: EditorField) => {
  return sectionFieldsConfig.value.some((config) => config.field === field)
}

const handleFieldUpdate = (field: EditorField, value: unknown) => {
  updateContent(`${props.sectionId}.contents.${props.content.id}.${field}`, value)
}

const getStringFieldValue = (
  field: "title" | "subtitle" | "description" | "url" | "location" | "startDate" | "endDate"
): string => {
  const content = props.content
  if (field === "title" && "title" in content) {
    return content.title
  }
  if (field === "subtitle" && "subtitle" in content) {
    return content.subtitle
  }
  if (field === "description" && "description" in content) {
    return content.description
  }
  if (field === "url" && "url" in content) {
    return content.url ?? ""
  }
  if (field === "startDate" && "startDate" in content) {
    return content.startDate ?? ""
  }
  if (field === "endDate" && "endDate" in content) {
    return content.endDate ?? ""
  }
  if (field === "location" && "location" in content) {
    return content.location ?? ""
  }
  return ""
}

const getBooleanFieldValue = (field: "present"): boolean => {
  const content = props.content
  if (field === "present" && "present" in content) {
    return content.present ?? false
  }
  return false
}

const handleDone = () => {
  emit("closeEdit")
}
</script>

<template>
  <div class="flex flex-col gap-4 rounded-lg p-3 w-full bg-accented/40">
    <span class="text-lg font-semibold">Edit Item</span>
    <div class="space-y-3">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextInput
          v-if="hasField('title')"
          :model-value="getStringFieldValue('title')"
          :label="getFieldConfig('title')?.label || 'Title'"
          :placeholder="getFieldConfig('title')?.placeholder || 'e.g. Title'"
          @update:model-value="(value) => handleFieldUpdate('title', value)"
        />
        <TextInput
          v-if="hasField('subtitle')"
          :model-value="getStringFieldValue('subtitle')"
          :label="getFieldConfig('subtitle')?.label || 'Subtitle'"
          :placeholder="getFieldConfig('subtitle')?.placeholder || 'e.g. Subtitle'"
          @update:model-value="(value) => handleFieldUpdate('subtitle', value)"
        />
      </div>

      <div v-if="hasField('startDate') || hasField('endDate')" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DatePicker
          v-if="hasField('startDate')"
          :model-value="getStringFieldValue('startDate')"
          :label="getFieldConfig('startDate')?.label || 'Start Date'"
          :placeholder="getFieldConfig('startDate')?.placeholder || 'e.g. 2020-01-01'"
          @update:model-value="(value) => handleFieldUpdate('startDate', value)"
        />
        <div class="flex flex-col gap-2">
          <DatePicker
            v-if="hasField('endDate')"
            :model-value="getStringFieldValue('endDate')"
            :label="getFieldConfig('endDate')?.label || 'End Date'"
            :disabled="getBooleanFieldValue('present')"
            :placeholder="getFieldConfig('endDate')?.placeholder || 'e.g. 2022-12-31'"
            @update:model-value="(value) => handleFieldUpdate('endDate', value)"
          />
          <ToggleInput
            v-if="hasField('present')"
            :model-value="getBooleanFieldValue('present')"
            :label="getFieldConfig('present')?.label || 'Currently active'"
            @update:model-value="(value) => handleFieldUpdate('present', value)"
          />
        </div>
      </div>

      <TextInput
        v-if="hasField('location')"
        :model-value="getStringFieldValue('location')"
        :label="getFieldConfig('location')?.label || 'Location'"
        :placeholder="getFieldConfig('location')?.placeholder || 'e.g. San Francisco, CA'"
        @update:model-value="(value) => handleFieldUpdate('location', value)"
      />
      <TextInput
        v-if="hasField('url')"
        :model-value="getStringFieldValue('url')"
        :label="getFieldConfig('url')?.label || 'URL'"
        :placeholder="getFieldConfig('url')?.placeholder || 'e.g. https://example.com'"
        type="url"
        @update:model-value="(value) => handleFieldUpdate('url', value)"
      />
      <RichTextEditor
        v-if="hasField('description')"
        :content="getStringFieldValue('description')"
        :label="getFieldConfig('description')?.label || 'Description'"
        :placeholder="getFieldConfig('description')?.placeholder || 'Enter details...'"
        @update:content="(htmlContent) => handleFieldUpdate('description', htmlContent)"
      />
    </div>
    <UButton size="lg" class="w-full justify-center" label="Done" @click="handleDone" />
  </div>
</template>
