<script setup lang="ts">
import NumberInput from "~/components/ui/NumberInput.vue"
import SelectItem from "~/components/ui/SelectItem.vue"
import { separatorOptions, variantOptions } from "~/utils/options/sharedOptions"
import type { TSeparator, TVariant } from "~/utils/schemas/shared.schema"
import ConfigWrapper from "../wrapper/ConfigWrapper.vue"

const { configs, updateConfig } = useConfigsStore()

const handleUpdate = (key: string, value: unknown) => {
  updateConfig(`languages.${key}`, value)
}
</script>

<template>
  <ResumeConfigsWrapper title="Languages" icon="i-lucide-languages">
    <ConfigWrapper title="Layout">
      <SelectItem
        v-model="configs.languages.variant"
        label="Variant"
        :options="variantOptions"
        @update:model-value="(value) => handleUpdate('variant', value as TVariant)"
      />
      <NumberInput
        v-if="configs.languages.variant === 'grid'"
        v-model="configs.languages.grids"
        label="Grids"
        :min="1"
        :max="4"
        @update:model-value="(value) => handleUpdate('grids', value)"
      />
      <SelectItem
        v-if="configs.languages.variant === 'inline'"
        v-model="configs.languages.separator"
        label="Separator"
        :options="separatorOptions"
        @update:model-value="(value) => handleUpdate('separator', value as TSeparator)"
      />
    </ConfigWrapper>
  </ResumeConfigsWrapper>
</template>
