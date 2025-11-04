<script setup lang="ts">
import { computed, type CSSProperties } from "vue"
import type { TBasicSectionConfigs } from "~/utils/schemas/configs/sectionsConfigs.schema"
import HtmlWithDelimiter from "./HtmlWithDelimiter.vue"

interface Props {
  description: string
  sectionConfigs: TBasicSectionConfigs
}

const props = defineProps<Props>()

const titleStyle = computed(() => props.sectionConfigs.titleStyle)

const spanStyle = computed<CSSProperties>(() => ({
  whiteSpace: "inherit",
  overflowWrap: "break-word",
  fontWeight: "normal"
}))
</script>

<template>
  <span :style="spanStyle">
    {{ titleStyle === "bracket" ? " (" : " " }}
    <HtmlWithDelimiter :html="description" :separator="sectionConfigs.separator" />
    <span v-if="titleStyle === 'bracket'">)</span>
  </span>
</template>
