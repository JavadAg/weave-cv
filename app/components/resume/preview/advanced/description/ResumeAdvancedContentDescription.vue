<script setup lang="ts">
import { computed } from "vue"
import { useElementHeightUpdate } from "~/composables/useElementHeightContext"
import { splitContentFragments } from "~/utils/preview/core/sectionElementGenerator"
import type { AdvancedSectionTypeSchema, TAdvancedContent } from "~/utils/schemas/content.schema"
import ContentLayout from "../content/ContentLayout.vue"

interface Props {
  content: TAdvancedContent
  sectionId: string
  contentId: string
  sectionType: (typeof AdvancedSectionTypeSchema.options)[number]
  processedContent: string[]
  tagIndex: number
  isLast: boolean
}

const { content, sectionId, contentId, sectionType, processedContent, tagIndex, isLast } = defineProps<Props>()

const { updateHeight } = useElementHeightUpdate()

const elementId = computed(() => {
  if (typeof tagIndex === "number") {
    return `${contentId}-${tagIndex}`
  }
  return contentId
})

const { elementRef } = useSelfResizeObserver((height) => {
  updateHeight(elementId.value, height)
})

const configsStore = useConfigsStore()
const { configs } = storeToRefs(configsStore)
const { general } = configs.value

const sectionConfigs = computed(() => configs.value[sectionType])

const splitedContentFragment = computed(() =>
  splitContentFragments(processedContent, general.layout.columns, sectionConfigs.value)
)

const isLastTag = computed(() =>
  typeof tagIndex === "number"
    ? splitedContentFragment.value.contentFragmentsForParagraphs.length === tagIndex + 1
    : false
)
const tag = computed(() => splitedContentFragment.value.contentFragmentsForParagraphs[tagIndex])
</script>
<template>
  <div ref="elementRef">
    <ContentLayout
      :content-id="content.id!"
      :section-id="sectionId"
      :section-type="sectionType"
      :description="tag ?? ''"
      :is-last="isLast"
      :add-entry-padding-bottom="isLastTag"
    />
  </div>
</template>
