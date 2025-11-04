<script setup lang="ts">
import SelectItem from "~/components/ui/SelectItem.vue"
import type { TConfigs } from "~/utils/schemas/configs/configs.schema"
import { HeadingsSchema } from "~/utils/schemas/configs/generalConfigs.schema"
import SectionTypography from "../sections/SectionTypography.vue"
import ConfigsContainer from "../wrapper/ConfigsContainer.vue"

const { configs, updateConfig } = useConfigsStore()

const handleUpdate = (key: string, value: unknown) => {
  updateConfig(`general.headings.${key}`, value)
}

const headingStyleOptions: { label: string; value: TConfigs["general"]["headings"]["variant"] }[] = [
  { label: "Plain", value: "plain" },
  { label: "Underline", value: "underline" },
  { label: "Underline Full", value: "underline-full" },
  { label: "Pill", value: "pill" },
  { label: "Border", value: "border" },
  { label: "Vertical Border", value: "vertical-border" }
]
</script>

<template>
  <ConfigsContainer title="Headings" icon="i-lucide-type" :collapsible="true" :default-expanded="true">
    <SelectItem
      :model-value="configs.general.headings.variant"
      label="Style"
      :options="headingStyleOptions"
      @update:model-value="(value) => handleUpdate('variant', value)"
    />
    <SectionTypography base-key="general.headings" :exclude="['fontStyle']" :schema="HeadingsSchema" />
  </ConfigsContainer>
</template>
