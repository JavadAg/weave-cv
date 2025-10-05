<script setup lang="ts">
import NumberInput from "~/components/ui/NumberInput.vue"
import SelectItem from "~/components/ui/SelectItem.vue"
import { separatorOptions, variantSimpleOptions } from "~/utils/options/sharedOptions"
import type { TSeparator, TVariantSimple } from "~/utils/schemas/shared.schema"
import ConfigWrapper from "../wrapper/ConfigWrapper.vue"
import SectionTypography from "./SectionTypography.vue"

const { configs, updateConfig } = useConfigsStore()

const handleUpdate = (key: string, value: unknown) => {
  updateConfig(`links.${key}`, value)
}

const linksVariantOptions = [
  { label: "List", value: "list" },
  { label: "Inline", value: "inline" },
  { label: "Tags", value: "tags" },
  { label: "Grid", value: "grid" }
]

const iconVariantOptions = [
  { label: "Show", value: "show" },
  { label: "Hide", value: "hide" },
  { label: "Only", value: "only" }
]
</script>

<template>
  <ResumeConfigsWrapper title="Links" icon="i-lucide-link">
    <ConfigWrapper title="Layout" variant="grid">
      <SelectItem
        v-model="configs.links.variant"
        label="Variant"
        label-variant="stacked"
        :options="linksVariantOptions"
        @update:model-value="(value) => handleUpdate('variant', value)"
      />
      <SelectItem
        v-model="configs.links.separator"
        label="Separator"
        label-variant="stacked"
        :options="separatorOptions"
        @update:model-value="(value) => handleUpdate('separator', value as TSeparator)"
      />
      <SelectItem
        v-model="configs.links.titleVariant"
        label="Title Variant"
        label-variant="stacked"
        :options="variantSimpleOptions"
        @update:model-value="(value) => handleUpdate('titleVariant', value as TVariantSimple)"
      />
    </ConfigWrapper>

    <SectionTypography title="Link Text" base-key="links.text" />

    <ConfigWrapper title="Icons" variant="grid">
      <SelectItem
        v-model="configs.links.icon.variant"
        label="Icon Variant"
        label-variant="stacked"
        :options="iconVariantOptions"
        @update:model-value="(value) => handleUpdate('icon.variant', value)"
      />
      <NumberInput
        v-model="configs.links.icon.size"
        label="Icon Size"
        label-variant="stacked"
        :min="8"
        :max="64"
        @update:model-value="(value) => handleUpdate('icon.size', value)"
      />
      <NumberInput
        v-model="configs.links.icon.gap"
        label="Icon Gap"
        label-variant="stacked"
        :min="0"
        :max="32"
        @update:model-value="(value) => handleUpdate('icon.gap', value)"
      />
    </ConfigWrapper>

    <ConfigWrapper title="Spacing" variant="grid">
      <NumberInput
        v-model="configs.links.gap"
        label="Gap"
        label-variant="stacked"
        :min="0"
        :max="32"
        @update:model-value="(value) => handleUpdate('gap', value)"
      />
    </ConfigWrapper>
  </ResumeConfigsWrapper>
</template>
