<script setup lang="ts">
import ColorPicker from "~/components/ui/ColorPicker.vue"
import type { TApplyableColorItems } from "~/utils/schemas/configs.schema"
import { applyableColorItems } from "~/utils/schemas/configs.schema"
import ConfigWrapper from "../wrapper/ConfigWrapper.vue"

const { configs, updateConfig } = useConfigsStore()

const handleUpdate = (key: string, value: unknown) => {
  updateConfig(`general.colors.${key}`, value)
}

const applyableColorItemsOptions = applyableColorItems.options.map((item) => ({
  label: (item.charAt(0).toUpperCase() + item.slice(1)) as string,
  value: item as TApplyableColorItems
}))

const applyModel = computed({
  get: () =>
    configs.general.colors.apply.map((item) => ({
      label: (item.charAt(0).toUpperCase() + item.slice(1)) as string,
      value: item as TApplyableColorItems
    })),
  set: (items) =>
    handleUpdate(
      "apply",
      items.map((item) => item.value)
    )
})
</script>

<template>
  <ResumeConfigsWrapper title="Colors" icon="i-lucide-palette" :collapsible="true" :default-expanded="true">
    <ConfigWrapper title="Apply Accent" variant="grid">
      <USelectMenu
        v-model="applyModel"
        multiple
        :items="applyableColorItemsOptions"
        class="w-48"
        option-attribute="label"
        value-attribute="value"
      />
    </ConfigWrapper>

    <ConfigWrapper title="Primary" variant="grid">
      <ColorPicker
        v-model="configs.general.colors.primary.textColor"
        label="Text Color"
        :color="configs.general.colors.primary.textColor"
        @update:model-value="(value) => handleUpdate('primary.textColor', value)"
      />
      <ColorPicker
        v-model="configs.general.colors.primary.bgColor"
        label="Background Color"
        :color="configs.general.colors.primary.bgColor"
        @update:model-value="(value) => handleUpdate('primary.bgColor', value)"
      />
      <ColorPicker
        v-model="configs.general.colors.primary.accentColor"
        label="Accent Color"
        :color="configs.general.colors.primary.accentColor"
        @update:model-value="(value) => handleUpdate('primary.accentColor', value)"
      />
    </ConfigWrapper>

    <ConfigWrapper title="Secondary" variant="grid">
      <ColorPicker
        v-model="configs.general.colors.secondary.textColor"
        label="Text Color"
        :color="configs.general.colors.secondary.textColor"
        @update:model-value="(value) => handleUpdate('secondary.textColor', value)"
      />
      <ColorPicker
        v-model="configs.general.colors.secondary.bgColor"
        label="Background Color"
        :color="configs.general.colors.secondary.bgColor"
        @update:model-value="(value) => handleUpdate('secondary.bgColor', value)"
      />
      <ColorPicker
        v-model="configs.general.colors.secondary.accentColor"
        label="Accent Color"
        :color="configs.general.colors.secondary.accentColor"
        @update:model-value="(value) => handleUpdate('secondary.accentColor', value)"
      />
    </ConfigWrapper>
  </ResumeConfigsWrapper>
</template>
