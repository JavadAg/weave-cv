<script setup lang="ts">
import { determineDisplayMode, isContentEmpty } from "~/utils/preview/core/entryUtils"
import type { AdvancedSectionTypeSchema, TAdvancedContent } from "~/utils/schemas/content.schema"
import type { TAdvancedSectionVariant } from "~/utils/schemas/shared.schema"
import ColumnsContent from "./variants/ColumnsContent.vue"
import ContentFirstContent from "./variants/ContentFirstContent.vue"
import DateFirstContent from "./variants/DateFirstContent.vue"
import StackedContent from "./variants/StackedContent.vue"

interface Props {
  contentId: string
  sectionId: string
  sectionType: (typeof AdvancedSectionTypeSchema.options)[number]
  title?: string
  subtitle?: string
  url?: string
  description?: string
  addEntryPaddingBottom?: boolean
  startDate?: string
  endDate?: string
  location?: string
}

const props = defineProps<Props>()

const configsStore = useConfigsStore()
const { configs } = storeToRefs(configsStore)
const resumeStore = useResumeStore()
const { core } = storeToRefs(resumeStore)

const sectionConfigs = computed(() => configs.value[props.sectionType])

const typography = computed(() => configs.value.general.typography)
const layout = computed(() => configs.value.general.layout)

const sectionContents = computed(() => core.value[props.sectionId]?.contents as TAdvancedContent[])

const displayMode = computed<TAdvancedSectionVariant | "columns">(() =>
  determineDisplayMode({
    columns: layout.value.columns,
    displayMode: sectionConfigs.value.variant
  })
)

const contentStyle = computed(() => ({
  width: "100%",
  display: "flex",
  flexDirection: displayMode.value === "columns" || displayMode.value === "stacked" ? ("column" as const) : undefined,
  paddingBottom: props.addEntryPaddingBottom
    ? `${0.6 * typography.value.lineHeight * layout.value.sectionGap}px`
    : undefined
}))

const contentProps = computed(() => ({
  position: displayMode.value,
  title: props.title,
  url: props.url,
  subtitle: props.subtitle,
  description: props.description,
  startDate: props.startDate,
  endDate: props.endDate,
  location: props.location,
  sectionType: props.sectionType
}))

const content = computed(() => {
  return sectionContents.value.find((content) => content.id === props.contentId)
})
</script>

<template>
  <div
    v-if="content && !isContentEmpty(content)"
    :style="{
      wordBreak: 'break-word'
    }"
  >
    <div :style="contentStyle">
      <ContentFirstContent v-if="displayMode === 'contentFirst'" v-bind="contentProps" />
      <DateFirstContent v-if="displayMode === 'dateFirst'" v-bind="contentProps" />
      <StackedContent v-if="displayMode === 'stacked'" v-bind="contentProps" />
      <ColumnsContent v-if="displayMode === 'columns'" v-bind="contentProps" />
    </div>
  </div>
</template>
