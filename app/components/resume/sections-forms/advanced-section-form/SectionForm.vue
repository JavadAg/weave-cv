<script setup lang="ts">
import { DUMMY_ADVANCED_SECTION_ITEM, DUMMY_BASIC_SECTION_ITEM } from "~/constants/dummyData"
import type {
  BasicSectionTypeSchema,
  TAdvancedContent,
  TBasicContent,
  TCoreSection,
  TCoreSectionType
} from "~/utils/schemas/content.schema"
import { AdvancedSectionTypeSchema } from "~/utils/schemas/content.schema"
import SectionFormWrapper from "../SectionFormWrapper.vue"
import SectionFormItem from "./SectionFormItem.vue"

interface Props {
  sectionId: string
  sectionType: TCoreSectionType
  section: TCoreSection
}
const props = defineProps<Props>()

const { updateContent } = useResumeStore()

const isAdvancedSection = computed(() => AdvancedSectionTypeSchema.safeParse(props.sectionType).success)
const isSummarySection = computed(() => props.sectionType === "summary")

const handleAddContent = () => {
  const newContent: TAdvancedContent | TBasicContent = {
    id: `${props.section.type}-${Date.now()}`,
    ...(isAdvancedSection.value
      ? DUMMY_ADVANCED_SECTION_ITEM[props.section.type as (typeof AdvancedSectionTypeSchema.options)[number]]
      : DUMMY_BASIC_SECTION_ITEM[props.section.type as (typeof BasicSectionTypeSchema.options)[number]])
  }

  updateContent(`${props.sectionId}.contents`, [...props.section.contents, newContent])
}

const handleDeleteContent = (id: string) => {
  updateContent(
    `${props.sectionId}.contents`,
    props.section.contents.filter((content) => content.id !== id)
  )
}
</script>
<template>
  <SectionFormWrapper
    :section-id="props.sectionId"
    :title="props.section.title"
    :section-type="props.sectionType"
    :is-section-visible="props.section.isSectionVisible"
    :is-title-visible="props.section.isTitleVisible"
  >
    <div class="flex flex-col gap-3">
      <div class="flex flex-col gap-2">
        <SectionFormItem
          v-for="content in props.section.contents"
          :key="content.id"
          :section-id="props.sectionId"
          :section-type="props.sectionType"
          :is-advanced-section="isAdvancedSection"
          :content="content"
          class="relative group"
          @delete="handleDeleteContent(content.id)"
        />
      </div>
      <UButton
        v-if="!isSummarySection"
        variant="subtle"
        class="flex justify-center items-center"
        @click="handleAddContent"
      >
        + Add Content
      </UButton>
    </div>
  </SectionFormWrapper>
</template>
