<script setup lang="ts">
import { computed, type CSSProperties } from "vue"
import { getTextAlign } from "~/utils/preview/core/entryUtils"
import { fmtDate } from "~/utils/preview/html/shared"
import { ColumnColorsKey } from "../../../pages/columnColorsContext"

interface Props {
  position: string
  startDate?: string
  endDate?: string
}

const props = defineProps<Props>()

const configsStore = useConfigsStore()
const { configs } = storeToRefs(configsStore)
const { layout, colors } = configs.value.general

const columnColors = inject(ColumnColorsKey)

const color = computed(() =>
  colors.apply.includes("dates") ? columnColors?.value.accentColor : columnColors?.value.textColor
)

const startDateFormatted = fmtDate(props.startDate, layout.dateFormat)
const endDateFormatted = fmtDate(props.endDate, layout.dateFormat)

const dateStyles = computed<CSSProperties>(() => ({
  color: color.value,
  textAlign: getTextAlign(props.position)
}))
</script>

<template>
  <span :style="dateStyles"> {{ startDateFormatted }} {{ endDateFormatted ? `- ${endDateFormatted}` : "" }} </span>
</template>
