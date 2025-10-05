<script setup lang="ts">
import type { z } from "zod"
import TextInput from "~/components/ui/TextInput.vue"
import type { PersonalDataSchema } from "~/utils/schemas/content.schema"
import Visibility from "../../Visibility.vue"

interface Props {
  title: z.infer<typeof PersonalDataSchema>["title"]
  subtitle: z.infer<typeof PersonalDataSchema>["subtitle"]
}

const props = defineProps<Props>()

const { updateContent } = useResumeStore()

const titleModel = computed({
  get: () => props.title.text,
  set: (v: string) => updateContent("personal.data.title.text", v)
})

const subtitleModel = computed({
  get: () => props.subtitle.text,
  set: (v: string) => updateContent("personal.data.subtitle.text", v)
})
</script>

<template>
  <div class="space-y-3">
    <div class="flex items-end gap-2">
      <TextInput v-model="titleModel" label="Title" placeholder="Enter your title" />
      <Visibility
        :is-visible="props.title.isVisible"
        :on-toggle="() => updateContent('personal.data.title.isVisible', !props.title.isVisible)"
        class="mb-0.5"
      />
    </div>
    <div class="flex items-end gap-2">
      <TextInput v-model="subtitleModel" label="Subtitle" placeholder="Enter your subtitle" />
      <Visibility
        class="mb-0.5"
        :is-visible="props.subtitle.isVisible"
        :on-toggle="() => updateContent('personal.data.subtitle.isVisible', !props.subtitle.isVisible)"
      />
    </div>
  </div>
</template>
