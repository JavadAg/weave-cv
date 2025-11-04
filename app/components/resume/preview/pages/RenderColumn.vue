<script setup lang="ts">
import { computed, provide } from "vue"
import { getColumnColors } from "~/utils/preview/core/colorUtils"
import { calculateHeaderMargin } from "~/utils/preview/helpers"
import { ColumnColorsKey, type ColumnColorsContext } from "./columnColorsContext"

interface Props {
  side: string
}

const props = defineProps<Props>()

const configsStore = useConfigsStore()
const { configs } = storeToRefs(configsStore)

const layout = computed(() => configs.value.general.layout)
const colors = computed(() => configs.value.general.colors)

const { left, right } = getColumnColors(colors.value, layout.value.personalPosition)
const columnColors = computed<ColumnColorsContext>(() => (props.side === "left" ? left : right))

const hasUniformBackground = computed(() => left.bgColor === right.bgColor || layout.value.personalPosition === "top")

const isSideDetails = computed(
  () => layout.value.personalPosition === "left" || layout.value.personalPosition === "right"
)

const columnWidth = computed(() => {
  const { left, right } = layout.value.columnsWidth ?? { left: 50, right: 50 }
  return props.side === "left" ? left : right
})

const verticalPadding = computed(() =>
  isSideDetails.value ? calculateHeaderMargin(configs.value.general.layout.verticalMargin) : 0
)
const horizontalPadding = computed(() => (isSideDetails.value ? configs.value.general.layout.horizontalMargin : 0))
const sidePadding = computed(() =>
  hasUniformBackground.value ? "1em" : `${0.8 * configs.value.general.layout.horizontalMargin}mm`
)

const columnStyles = computed(() => ({
  background: columnColors.value.bgColor,
  width: `${columnWidth.value}%`,
  maxWidth: `${columnWidth.value}%`,
  color: columnColors.value.textColor,
  paddingTop: `${verticalPadding.value}mm`,
  paddingBottom: `${verticalPadding.value}mm`,
  paddingLeft: props.side === "left" ? `${horizontalPadding.value}mm` : sidePadding.value,
  paddingRight: props.side === "right" ? `${horizontalPadding.value}mm` : sidePadding.value
}))

provide(ColumnColorsKey, columnColors)
</script>
<template>
  <div :style="columnStyles">
    <slot />
  </div>
</template>
