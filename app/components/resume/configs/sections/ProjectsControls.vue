<script setup lang="ts">
import SelectItem from "~/components/ui/SelectItem.vue"
import { separatorOptions, variantSimpleOptions } from "~/utils/options/sharedOptions"
import type { TSeparator, TVariantSimple } from "~/utils/schemas/shared.schema"
import ConfigWrapper from "../wrapper/ConfigWrapper.vue"
import SectionTypography from "./SectionTypography.vue"

const { configs, updateConfig } = useConfigsStore()

const handleUpdate = (key: string, value: unknown) => {
  updateConfig(`projects.${key}`, value)
}
</script>

<template>
  <ResumeConfigsWrapper title="Projects" icon="i-lucide-folder-open">
    <ConfigWrapper title="Layout" variant="grid">
      <SelectItem
        v-model="configs.projects.separator"
        label="Separator"
        label-variant="stacked"
        :options="separatorOptions"
        @update:model-value="(value) => handleUpdate('separator', value as TSeparator)"
      />
      <SelectItem
        v-model="configs.projects.titleVariant"
        label="Title Variant"
        label-variant="stacked"
        :options="variantSimpleOptions"
        @update:model-value="(value) => handleUpdate('titleVariant', value as TVariantSimple)"
      />
      <SelectItem
        v-model="configs.projects.dateVariant"
        label="Date Variant"
        label-variant="stacked"
        :options="variantSimpleOptions"
        @update:model-value="(value) => handleUpdate('dateVariant', value as TVariantSimple)"
      />
    </ConfigWrapper>

    <SectionTypography title="Project Title" base-key="projects.title" />

    <SectionTypography title="Project Subtitle" base-key="projects.subtitle" />

    <SectionTypography title="Date" base-key="projects.date" />
  </ResumeConfigsWrapper>
</template>
