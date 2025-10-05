<script setup lang="ts">
import type { SectionByType } from "~/types/resume.types"
import SectionWrapper from "../../SectionWrapper.vue"
import ProjectsList from "./ProjectsList.vue"

interface Props {
  section: SectionByType<"projects">
}
const props = defineProps<Props>()
</script>
<template>
  <SectionWrapper
    :id="props.section.id"
    :title="props.section.title"
    :is-section-visible="props.section.isSectionVisible"
    :is-title-visible="props.section.isTitleVisible"
  >
    <ProjectsList :id="props.section.id" :projects="props.section.data" />
  </SectionWrapper>
</template>
