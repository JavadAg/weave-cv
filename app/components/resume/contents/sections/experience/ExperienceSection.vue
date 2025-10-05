<script setup lang="ts">
import type { SectionByType } from "~/types/resume.types"
import SectionWrapper from "../../SectionWrapper.vue"
import ExperienceList from "./ExperienceList.vue"

interface Props {
  section: SectionByType<"experience">
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
    <ExperienceList :id="props.section.id" :experiences="props.section.data" />
  </SectionWrapper>
</template>
