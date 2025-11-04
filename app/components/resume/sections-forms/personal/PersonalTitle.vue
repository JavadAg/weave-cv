<script setup lang="ts">
import TextInput from "~/components/ui/TextInput.vue"
import type { TPersonalContent } from "~/utils/schemas/content.schema"

interface Props {
  title: TPersonalContent["title"]
  subtitle: TPersonalContent["subtitle"]
}

const props = defineProps<Props>()

const { updateContent } = useResumeStore()

const titleModel = computed({
  get: () => props.title,
  set: (v: string) => updateContent("personal.title", v)
})

const subtitleModel = computed({
  get: () => props.subtitle,
  set: (v: string) => updateContent("personal.subtitle", v)
})
</script>

<template>
  <div class="space-y-3">
    <div class="flex items-end gap-2">
      <TextInput v-model="titleModel" label="Title" placeholder="Enter your title" />
    </div>
    <div class="flex items-end gap-2">
      <TextInput v-model="subtitleModel" label="Subtitle" placeholder="Enter your subtitle" />
    </div>
  </div>
</template>
