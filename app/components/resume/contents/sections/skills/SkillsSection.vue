<script setup lang="ts">
import type { SectionByType } from "~/types/resume.types"
import SectionWrapper from "../../SectionWrapper.vue"
import SkillsList from "./SkillsList.vue"

interface Props {
  section: SectionByType<"skills">
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
    <SkillsList :id="props.section.id" :skills="props.section.data" />
  </SectionWrapper>
</template>
