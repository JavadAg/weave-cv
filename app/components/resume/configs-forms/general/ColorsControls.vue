<script setup lang="ts">
import ColorPicker from "~/components/ui/ColorPicker.vue"
import { ApplyableColorItems } from "~/utils/schemas/configs/generalConfigs.schema"
import ConfigWrapper from "../wrapper/ConfigWrapper.vue"
import ConfigsContainer from "../wrapper/ConfigsContainer.vue"

const configsStore = useConfigsStore()
const { updateConfig } = configsStore
const { configs } = storeToRefs(configsStore)

const handleUpdate = (key: string, value: unknown) => {
  updateConfig(`general.colors.${key}`, value)
}

const applyableColorItemsOptions = ApplyableColorItems.options.map((item) => ({
  label: (item.charAt(0).toUpperCase() + item.slice(1)) as string,
  value: item
}))

const applyModel = computed({
  get: () =>
    configs.value.general.colors.apply.map((item) => ({
      label: (item.charAt(0).toUpperCase() + item.slice(1)) as string,
      value: item
    })),
  set: (items) =>
    handleUpdate(
      "apply",
      items.map((item) => item.value)
    )
})
</script>

<template>
  <ConfigsContainer title="Colors" icon="i-lucide-palette" :collapsible="true" :default-expanded="true">
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
        :model-value="configs.general.colors.primary.textColor"
        label="Text Color"
        :color="configs.general.colors.primary.textColor"
        @update:model-value="(value) => handleUpdate('primary.textColor', value)"
      />
      <ColorPicker
        :model-value="configs.general.colors.primary.bgColor"
        label="Background Color"
        :color="configs.general.colors.primary.bgColor"
        @update:model-value="(value) => handleUpdate('primary.bgColor', value)"
      />
      <ColorPicker
        :model-value="configs.general.colors.primary.accentColor"
        label="Accent Color"
        :color="configs.general.colors.primary.accentColor"
        @update:model-value="(value) => handleUpdate('primary.accentColor', value)"
      />
    </ConfigWrapper>

    <ConfigWrapper title="Secondary" variant="grid">
      <ColorPicker
        :model-value="configs.general.colors.secondary.textColor"
        label="Text Color"
        :color="configs.general.colors.secondary.textColor"
        @update:model-value="(value) => handleUpdate('secondary.textColor', value)"
      />
      <ColorPicker
        :model-value="configs.general.colors.secondary.bgColor"
        label="Background Color"
        :color="configs.general.colors.secondary.bgColor"
        @update:model-value="(value) => handleUpdate('secondary.bgColor', value)"
      />
      <ColorPicker
        :model-value="configs.general.colors.secondary.accentColor"
        label="Accent Color"
        :color="configs.general.colors.secondary.accentColor"
        @update:model-value="(value) => handleUpdate('secondary.accentColor', value)"
      />
    </ConfigWrapper>
  </ConfigsContainer>
</template>
