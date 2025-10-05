<script setup lang="ts">
import SelectItem from "~/components/ui/SelectItem.vue"
import { separatorOptions, variantSimpleOptions } from "~/utils/options/sharedOptions"
import type { TSeparator, TVariantSimple } from "~/utils/schemas/shared.schema"
import ConfigWrapper from "../wrapper/ConfigWrapper.vue"
import SectionTypography from "./SectionTypography.vue"

const { configs, updateConfig } = useConfigsStore()

const handleUpdate = (key: string, value: unknown) => {
  updateConfig(`education.${key}`, value)
}
</script>

<template>
  <ResumeConfigsWrapper title="Education" icon="i-lucide-graduation-cap">
    <ConfigWrapper title="Layout" variant="grid">
      <SelectItem
        v-model="configs.education.separator"
        label="Separator"
        label-variant="stacked"
        :options="separatorOptions"
        @update:model-value="(value) => handleUpdate('separator', value as TSeparator)"
      />
      <SelectItem
        v-model="configs.education.titleVariant"
        label="Title Variant"
        label-variant="stacked"
        :options="variantSimpleOptions"
        @update:model-value="(value) => handleUpdate('titleVariant', value as TVariantSimple)"
      />
      <SelectItem
        v-model="configs.education.dateVariant"
        label="Date Variant"
        label-variant="stacked"
        :options="variantSimpleOptions"
        @update:model-value="(value) => handleUpdate('dateVariant', value as TVariantSimple)"
      />
    </ConfigWrapper>

    <SectionTypography title="Degree" base-key="education.degree" />

    <SectionTypography title="School" base-key="education.school" />

    <SectionTypography title="Location" base-key="education.location" />

    <SectionTypography title="Date" base-key="education.date" />
  </ResumeConfigsWrapper>
</template>
