<script setup lang="ts">
import type { SectionByType } from "~/types/resume.types"
import SectionWrapper from "../../SectionWrapper.vue"
import EducationList from "./EducationList.vue"

interface Props {
  section: SectionByType<"education">
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
    <EducationList :id="props.section.id" :educations="props.section.data" />
  </SectionWrapper>
</template>
