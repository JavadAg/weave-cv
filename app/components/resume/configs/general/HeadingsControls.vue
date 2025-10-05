<script setup lang="ts">
import NumberInput from "~/components/ui/NumberInput.vue"
import SelectItem from "~/components/ui/SelectItem.vue"
import type { TConfigs } from "~/types/resume.types"
import { fontCaseOptions, fontWeightOptions } from "~/utils/options/sharedOptions"

const { configs, updateConfig } = useConfigsStore()

const handleUpdate = (key: string, value: unknown) => {
  updateConfig(`general.headings.${key}`, value)
}

const headingStyleOptions: { label: string; value: TConfigs["general"]["headings"]["variant"] }[] = [
  { label: "Plain", value: "plain" },
  { label: "Underline Short", value: "underline-short" },
  { label: "Underline Long", value: "underline-long" },
  { label: "Pill", value: "pill" },
  { label: "Border", value: "border" },
  { label: "Vertical Border", value: "vertical-border" }
]
</script>

<template>
  <ResumeConfigsWrapper title="Headings" icon="i-lucide-type" :collapsible="true" :default-expanded="true">
    <div class="space-y-3">
      <NumberInput
        :model-value="configs.general.headings.fontSize"
        label="Font Size"
        :min="12"
        :max="48"
        @update:model-value="(value) => handleUpdate('fontSize', value)"
      />
      <SelectItem
        :model-value="configs.general.headings.fontWeight.toString()"
        label="Font Weight"
        :options="fontWeightOptions"
        @update:model-value="(value) => handleUpdate('fontWeight', value)"
      />
      <SelectItem
        :model-value="configs.general.headings.fontCase"
        label="Font Case"
        :options="fontCaseOptions"
        @update:model-value="(value) => handleUpdate('fontCase', value)"
      />
      <SelectItem
        :model-value="configs.general.headings.variant"
        label="Style"
        :options="headingStyleOptions"
        @update:model-value="(value) => handleUpdate('variant', value)"
      />
    </div>
  </ResumeConfigsWrapper>
</template>
