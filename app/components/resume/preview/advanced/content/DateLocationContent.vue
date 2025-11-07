<script setup lang="ts">
import { computed, type CSSProperties } from "vue"
import type { TAdvancedSectionVariant } from "~/utils/schemas/shared.schema"
import ContentDate from "./date-location/ContentDate.vue"
import ContentLocation from "./date-location/ContentLocation.vue"

interface Props {
  position: TAdvancedSectionVariant | "columns"
  startDate?: string
  endDate?: string
  location?: string
  present?: boolean
}

const props = defineProps<Props>()

const configsStore = useConfigsStore()
const { configs } = storeToRefs(configsStore)

const layout = computed(() => configs.value.general.layout)
const typography = computed(() => configs.value.general.typography)
const titleFontSize = computed(() => typography.value.fontSize * layout.value.contentLayout.title.fontSizeMultiplier)

const containerStyles = computed<CSSProperties>(() => ({
  paddingBottom: `${0.4 * titleFontSize.value}px`,
  display: "flex",
  flexDirection: "column",
  ...(props.position === "contentFirst" ? { alignItems: "flex-end" } : {}),
  ...(props.position === "stacked" ? { justifyContent: "flex-end" } : {})
}))
</script>

<template>
  <div ref="containerRef" :style="containerStyles">
    <ContentDate :position="position" :start-date="startDate" :end-date="endDate" :present="present" />
    <ContentLocation :position="position" :location="location" />
  </div>
</template>
