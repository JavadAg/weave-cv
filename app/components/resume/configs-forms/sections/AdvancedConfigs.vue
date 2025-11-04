<script setup lang="ts">
import { capitalize } from "vue"
import SelectItem from "~/components/ui/SelectItem.vue"
import ToggleInput from "~/components/ui/ToggleInput.vue"
import { SECTION_CONFIGS_CONFIG, SECTION_DISPLAY_CONFIG } from "~/constants/sectionConfigs"
import { variantSimpleOptions } from "~/utils/options/sharedOptions"
import { AdvancedSectionTypeSchema } from "~/utils/schemas/content.schema"
import { AdvancedSectionVariant, type TVariantSimple } from "~/utils/schemas/shared.schema"
import ConfigsContainer from "../wrapper/ConfigsContainer.vue"
import ConfigWrapper from "../wrapper/ConfigWrapper.vue"

const { configs, updateConfig } = useConfigsStore()

const handleUpdate = (sectionType: string, key: string, value: unknown) => {
  updateConfig(`${sectionType}.${key}`, value)
}

const getConfigValue = (sectionType: string, key: string) => {
  const sectionConfig = configs[sectionType as keyof typeof configs]
  if (sectionConfig && typeof sectionConfig === "object" && key in sectionConfig) {
    return (sectionConfig as Record<string, unknown>)[key]
  }
  return null
}

const advancedVariantOptions = AdvancedSectionVariant.options.map((option) => ({
  label: capitalize(option),
  value: option
}))
</script>

<template>
  <template v-for="sectionType in AdvancedSectionTypeSchema.options" :key="sectionType">
    <ConfigsContainer
      :title="SECTION_DISPLAY_CONFIG[sectionType].label"
      :icon="SECTION_DISPLAY_CONFIG[sectionType].icon"
    >
      <ConfigWrapper title="Layout" variant="grid">
        <SelectItem
          v-if="SECTION_CONFIGS_CONFIG[sectionType].includes('variant')"
          :model-value="getConfigValue(sectionType, 'variant') as string"
          label="Variant"
          label-variant="stacked"
          :options="advancedVariantOptions"
          @update:model-value="(value) => handleUpdate(sectionType, 'variant', value)"
        />
        <SelectItem
          v-if="SECTION_CONFIGS_CONFIG[sectionType].includes('titleSubtitleVariant')"
          :model-value="getConfigValue(sectionType, 'titleSubtitleVariant') as string"
          label="Title Variant"
          label-variant="stacked"
          :options="variantSimpleOptions"
          @update:model-value="(value) => handleUpdate(sectionType, 'titleSubtitleVariant', value as TVariantSimple)"
        />
        <ToggleInput
          v-if="SECTION_CONFIGS_CONFIG[sectionType].includes('subTitleFirst')"
          :model-value="getConfigValue(sectionType, 'subTitleFirst') as boolean"
          label="Subtitle First"
          @update:model-value="(value) => handleUpdate(sectionType, 'subTitleFirst', value)"
        />
      </ConfigWrapper>
    </ConfigsContainer>
  </template>
</template>
