<script setup lang="ts">
import { capitalize } from "vue"
import NumberInput from "~/components/ui/NumberInput.vue"
import SelectItem from "~/components/ui/SelectItem.vue"
import ToggleInput from "~/components/ui/ToggleInput.vue"
import type { TPaperSize } from "~/constants/papers"
import { PAPER_SIZES } from "~/constants/papers"
import { createOptionsFromEnum } from "~/utils/preview/helpers"
import { ConfigsSchema } from "~/utils/schemas/configs.schema"
import SectionsOrderControl from "./SectionsOrderControl.vue"

const { configs, updateConfig } = useConfigsStore()

const handleUpdate = (key: string, value: unknown) => {
  updateConfig(`general.layout.${key}`, value)
}

const layoutSchema = ConfigsSchema.shape.general.shape.layout

const dateFormatOptions = createOptionsFromEnum(layoutSchema.shape.dateFormat.options)
const pageSizeOptions = createOptionsFromEnum(Object.keys(PAPER_SIZES) as TPaperSize[], (value) => value)
const columnsOptions = createOptionsFromEnum(
  layoutSchema.shape.columns.options,
  (value) => `${value} Column${value === "1" ? "" : "s"}`
)
const personalPositionOptions = createOptionsFromEnum(layoutSchema.shape.personalPosition.options, capitalize)
</script>

<template>
  <ResumeConfigsWrapper title="Layout" icon="i-lucide-grid" :collapsible="true" :default-expanded="true">
    <ToggleInput
      v-model="configs.general.layout.rtl"
      label="Right-to-left (RTL)"
      @update:model-value="(value) => handleUpdate('rtl', value)"
    />
    <SelectItem
      v-model="configs.general.layout.dateFormat"
      label="Date format"
      :options="dateFormatOptions"
      @update:model-value="(value) => handleUpdate('dateFormat', value)"
    />
    <SelectItem
      :model-value="configs.general.layout.size"
      label="Page Size"
      :options="pageSizeOptions"
      @update:model-value="(value) => handleUpdate('size', value)"
    />
    <SelectItem
      :model-value="configs.general.layout.columns"
      label="Columns"
      :options="columnsOptions"
      @update:model-value="(value) => handleUpdate('columns', value)"
    />
    <SelectItem
      :model-value="configs.general.layout.personalPosition"
      label="Personal Section"
      :options="personalPositionOptions"
      @update:model-value="(value) => handleUpdate('personalPosition', value)"
    />
    <NumberInput
      v-model="configs.general.layout.sectionGap"
      label="Section Gap"
      :min="0"
      :max="100"
      @update:model-value="(value) => handleUpdate('sectionGap', value)"
    />
    <!-- <ConfigWrapper title="Border Settings">
      <ToggleInput
        v-model="configs.general.layout.border.isEnabled"
        label="Enable Border"
        @update:model-value="(value) => handleUpdate('border.isEnabled', value)"
      />
      <div v-if="configs.general.layout.border.isEnabled" class="grid grid-cols-2 gap-2">
        <SelectItem
          v-model="configs.general.layout.border.apply"
          label="Apply To"
          label-variant="stacked"
          :options="borderApplyOptions"
          @update:model-value="(value) => handleUpdate('border.apply', value)"
        />
        <UColorPicker
          v-model="configs.general.layout.border.color"
          label="Border Color"
          label-variant="stacked"
          @update:model-value="(value) => handleUpdate('border.color', value)"
        />
        <NumberInput
          v-model="configs.general.layout.border.width"
          label="Border Width"
          label-variant="stacked"
          :min="1"
          :max="10"
          @update:model-value="(value) => handleUpdate('border.width', value)"
        />
        <SelectItem
          v-model="configs.general.layout.border.style"
          label="Border Style"
          label-variant="stacked"
          :options="borderStyleOptions"
          @update:model-value="(value) => handleUpdate('border.style', value)"
        />
      </div>
    </ConfigWrapper> -->

    <div class="grid gap-2">
      <span class="text-sm font-medium">Margins</span>
      <div class="grid grid-cols-2 gap-2">
        <NumberInput
          label-variant="stacked"
          :model-value="configs.general.layout.margins.top"
          label="Top"
          :min="0"
          :max="100"
          @update:model-value="(value) => handleUpdate('margins.top', value)"
        />
        <NumberInput
          label-variant="stacked"
          :model-value="configs.general.layout.margins.right"
          label="Right"
          :min="0"
          :max="100"
          @update:model-value="(value) => handleUpdate('margins.right', value)"
        />
        <NumberInput
          label-variant="stacked"
          :model-value="configs.general.layout.margins.bottom"
          label="Bottom"
          :min="0"
          :max="100"
          @update:model-value="(value) => handleUpdate('margins.bottom', value)"
        />
        <NumberInput
          label-variant="stacked"
          :model-value="configs.general.layout.margins.left"
          label="Left"
          :min="0"
          :max="100"
          @update:model-value="(value) => handleUpdate('margins.left', value)"
        />
      </div>
    </div>
    <SectionsOrderControl />
  </ResumeConfigsWrapper>
</template>
