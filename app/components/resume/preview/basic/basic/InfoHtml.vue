<script setup lang="ts">
import { computed } from "vue"
import type { TBasicSectionConfigs } from "~/utils/schemas/configs/sectionsConfigs.schema"
import HtmlWithSeparator from "./HtmlWithSeparator.vue"

interface Props {
  description: string
  sectionConfigs: TBasicSectionConfigs
}

const props = defineProps<Props>()

const titleStyle = computed(() => props.sectionConfigs.titleStyle)
</script>

<template>
  <span :style="{ whiteSpace: 'normal', overflowWrap: 'break-word' }">
    {{ titleStyle === "bracket" ? " (" : " " }}
    <HtmlWithSeparator :html="description" :separator="sectionConfigs.separator" />
    <span v-if="titleStyle === 'bracket'">)</span>
  </span>
</template>
