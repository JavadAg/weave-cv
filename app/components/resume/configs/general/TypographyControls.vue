<script setup lang="ts">
import NumberInput from "~/components/ui/NumberInput.vue"
import SelectItem from "~/components/ui/SelectItem.vue"
import { LocalFonts } from "~/constants/fonts"

const localFontOptions = Object.keys(LocalFonts).map((f) => ({ label: f, value: f }))

const { configs, updateConfig } = useConfigsStore()

const handleUpdate = async (key: string, value: unknown) => {
  if (key === "fontFamily") {
    loadLocalFont(value as string)

    updateConfig(`general.typography.fontFamily`, value)
  } else {
    updateConfig(`general.typography.${key}`, value)
  }
}

onMounted(async () => {
  await preloadLocalFont(configs.general.typography.fontFamily)
})
</script>

<template>
  <ResumeConfigsWrapper title="Typography" icon="i-lucide-type" :collapsible="true" :default-expanded="true">
    <div class="space-y-3">
      <SelectItem
        v-model="configs.general.typography.fontFamily"
        label="Font Family"
        :options="localFontOptions"
        @update:model-value="(v) => handleUpdate('fontFamily', v)"
      />
      <NumberInput
        v-model="configs.general.typography.lineHeight"
        label="Line Height"
        :min="1"
        :max="3"
        :step="0.1"
        @update:model-value="(v) => handleUpdate('lineHeight', v)"
      />
      <NumberInput
        v-model="configs.general.typography.letterSpacing"
        label="Letter Spacing"
        :min="-2"
        :max="10"
        :step="0.1"
        @update:model-value="(v) => handleUpdate('letterSpacing', v)"
      />
    </div>
  </ResumeConfigsWrapper>
</template>
