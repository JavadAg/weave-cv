<script setup lang="ts">
import NumberInput from "~/components/ui/NumberInput.vue"
import SelectItem from "~/components/ui/SelectItem.vue"
import { separatorOptions, variantOptions } from "~/utils/options/sharedOptions"
import type { TSeparator, TVariant } from "~/utils/schemas/shared.schema"
import ConfigWrapper from "../wrapper/ConfigWrapper.vue"

const { configs, updateConfig } = useConfigsStore()

const handleUpdate = (key: string, value: unknown) => {
  updateConfig(`skills.${key}`, value)
}
</script>

<template>
  <ResumeConfigsWrapper title="Skills" icon="i-lucide-code">
    <ConfigWrapper title="Layout">
      <SelectItem
        v-model="configs.skills.variant"
        label="Variant"
        :options="variantOptions"
        @update:model-value="(value) => handleUpdate('variant', value as TVariant)"
      />
      <NumberInput
        v-if="configs.skills.variant === 'grid'"
        v-model="configs.skills.grids"
        label="Grids"
        :min="1"
        :max="4"
        @update:model-value="(value) => handleUpdate('grids', value)"
      />
      <SelectItem
        v-if="configs.skills.variant === 'inline'"
        v-model="configs.skills.separator"
        label="Separator"
        :options="separatorOptions"
        @update:model-value="(value) => handleUpdate('separator', value as TSeparator)"
      />
    </ConfigWrapper>
  </ResumeConfigsWrapper>
</template>
