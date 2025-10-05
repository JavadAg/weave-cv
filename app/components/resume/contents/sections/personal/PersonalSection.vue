<script setup lang="ts">
import type { SectionByType } from "~/types/resume.types"
import SectionWrapper from "../../SectionWrapper.vue"
import PersonalDetailsEditor from "./PersonalDetailsEditor.vue"
import PersonalTitle from "./PersonalTitle.vue"

interface Props {
  section: SectionByType<"personal">
}
const props = defineProps<Props>()
</script>
<template>
  <SectionWrapper
    :id="props.section.id"
    :title="props.section.title"
    :is-title-editable="false"
    :is-section-hideable="false"
    :is-section-visible="props.section.isSectionVisible"
    :is-title-visible="props.section.isTitleVisible"
  >
    <PersonalTitle :title="props.section.data.title" :subtitle="props.section.data.subtitle" />
    <PersonalDetailsEditor />
  </SectionWrapper>
</template>
