<script setup lang="ts">
import { computed } from "vue"
import { determineDisplayMode, isContentEmpty } from "~/utils/preview/core/entryUtils"
import type { AdvancedSectionTypeSchema, TAdvancedContent } from "~/utils/schemas/content.schema"
import type { TAdvancedSectionVariant } from "~/utils/schemas/shared.schema"
import DateLocation from "./content/DateLocation.vue"
import TitleSubtitle from "./content/TitleSubtitle.vue"

interface Props {
  sid: string
  contentId: string
  sectionType: (typeof AdvancedSectionTypeSchema.options)[number]
}

const props = defineProps<Props>()

const resumeStore = useResumeStore()
const { core } = storeToRefs(resumeStore)
const configsStore = useConfigsStore()
const { configs } = storeToRefs(configsStore)

const content = computed(
  () => core.value?.[props.sid]?.contents.find((content) => content.id === props.contentId) as TAdvancedContent
)

const { updateHeight } = usePreviewStore()

const { elementRef } = useSelfResizeObserver((height) => {
  updateHeight(props.contentId, height)
})

const sectionConfigs = computed(() => configs.value[props.sectionType])

const titleSubTitle = computed(() => {
  if (sectionConfigs.value.subTitleFirst) {
    return [content.value.subtitle, content.value.title]
  }
  return [content.value.title, content.value.subtitle]
})

const layout = computed(() => configs.value.general.layout)

const displayMode = computed<TAdvancedSectionVariant | "columns">(() =>
  determineDisplayMode({
    columns: layout.value.columns,
    displayMode: sectionConfigs.value.variant
  })
)

const contentStyle = computed(() => ({
  width: "100%",
  display: "flex",
  flexDirection: displayMode.value === "columns" || displayMode.value === "stacked" ? ("column" as const) : undefined
}))

const contentLayoutWidth = computed(() =>
  displayMode.value === "contentFirst"
    ? layout.value.contentLayout.contentFirstWidth
    : layout.value.contentLayout.dateFirstWidth
)
const hasDateOrLocation = computed(() => content.value.startDate || content.value.endDate || content.value.location)

const dateLocationStyles = computed(() => ({
  display: hasDateOrLocation.value ? "block" : "none",
  paddingTop: `${0.1 * configs.value.general.typography.lineHeight}em`,
  paddingBottom: `${0.1 * configs.value.general.typography.lineHeight}em`
}))
</script>
<template>
  <div
    v-if="content && !isContentEmpty(content)"
    ref="elementRef"
    :style="{
      wordBreak: 'break-word'
    }"
  >
    <div :style="contentStyle">
      <template v-if="displayMode === 'contentFirst'">
        <div :style="{ width: `${contentLayoutWidth.left}%` }">
          <TitleSubtitle
            :title="titleSubTitle[0]"
            :subtitle="titleSubTitle[1]"
            :url="content.url"
            :is-in-column="false"
            :section-type="sectionType"
          />
        </div>
        <div :style="{ width: `${contentLayoutWidth.right}%` }">
          <DateLocation
            :position="displayMode"
            :start-date="content.startDate"
            :end-date="content.endDate"
            :location="content.location"
            :present="content.present"
          />
        </div>
      </template>
      <template v-if="displayMode === 'dateFirst'">
        <div :style="{ width: `${contentLayoutWidth.left}%` }">
          <DateLocation
            :position="displayMode"
            :start-date="content.startDate"
            :end-date="content.endDate"
            :location="content.location"
            :present="content.present"
          />
        </div>
        <div :style="{ width: `${contentLayoutWidth.right}%` }">
          <TitleSubtitle
            :title="titleSubTitle[0]"
            :subtitle="titleSubTitle[1]"
            :url="content.url"
            :is-in-column="false"
            :section-type="sectionType"
          />
        </div>
      </template>
      <template v-if="displayMode === 'stacked'">
        <div :style="{ display: 'flex', justifyContent: 'space-between' }">
          <TitleSubtitle
            :title="titleSubTitle[0]"
            :subtitle="titleSubTitle[1]"
            :url="content.url"
            :is-in-column="false"
            :section-type="sectionType"
          />
          <div :style="{ display: 'flex', justifyContent: 'flex-end', alignItems: 'start' }">
            <DateLocation
              :position="displayMode"
              :start-date="content.startDate"
              :end-date="content.endDate"
              :location="content.location"
              :present="content.present"
            />
          </div>
        </div>
      </template>
      <template v-if="displayMode === 'columns'">
        <TitleSubtitle
          :title="titleSubTitle[0]"
          :subtitle="titleSubTitle[1]"
          :url="content.url"
          :is-in-column="true"
          :section-type="sectionType"
        />
        <div v-if="content.startDate || content.endDate || content.location" :style="dateLocationStyles">
          <DateLocation
            :position="displayMode"
            :start-date="content.startDate"
            :end-date="content.endDate"
            :location="content.location"
            :present="content.present"
          />
        </div>
      </template>
    </div>
  </div>
</template>
