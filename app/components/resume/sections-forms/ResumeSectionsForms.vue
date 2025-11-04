<script setup lang="ts">
import type { TCoreSection } from "~/utils/schemas/content.schema"
import SectionForm from "./advanced-section-form/SectionForm.vue"
import PersonalSectionForm from "./personal/PersonalSectionForm.vue"

const resumeStore = useResumeStore()
const { core, personal } = storeToRefs(resumeStore)

const renderSection = (sectionId: string, section: TCoreSection) =>
  h(SectionForm, { sectionId, sectionType: section.type, section })
</script>

<template>
  <div
    v-if="Object.keys(core).length > 0"
    class="flex flex-col gap-3 h-full hide-scrollbar bg-default overflow-y-auto rounded-xl border border-default/30 p-4"
  >
    <PersonalSectionForm :section="personal" />
    <component :is="() => renderSection(key, section)" v-for="[key, section] in Object.entries(core)" :key="key" />
  </div>
</template>
