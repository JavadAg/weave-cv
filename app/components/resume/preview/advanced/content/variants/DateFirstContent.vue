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

defineProps<Props>()

const configsStore = useConfigsStore()
const { configs } = storeToRefs(configsStore)
const layout = computed(() => configs.value.general.layout)
const contentLayoutWidth = computed(() => layout.value.contentLayout.dateFirstWidth)
</script>
<template>
  <div :style="{ width: `${contentLayoutWidth.left}%` }">
    <DateLocationContent :position="position" :start-date="startDate" :end-date="endDate" :location="location" />
  </div>
  <div :style="{ width: `${contentLayoutWidth.right}%` }">
    <ContentTitleSubtitle
      :title="title"
      :subtitle="subtitle"
      :url="url"
      :is-in-column="position === 'columns'"
      :section-type="sectionType"
    />
    <DescriptionContent :html="description ?? ''" />
  </div>
</template>
