<script setup lang="ts">
import { computed, type CSSProperties } from "vue"
import { ColumnColorsKey } from "~/components/resume/preview/pages/columnColorsContext"
import { getTextAlign } from "~/utils/preview/core/entryUtils"
import { fmtDate } from "~/utils/preview/html/shared"

interface Props {
  position: string
  startDate?: string
  endDate?: string
  present?: boolean
}

const props = defineProps<Props>()

const configsStore = useConfigsStore()
const { configs } = storeToRefs(configsStore)

const layout = computed(() => configs.value.general.layout)
const colors = computed(() => configs.value.general.colors)

const columnColors = inject(ColumnColorsKey)

const color = computed(() =>
  colors.value.apply.includes("dates") ? columnColors?.value.accentColor : columnColors?.value.textColor
)

const startDateFormatted = computed(() => fmtDate(props.startDate, layout.value.dateFormat))
const endDateFormatted = computed(() => fmtDate(props.endDate, layout.value.dateFormat))
const endDateDisplay = computed(() => (props.present ? "Present" : endDateFormatted.value))

const dateStyles = computed<CSSProperties>(() => ({
  color: color.value,
  textAlign: getTextAlign(props.position)
}))
</script>

<template>
  <span :style="dateStyles"> {{ startDateFormatted }} {{ endDateDisplay ? `- ${endDateDisplay}` : "" }} </span>
</template>
