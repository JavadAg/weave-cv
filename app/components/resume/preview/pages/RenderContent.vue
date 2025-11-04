<script setup lang="ts">
import type { CSSProperties } from "vue"
import { calculateHeaderMargin } from "~/utils/preview/helpers"
import { ColumnColorsKey } from "./columnColorsContext"

interface Props {
  isFirstPage: boolean
}

const props = defineProps<Props>()

const configsStore = useConfigsStore()
const { configs } = storeToRefs(configsStore)

const layout = computed(() => configs.value.general.layout)
const colors = computed(() => configs.value.general.colors)

const isTopDetails = computed(() => layout.value.personalPosition === "top")
const isSideDetails = computed(
  () => layout.value.personalPosition === "left" || layout.value.personalPosition === "right"
)

const verticalMargin = computed(() => calculateHeaderMargin(layout.value.verticalMargin))
const horizontalMargin = computed(() => layout.value.horizontalMargin)

const paddingTop = computed(() =>
  isSideDetails.value || (isTopDetails.value && props.isFirstPage) ? 0 : verticalMargin.value
)
const paddingHorizontal = computed(() => (isSideDetails.value ? 0 : horizontalMargin.value))

provide(
  ColumnColorsKey,
  computed(() => colors.value.secondary)
)

const contentStyles = computed<CSSProperties>(() => {
  const { bgColor, textColor } = colors.value.secondary

  return {
    display: "flex",
    flexDirection: "column",
    flexGrow: "1",
    paddingTop: `${paddingTop.value}mm`,
    paddingBottom: `${layout.value.verticalMargin}mm`,
    paddingLeft: `${paddingHorizontal.value}mm`,
    paddingRight: `${paddingHorizontal.value}mm`,
    backgroundColor: bgColor,
    color: textColor
  }
})
</script>

<template>
  <div :style="contentStyles">
    <slot />
  </div>
</template>
