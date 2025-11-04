<script setup lang="ts">
import NumberInput from "~/components/ui/NumberInput.vue"
import SelectItem from "~/components/ui/SelectItem.vue"
import { SECTION_CONFIGS_CONFIG, SECTION_DISPLAY_CONFIG } from "~/constants/sectionConfigs"
import { separatorOptions, variantOptions } from "~/utils/options/sharedOptions"
import { BasicSectionTypeSchema } from "~/utils/schemas/content.schema"
import type { TSeparator, TVariant } from "~/utils/schemas/shared.schema"
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
</script>

<template>
  <template v-for="sectionType in BasicSectionTypeSchema.options" :key="sectionType">
    <ConfigsContainer
      :title="SECTION_DISPLAY_CONFIG[sectionType].label"
      :icon="SECTION_DISPLAY_CONFIG[sectionType].icon"
    >
      <ConfigWrapper title="Layout">
        <SelectItem
          v-if="SECTION_CONFIGS_CONFIG[sectionType].includes('variant')"
          :model-value="getConfigValue(sectionType, 'variant') as string"
          label="Variant"
          :options="variantOptions"
          @update:model-value="(value) => handleUpdate(sectionType, 'variant', value as TVariant)"
        />
        <NumberInput
          v-if="
            getConfigValue(sectionType, 'variant') === 'grid' && SECTION_CONFIGS_CONFIG[sectionType].includes('grids')
          "
          :model-value="getConfigValue(sectionType, 'grids') as number"
          label="Grids"
          :min="1"
          :max="4"
          @update:model-value="(value) => handleUpdate(sectionType, 'grids', value)"
        />
        <SelectItem
          v-if="
            getConfigValue(sectionType, 'variant') === 'inline' &&
            SECTION_CONFIGS_CONFIG[sectionType].includes('separator')
          "
          :model-value="getConfigValue(sectionType, 'separator') as string"
          label="Separator"
          :options="separatorOptions"
          @update:model-value="(value) => handleUpdate(sectionType, 'separator', value as TSeparator)"
        />
      </ConfigWrapper>
    </ConfigsContainer>
  </template>
</template>
