<script setup lang="ts">
import type { z } from "zod"
import type { PersonalDataSchema } from "~/utils/schemas/content.schema"
import Delete from "../../Delete.vue"
import Visibility from "../../Visibility.vue"

interface Props {
  detail: z.infer<typeof PersonalDataSchema>["details"][0]
  index: number
}

const props = defineProps<Props>()
const { content, updateContent } = useResumeStore()

const updateDetails = (
  updater: (details: z.infer<typeof PersonalDataSchema>["details"]) => z.infer<typeof PersonalDataSchema>["details"]
) => {
  const currentDetails = content.personal?.type === "personal" ? content.personal.data?.details || [] : []

  const updatedDetails = updater([...currentDetails])
  updateContent("personal.data.details", updatedDetails)
}

const handleValueUpdate = (value: string) => {
  updateDetails((details) => {
    const detail = details[props.index]
    if (detail) {
      detail.value = value
    }
    return details
  })
}

const handleUrlUpdate = (url: string) => {
  updateDetails((details) => {
    const detail = details[props.index]
    if (detail) {
      detail.url = url || undefined
    }
    return details
  })
}

const handleToggleVisibility = () => {
  updateDetails((details) => {
    const detail = details[props.index]
    if (detail) {
      detail.isVisible = !detail.isVisible
    }
    return details
  })
}

const handleRemove = () => {
  updateDetails((details) => details.filter((_, i) => i !== props.index))
}
</script>

<template>
  <div class="space-y-2 p-2 border border-muted/40 rounded-md">
    <div class="flex items-center gap-2">
      <UInput
        :leading-icon="detail.icon ? `i-lucide-${detail.icon}` : undefined"
        :model-value="detail.value"
        :ui="{ leadingIcon: 'size-4' }"
        class="flex-1"
        placeholder="Value"
        @update:model-value="handleValueUpdate"
      />
      <Visibility :is-visible="detail.isVisible" @toggle="handleToggleVisibility" />
      <Delete :on-delete="handleRemove" />
    </div>
    <UInput
      :model-value="detail.url || ''"
      placeholder="URL (optional)"
      class="w-full"
      @update:model-value="handleUrlUpdate"
    />
  </div>
</template>
