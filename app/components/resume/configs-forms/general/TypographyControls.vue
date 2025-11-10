<script setup lang="ts">
import NumberInput from "~/components/ui/NumberInput.vue"
import SelectItem from "~/components/ui/SelectItem.vue"
import { FONT_OPTIONS, type TFontFamily } from "~/constants/fonts"
import { loadLocalFont, preloadLocalFont } from "~/utils/preview/core/fontUtils"
import { ContentLayoutSchema, TypographySchema } from "~/utils/schemas/configs/generalConfigs.schema"
import { PersonalConfigsSchema } from "~/utils/schemas/configs/sectionsConfigs.schema"
import { extractNumberConstraintsFromPath } from "~/utils/schemas/schemaExtractors"
import SectionTypography from "../sections/SectionTypography.vue"
import ConfigsContainer from "../wrapper/ConfigsContainer.vue"
import ConfigWrapper from "../wrapper/ConfigWrapper.vue"

const configsStore = useConfigsStore()
const { configs } = storeToRefs(configsStore)
const { updateConfig } = configsStore

const handleUpdate = async (key: string, value: unknown) => {
  if (key === "fontFamily") {
    loadLocalFont(value as TFontFamily)

    updateConfig(`general.typography.fontFamily`, value)
  } else {
    updateConfig(`general.typography.${key}`, value)
  }
}

const fontSizeConstraints = extractNumberConstraintsFromPath(TypographySchema, "fontSize")
const lineHeightConstraints = extractNumberConstraintsFromPath(TypographySchema, "lineHeight")

onMounted(async () => {
  await preloadLocalFont(configs.value.general.typography.fontFamily)
})
</script>

<template>
  <ConfigsContainer title="Typography" icon="i-lucide-type" :collapsible="true" :default-expanded="true">
    <ConfigWrapper variant="grid">
      <SelectItem
        v-model="configs.general.typography.fontFamily"
        label-variant="stacked"
        label="Font Family"
        :options="FONT_OPTIONS.map((option) => ({ label: option.label, value: option.value }))"
        @update:model-value="(v) => handleUpdate('fontFamily', v)"
      />
      <NumberInput
        v-model="configs.general.typography.fontSize"
        label-variant="stacked"
        label="Font Size"
        :min="fontSizeConstraints.min"
        :max="fontSizeConstraints.max"
        :step="1"
        @update:model-value="(v) => handleUpdate('fontSize', v)"
      />
      <NumberInput
        v-model="configs.general.typography.lineHeight"
        label-variant="stacked"
        label="Line Height"
        :min="lineHeightConstraints.min"
        :max="lineHeightConstraints.max"
        :step="0.1"
        @update:model-value="(v) => handleUpdate('lineHeight', v)"
      />
    </ConfigWrapper>
    <SectionTypography
      title="Personal Name"
      base-key="personal.main.title"
      :exclude="['fontStyle', 'fontCase']"
      :schema="PersonalConfigsSchema.shape.main.shape.title"
    />
    <SectionTypography
      title="Personal Job Title"
      base-key="personal.main.subtitle"
      :exclude="['fontStyle', 'fontCase']"
      :schema="PersonalConfigsSchema.shape.main.shape.subtitle"
    />
    <SectionTypography
      title="Content Title"
      base-key="general.layout.contentLayout.title"
      :schema="ContentLayoutSchema.shape.title"
      :exclude="['fontCase']"
    />
    <SectionTypography
      title="Content Subtitle"
      base-key="general.layout.contentLayout.subtitle"
      :schema="ContentLayoutSchema.shape.subtitle"
      :exclude="['fontCase']"
    />
  </ConfigsContainer>
</template>
