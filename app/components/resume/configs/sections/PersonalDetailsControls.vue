<script setup lang="ts">
import NumberInput from "~/components/ui/NumberInput.vue"
import SelectItem from "~/components/ui/SelectItem.vue"
import {
  alignOptions,
  fontCaseOptions,
  fontWeightOptions,
  iconAlignOptions,
  iconStyleOptions,
  separatorOptions,
  variantOptions
} from "~/utils/options/sharedOptions"
import type {
  TAlign,
  TFontCase,
  TFontWeight,
  TIconStyle,
  TSeparator,
  TSide,
  TVariant,
  TVariantSimple
} from "~/utils/schemas/shared.schema"
import ConfigWrapper from "../wrapper/ConfigWrapper.vue"

const { configs, updateConfig } = useConfigsStore()

const handleUpdate = (key: string, value: unknown) => {
  updateConfig(`personal.${key}`, value)
}
</script>

<template>
  <ResumeConfigsWrapper title="Personal Details" icon="i-lucide-user">
    <ConfigWrapper title="Layout">
      <SelectItem
        v-model="configs.personal.variant"
        label="Variant"
        :options="variantOptions"
        @update:model-value="(value) => handleUpdate('variant', value as TVariantSimple)"
      />
    </ConfigWrapper>
    <ConfigWrapper title="Main Section">
      <SelectItem
        v-model="configs.personal.main.align"
        label="Alignment"
        :options="alignOptions"
        @update:model-value="(value) => handleUpdate('main.align', value as TAlign)"
      />
      <SelectItem
        v-model="configs.personal.main.variant"
        label="Variant"
        :options="variantOptions"
        @update:model-value="(value) => handleUpdate('main.variant', value as TVariantSimple)"
      />
    </ConfigWrapper>

    <ConfigWrapper title="Title">
      <NumberInput
        v-model="configs.personal.main.title.fontSize"
        label="Font Size"
        :min="12"
        :max="48"
        @update:model-value="(value) => handleUpdate('main.title.fontSize', value)"
      />
      <SelectItem
        v-model="configs.personal.main.title.fontWeight"
        label="Font Weight"
        :options="fontWeightOptions"
        @update:model-value="(value) => handleUpdate('main.title.fontWeight', value as TFontWeight)"
      />
      <SelectItem
        v-model="configs.personal.main.title.fontCase"
        label="Font Case"
        :options="fontCaseOptions"
        @update:model-value="(value) => handleUpdate('main.title.fontCase', value as TFontCase)"
      />
      <NumberInput
        v-model="configs.personal.main.title.bottomSpace"
        label="Bottom Space"
        :min="0"
        :max="48"
        @update:model-value="(value) => handleUpdate('main.title.bottomSpace', value)"
      />
    </ConfigWrapper>

    <ConfigWrapper title="Subtitle">
      <NumberInput
        v-model="configs.personal.main.subtitle.fontSize"
        label="Font Size"
        :min="12"
        :max="48"
        @update:model-value="(value) => handleUpdate('main.subtitle.fontSize', value)"
      />
      <SelectItem
        v-model="configs.personal.main.subtitle.fontWeight"
        label="Font Weight"
        :options="fontWeightOptions"
        @update:model-value="(value) => handleUpdate('main.subtitle.fontWeight', value as TFontWeight)"
      />
      <SelectItem
        v-model="configs.personal.main.subtitle.fontCase"
        label="Font Case"
        :options="fontCaseOptions"
        @update:model-value="(value) => handleUpdate('main.subtitle.fontCase', value as TFontCase)"
      />
      <NumberInput
        v-model="configs.personal.main.subtitle.bottomSpace"
        label="Bottom Space"
        :min="0"
        :max="48"
        @update:model-value="(value) => handleUpdate('main.subtitle.bottomSpace', value)"
      />
    </ConfigWrapper>

    <ConfigWrapper title="Details">
      <SelectItem
        v-model="configs.personal.details.variant"
        label="Variant"
        :options="variantOptions"
        @update:model-value="(value) => handleUpdate('details.variant', value as TVariant)"
      />
      <SelectItem
        v-model="configs.personal.details.separator"
        label="Separator"
        :options="separatorOptions"
        @update:model-value="(value) => handleUpdate('details.separator', value as TSeparator)"
      />
      <NumberInput
        v-model="configs.personal.details.fontSize"
        label="Font Size"
        :min="12"
        :max="48"
        @update:model-value="(value) => handleUpdate('details.fontSize', value)"
      />
      <SelectItem
        v-model="configs.personal.details.fontWeight"
        label="Font Weight"
        :options="fontWeightOptions"
        @update:model-value="(value) => handleUpdate('details.fontWeight', value as TFontWeight)"
      />
      <SelectItem
        v-model="configs.personal.details.fontCase"
        label="Font Case"
        :options="fontCaseOptions"
        @update:model-value="(value) => handleUpdate('details.fontCase', value as TFontCase)"
      />
      <SelectItem
        v-model="configs.personal.details.align"
        label="Alignment"
        :options="alignOptions"
        @update:model-value="(value) => handleUpdate('details.align', value as TAlign)"
      />
    </ConfigWrapper>

    <ConfigWrapper title="Icons">
      <SelectItem
        v-model="configs.personal.details.icon.align"
        label="Icon Alignment"
        :options="iconAlignOptions"
        @update:model-value="(value) => handleUpdate('details.icon.align', value as TSide)"
      />
      <SelectItem
        v-model="configs.personal.details.icon.type"
        label="Icon Style"
        :options="iconStyleOptions"
        @update:model-value="(value) => handleUpdate('details.icon.type', value as TIconStyle)"
      />
      <NumberInput
        v-model="configs.personal.details.icon.size"
        label="Icon Size"
        :min="8"
        :max="64"
        @update:model-value="(value) => handleUpdate('details.icon.size', value)"
      />
    </ConfigWrapper>
  </ResumeConfigsWrapper>
</template>
