<script setup lang="ts">
import type { CSSProperties } from "vue"
import { PAPER_SIZES } from "~/constants/papers"

const configsStore = useConfigsStore()
const { configs } = storeToRefs(configsStore)

const pageFormat = computed(() => configs.value.general.layout.size)

const pageStyles = computed<CSSProperties>(() => ({
  position: "relative",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  lineHeight: `${configs.value.general.typography.lineHeight}`,
  fontSize: `${configs.value.general.typography.fontSize}pt`,
  fontFamily: `${configs.value.general.typography.fontFamily}, sans-serif`,
  fontStretch: "normal",
  textRendering: "geometricPrecision",
  fontVariantLigatures: "none",
  borderRadius: "4px",
  marginBottom: "32px",
  width: `${PAPER_SIZES[pageFormat.value].w}mm`,
  minWidth: `${PAPER_SIZES[pageFormat.value].w}mm`,
  height: `${PAPER_SIZES[pageFormat.value].h}mm`,
  minHeight: `${PAPER_SIZES[pageFormat.value].h}mm`
}))
</script>
<template>
  <div class="resumePage" :style="pageStyles">
    <slot />
  </div>
</template>
