<script setup lang="ts">
import NumberInput from "~/components/ui/NumberInput.vue"
import ToggleInput from "~/components/ui/ToggleInput.vue"
import ConfigWrapper from "../wrapper/ConfigWrapper.vue"

const { configs, updateConfig } = useConfigsStore()

const handleUpdate = (key: string, value: unknown) => {
  updateConfig(`general.links.${key}`, value)
}
</script>

<template>
  <ResumeConfigsWrapper title="Links" icon="i-lucide-link" :collapsible="true" :default-expanded="true">
    <ToggleInput
      v-model="configs.general.links.underline"
      label="Underline"
      @update:model-value="(value) => handleUpdate('underline', value)"
    />

    <ConfigWrapper title="Colors" variant="grid">
      <UPopover>
        <UButton label="Text" :style="{ backgroundColor: configs.general.links.color }" />
        <template #content>
          <UColorPicker
            v-model="configs.general.links.color"
            label="Text Color"
            type="color"
            :throttle="100"
            format="hex"
            @update:model-value="(value) => handleUpdate('color', value)"
          />
        </template>
      </UPopover>
    </ConfigWrapper>
    <ConfigWrapper title="Icon">
      <ToggleInput
        v-model="configs.general.links.icon.visible"
        label="Show Icons"
        @update:model-value="(value) => handleUpdate('icon.visible', value)"
      />
      <NumberInput
        v-model="configs.general.links.icon.size"
        label="Icon Size"
        :min="8"
        :max="64"
        @update:model-value="(value) => handleUpdate('icon.size', value)"
      />
      <UPopover>
        <UButton label="Icon Color" :style="{ backgroundColor: configs.general.links.icon.color }" />
        <template #content>
          <UColorPicker
            v-model="configs.general.links.icon.color"
            label="Icon Color"
            type="color"
            :throttle="100"
            format="hex"
            @update:model-value="(value) => handleUpdate('icon.color', value)"
          />
        </template>
      </UPopover>
    </ConfigWrapper>
  </ResumeConfigsWrapper>
</template>
