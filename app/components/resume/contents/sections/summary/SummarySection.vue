<script setup lang="ts">
import ContentEditor from "~/components/resume/contents/ContentEditor.vue"
import SectionWrapper from "~/components/resume/contents/SectionWrapper.vue"
import type { SectionByType } from "~/types/resume.types"
import { sanitizeRichHtml } from "~/utils/preview/helpers"

interface Props {
  section: SectionByType<"summary">
}
const props = defineProps<Props>()

const { updateContent } = useResumeStore()

const handleUpdate = (value: string) => {
  updateContent("summary.data.text", sanitizeRichHtml(value))
}
</script>
<template>
  <SectionWrapper
    :id="props.section.id"
    :title="props.section.title"
    :is-section-visible="props.section.isSectionVisible"
    :is-title-visible="props.section.isTitleVisible"
  >
    <ContentEditor :content="props.section.data.text" @update:content="handleUpdate" />
  </SectionWrapper>
</template>
