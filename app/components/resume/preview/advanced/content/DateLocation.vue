<script setup lang="ts">
import { computed, type CSSProperties } from "vue"
import type { TAdvancedSectionVariant } from "~/utils/schemas/shared.schema"
import AdvancedDate from "./date-location/AdvancedDate.vue"
import AdvancedLocation from "./date-location/AdvancedLocation.vue"

interface Props {
  width?: number
  position: TAdvancedSectionVariant | "columns"
  startDate?: string | null
  endDate?: string | null
  location?: string
  present?: boolean
  showDateDay?: boolean
}

const props = defineProps<Props>()

const configsStore = useConfigsStore()
const { configs } = storeToRefs(configsStore)

const layout = computed(() => configs.value.general.layout)
const typography = computed(() => configs.value.general.typography)
const titleFontSize = computed(() => typography.value.fontSize * layout.value.contentLayout.title.fontSizeMultiplier)

const containerStyles = computed<CSSProperties>(() => ({
  width: `${props.width}%`,
  paddingBottom: `${0.4 * typography.value.lineHeight * layout.value.sectionGap}px`,
  display: "flex",
  flexWrap: "wrap",
  rowGap: `${0.15 * titleFontSize.value}px`,
  columnGap: `${0.4 * titleFontSize.value}px`,
  ...(props.position === "contentFirst" ? { justifyContent: "flex-end" } : {}),
  ...(props.position === "stacked" ? { alignItems: "flex-end" } : {})
}))
</script>

<template>
  <div ref="containerRef" :style="containerStyles">
    <AdvancedDate
      :position="position"
      :start-date="startDate"
      :end-date="endDate"
      :present="present"
      :show-date-day="showDateDay"
    />
    <AdvancedLocation :position="position" :location="location" />
  </div>
</template>
