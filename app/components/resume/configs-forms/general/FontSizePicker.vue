<script setup lang="ts">
const FONT_SIZE_MIN = 8
const FONT_SIZE_MAX = 20

interface Emits {
  (e: "update:font-size", value: number): void
}

const props = defineProps<{
  fontSize: number
}>()
const emit = defineEmits<Emits>()

const fontSizeModel = computed({
  get: () => props.fontSize,
  set: (value: number) => emit("update:font-size", value)
})
</script>

<template>
  <ResumeConfigsWrapper title="Font Size" icon="i-lucide-a-large-small">
    <div class="flex justify-center">
      <span class="text-sm font-medium text-default">{{ fontSize }}px</span>
    </div>
    <USlider
      v-model="fontSizeModel"
      :min="FONT_SIZE_MIN"
      :max="FONT_SIZE_MAX"
      :step="1"
      size="xs"
      :tooltip="true"
    />
    <div class="flex justify-between text-xs text-muted">
      <span>{{ FONT_SIZE_MIN }}px</span>
      <span>{{ FONT_SIZE_MAX }}px</span>
    </div>
  </ResumeConfigsWrapper>
</template>
