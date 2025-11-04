<script setup lang="ts">
import { computed } from "vue"
import type { AdvancedSectionTypeSchema } from "~/utils/schemas/content.schema"
import type { TAdvancedSectionVariant } from "~/utils/schemas/shared.schema"
import ContentTitleSubtitle from "../ContentTitleSubtitle.vue"
import DateLocationContent from "../DateLocationContent.vue"
import DescriptionContent from "../DescriptionContent.vue"

interface Props {
  position: TAdvancedSectionVariant | "columns"
  title?: string
  url?: string
  subtitle?: string
  description?: string
  startDate?: string
  endDate?: string
  location?: string
  sectionType: (typeof AdvancedSectionTypeSchema.options)[number]
}

const props = defineProps<Props>()

const configsStore = useConfigsStore()
const { configs } = storeToRefs(configsStore)

const hasDateOrLocation = computed(() => props.startDate || props.endDate || props.location)

const dateLocationStyles = computed(() => ({
  display: hasDateOrLocation.value ? "block" : "none",
  paddingTop: `${0.1 * configs.value.general.typography.lineHeight}em`,
  paddingBottom: `${0.1 * configs.value.general.typography.lineHeight}em`
}))
</script>

<template>
  <ContentTitleSubtitle
    :title="title"
    :subtitle="subtitle"
    :url="url"
    :is-in-column="position === 'columns'"
    :section-type="sectionType"
  />
  <div v-if="startDate || endDate || location" :style="dateLocationStyles">
    <DateLocationContent :position="position" :start-date="startDate" :end-date="endDate" :location="location" />
  </div>
  <DescriptionContent :html="description ?? ''" />
</template>
