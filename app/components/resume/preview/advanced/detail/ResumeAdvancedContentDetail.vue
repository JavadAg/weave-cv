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
  isLast: boolean
}

const { content, sectionId, contentId, sectionType, processedContent, isLast } = defineProps<Props>()

const { updateHeight } = useElementHeightUpdate()

const { elementRef } = useSelfResizeObserver((height) => {
  updateHeight(contentId, height)
})

const configsStore = useConfigsStore()
const { configs } = storeToRefs(configsStore)

const sectionConfigs = computed(() => configs.value[sectionType])

const hasContentFragments = computed(() => processedContent.length > 0)

const splitedContentFragment = computed(() =>
  splitContentFragments(processedContent, configs.value.general.layout.columns, sectionConfigs.value)
)

const noParagraphTags = computed(() => splitedContentFragment.value.contentFragmentsForParagraphs.length === 0)

const titleSubTitle = computed(() => {
  if (sectionConfigs.value.subTitleFirst) {
    return [content.subtitle, content.title]
  }
  return [content.title, content.subtitle]
})
</script>
<template>
  <div ref="elementRef">
    <ContentLayout
      :content-id="content.id!"
      :section-id="sectionId"
      :section-type="sectionType"
      :title="titleSubTitle[0]!"
      :subtitle="titleSubTitle[1]!"
      :url="content.url"
      :description="splitedContentFragment.contentFragmentsForEntry.join('')"
      :is-last="isLast"
      :add-entry-padding-bottom="!hasContentFragments || noParagraphTags"
      :start-date="content?.startDate"
      :end-date="content?.endDate"
      :location="content?.location"
    />
  </div>
</template>
