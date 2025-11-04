<script setup lang="ts">
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
  present?: boolean
  sectionType: (typeof AdvancedSectionTypeSchema.options)[number]
}

defineProps<Props>()
</script>

<template>
  <div class="flex justify-between [&>*]:max-w-[50%]">
    <ContentTitleSubtitle
      :title="title"
      :subtitle="subtitle"
      :url="url"
      :is-in-column="position === 'columns'"
      :section-type="sectionType"
    />
    <div class="flex justify-end items-start">
      <DateLocationContent
        :position="position"
        :start-date="startDate"
        :end-date="endDate"
        :location="location"
        :present="present"
      />
    </div>
  </div>
  <DescriptionContent :html="description ?? ''" />
</template>
