<script setup lang="ts">
import NumberInput from "~/components/ui/NumberInput.vue"
import SelectItem from "~/components/ui/SelectItem.vue"
import ToggleInput from "~/components/ui/ToggleInput.vue"
import type { TConfigs } from "~/utils/schemas/configs/configs.schema"
import { HeadingsSchema } from "~/utils/schemas/configs/generalConfigs.schema"
import { extractNumberConstraintsFromPath } from "~/utils/schemas/schemaExtractors"
import SectionTypography from "../sections/SectionTypography.vue"
import ConfigsContainer from "../wrapper/ConfigsContainer.vue"
import ConfigWrapper from "../wrapper/ConfigWrapper.vue"

const configsStore = useConfigsStore()
const { updateConfig } = configsStore
const { configs } = storeToRefs(configsStore)

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

const iconSizeConstraints = extractNumberConstraintsFromPath(HeadingsSchema.shape.icon, "size")
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
    <ConfigWrapper title="Icon">
      <ToggleInput
        :model-value="configs.general.headings.icon.visible"
        label="Show"
        @update:model-value="(value) => handleUpdate('icon.visible', value)"
      />
      <NumberInput
        :model-value="configs.general.headings.icon.size"
        label="Size"
        :min="iconSizeConstraints.min"
        :max="iconSizeConstraints.max"
        :disabled="!configs.general.headings.icon.visible"
        @update:model-value="(value) => handleUpdate('icon.size', value)"
      />
    </ConfigWrapper>
  </ConfigsContainer>
</template>
