<script setup lang="ts">
import NumberInput from "~/components/ui/NumberInput.vue"
import SelectItem from "~/components/ui/SelectItem.vue"
import { separatorOptions, variantSimpleOptions } from "~/utils/options/sharedOptions"
import type { TSeparator, TVariantSimple } from "~/utils/schemas/shared.schema"
import ConfigWrapper from "../wrapper/ConfigWrapper.vue"
import SectionTypography from "./SectionTypography.vue"

const { configs, updateConfig } = useConfigsStore()

const handleUpdate = (key: string, value: unknown) => {
  updateConfig(`experience.${key}`, value)
}

const bulletStyleOptions = [
  { label: "Disc", value: "disc" },
  { label: "Dash", value: "dash" },
  { label: "Square", value: "square" },
  { label: "None", value: "none" }
]

const experienceVariantOptions = [
  { label: "Content First", value: "contentFirst" },
  { label: "Date First", value: "dateFirst" },
  { label: "Stacked", value: "stacked" }
]
</script>

<template>
  <ResumeConfigsWrapper title="Experience" icon="i-lucide-briefcase">
    <ConfigWrapper title="Layout" variant="grid">
      <SelectItem
        v-model="configs.experience.variant"
        label="Variant"
        label-variant="stacked"
        :options="experienceVariantOptions"
        @update:model-value="(value) => handleUpdate('variant', value)"
      />
      <SelectItem
        v-model="configs.experience.separator"
        label="Separator"
        label-variant="stacked"
        :options="separatorOptions"
        @update:model-value="(value) => handleUpdate('separator', value as TSeparator)"
      />
      <SelectItem
        v-model="configs.experience.titleVariant"
        label="Title Variant"
        label-variant="stacked"
        :options="variantSimpleOptions"
        @update:model-value="(value) => handleUpdate('titleVariant', value as TVariantSimple)"
      />
      <SelectItem
        v-model="configs.experience.dateVariant"
        label="Date Variant"
        label-variant="stacked"
        :options="variantSimpleOptions"
        @update:model-value="(value) => handleUpdate('dateVariant', value as TVariantSimple)"
      />
    </ConfigWrapper>
    <SectionTypography title="Role" base-key="experience.role" />
    <SectionTypography title="Company" base-key="experience.company" />
    <SectionTypography title="Location" base-key="experience.location" />
    <SectionTypography title="Date" base-key="experience.date" />
    <ConfigWrapper title="Bullets" variant="grid">
      <SelectItem
        v-model="configs.experience.bullets.bulletStyle"
        label="Bullet Style"
        label-variant="stacked"
        :options="bulletStyleOptions"
        @update:model-value="(value) => handleUpdate('bullets.bulletStyle', value)"
      />
      <NumberInput
        v-model="configs.experience.bullets.gap"
        label="Bullet Gap"
        label-variant="stacked"
        :min="0"
        :max="32"
        @update:model-value="(value) => handleUpdate('bullets.gap', value)"
      />
    </ConfigWrapper>
  </ResumeConfigsWrapper>
</template>
