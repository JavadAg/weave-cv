<script setup lang="ts">
import type { SectionByType } from "~/types/resume.types"
import SectionWrapper from "../../SectionWrapper.vue"
import LanguagesList from "./LanguagesList.vue"

interface Props {
  section: SectionByType<"languages">
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
    <LanguagesList :id="props.section.id" :languages="props.section.data" />
  </SectionWrapper>
</template>
