<script setup lang="ts">
import NumberInput from "~/components/ui/NumberInput.vue"
import SelectItem from "~/components/ui/SelectItem.vue"
import { fontCaseOptions, fontWeightOptions } from "~/utils/options/sharedOptions"
import type { TFontCase, TFontStyle, TFontWeight } from "~/utils/schemas/shared.schema"
import ConfigWrapper from "../wrapper/ConfigWrapper.vue"

interface Props {
  title: string
  baseKey: string
}

const props = defineProps<Props>()

const { configs, updateConfig } = useConfigsStore()

const fontStyleOptions = [
  { label: "Regular", value: "regular" },
  { label: "Italic", value: "italic" }
]

function onUpdate(suffix: string, value: unknown) {
  updateConfig(`${props.baseKey}.${suffix}`, value)
}

function getNested(path: string): unknown {
  let node: unknown = configs
  const parts = path.split(".")
  for (const key of parts) {
    if (node && typeof node === "object" && key in (node as Record<string, unknown>)) {
      node = (node as Record<string, unknown>)[key]
    } else {
      return undefined
    }
  }
  return node
}

function getValue(field: string): unknown {
  const target = getNested(props.baseKey)
  if (target && typeof target === "object" && field in (target as Record<string, unknown>)) {
    return (target as Record<string, unknown>)[field]
  }
  return undefined
}

function getNumber(field: string): number {
  const value = getValue(field)
  return typeof value === "number" ? value : 12
}

function getString(field: string): string {
  const value = getValue(field)
  return typeof value === "string" ? value : ""
}
</script>

<template>
  <ConfigWrapper :title="props.title" variant="grid">
    <NumberInput
      :model-value="getNumber('fontSize')"
      label="Font Size"
      label-variant="stacked"
      :min="8"
      :max="48"
      @update:model-value="(value) => onUpdate('fontSize', value)"
    />
    <SelectItem
      :model-value="getString('fontWeight')"
      label="Font Weight"
      label-variant="stacked"
      :options="fontWeightOptions"
      @update:model-value="(value) => onUpdate('fontWeight', value as TFontWeight)"
    />
    <SelectItem
      :model-value="getString('fontCase')"
      label="Font Case"
      label-variant="stacked"
      :options="fontCaseOptions"
      @update:model-value="(value) => onUpdate('fontCase', value as TFontCase)"
    />
    <SelectItem
      :model-value="getString('fontStyle')"
      label="Font Style"
      label-variant="stacked"
      :options="fontStyleOptions"
      @update:model-value="(value) => onUpdate('fontStyle', value as TFontStyle)"
    />
  </ConfigWrapper>
</template>
