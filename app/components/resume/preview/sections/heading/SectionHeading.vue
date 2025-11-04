<script setup lang="ts">
import type { CSSProperties } from "vue"
import { useElementHeightUpdate } from "~/composables/useElementHeightContext"
import { ColumnColorsKey } from "../../pages/columnColorsContext"
import HeadingBorder from "./HeadingBorder.vue"
import HeadingPill from "./HeadingPill.vue"
import HeadingPlain from "./HeadingPlain.vue"
import HeadingUnderline from "./HeadingUnderline.vue"
import HeadingUnderlineFull from "./HeadingUnderlineFull.vue"
import HeadingVerticalBorder from "./HeadingVerticalBorder.vue"

const props = defineProps<{
  sectionId: string
  elementId: string
}>()

const { updateHeight } = useElementHeightUpdate()

const { elementRef } = useSelfResizeObserver((height) => {
  updateHeight(props.elementId, height)
})

const resumeStore = useResumeStore()
const { configs } = useConfigsStore()
const { core } = storeToRefs(resumeStore)

const section = computed(() => {
  return core.value[props.sectionId]
})

const headingConfigs = computed(() => configs.general.headings)
const colorsConfigs = computed(() => configs.general.colors)
const layoutConfigs = computed(() => configs.general.layout)
const typographyConfigs = computed(() => configs.general.typography)

const columnColors = inject(ColumnColorsKey)

const headingColor = computed(() => {
  const applyAccentColor = colorsConfigs.value.apply.includes("headings")
  if (!columnColors) return colorsConfigs.value.secondary.textColor
  return applyAccentColor ? columnColors?.value.accentColor : columnColors?.value.textColor
})

const containerStyle = computed<CSSProperties>(() => ({
  display: "flex",
  alignItems: "center",
  fontWeight: headingConfigs.value.fontWeight,
  textTransform: headingConfigs.value.fontCase,
  fontSize: `${typographyConfigs.value.fontSize * headingConfigs.value.fontSizeMultiplier}pt`,
  color: headingColor.value,
  paddingBottom: `${0.6 * typographyConfigs.value.lineHeight * layoutConfigs.value.sectionGap}px`
}))

const headingVariant = computed(() => headingConfigs.value.variant)

const heading = computed(() => {
  return {
    plain: HeadingPlain,
    underline: HeadingUnderline,
    "underline-full": HeadingUnderlineFull,
    pill: HeadingPill,
    border: HeadingBorder,
    "vertical-border": HeadingVerticalBorder
  }[headingVariant.value]
})
</script>
<template>
  <div v-if="section?.isTitleVisible && section" ref="elementRef" :style="containerStyle">
    <component :is="heading" :section="section" :heading-color="headingColor" />
  </div>
</template>
