<script setup lang="ts">
import { computed } from "vue"
import type { TCoreSection } from "~/utils/schemas/content.schema"
import AddSectionButton from "./AddSectionButton.vue"
import SectionForm from "./advanced-section-form/SectionForm.vue"
import PersonalSectionForm from "./personal/PersonalSectionForm.vue"

const resumeStore = useResumeStore()
const configsStore = useConfigsStore()
const { core, personal } = storeToRefs(resumeStore)
const { configs } = configsStore

const isTwoColumnLayout = computed(() => {
  return configs.general.layout.columns === "2"
})

// Get ordered sections based on config
const orderedSections = computed(() => {
  const visibleSections = Object.entries(core.value).filter(([_, section]) => section.isSectionVisible)

  if (isTwoColumnLayout.value) {
    const leftOrder = configs.general.layout.order.twoCol.left || []
    const rightOrder = configs.general.layout.order.twoCol.right || []
    const allOrderedTypes = [...leftOrder, ...rightOrder]

    // Order sections based on config, then add any that aren't in the config
    const ordered: Array<[string, TCoreSection]> = []
    const processedKeys = new Set<string>()

    // Add sections in order from config
    for (const sectionType of allOrderedTypes) {
      const sectionsOfType = visibleSections.filter(([_, section]) => section.type === sectionType)
      for (const sectionEntry of sectionsOfType) {
        if (!processedKeys.has(sectionEntry[0])) {
          ordered.push(sectionEntry)
          processedKeys.add(sectionEntry[0])
        }
      }
    }

    // Add any remaining sections that weren't in the config
    for (const sectionEntry of visibleSections) {
      if (!processedKeys.has(sectionEntry[0])) {
        ordered.push(sectionEntry)
      }
    }

    return ordered
  } else {
    const sectionOrder = configs.general.layout.order.oneCol || []

    if (sectionOrder.length === 0) {
      return visibleSections
    }

    const ordered: Array<[string, TCoreSection]> = []
    const processedKeys = new Set<string>()

    // Add sections in order from config
    for (const sectionType of sectionOrder) {
      const sectionsOfType = visibleSections.filter(([_, section]) => section.type === sectionType)
      for (const sectionEntry of sectionsOfType) {
        if (!processedKeys.has(sectionEntry[0])) {
          ordered.push(sectionEntry)
          processedKeys.add(sectionEntry[0])
        }
      }
    }

    // Add any remaining sections that weren't in the config
    for (const sectionEntry of visibleSections) {
      if (!processedKeys.has(sectionEntry[0])) {
        ordered.push(sectionEntry)
      }
    }

    return ordered
  }
})

const renderSection = (sectionId: string, section: TCoreSection) =>
  h(SectionForm, { sectionId, sectionType: section.type, section })
</script>

<template>
  <div
    class="flex flex-col gap-3 h-full hide-scrollbar bg-default overflow-y-auto rounded-xl border border-default/30 p-4"
  >
    <PersonalSectionForm :section="personal" />
    <component :is="() => renderSection(key, section)" v-for="[key, section] in orderedSections" :key="key" />
    <AddSectionButton />
  </div>
</template>
