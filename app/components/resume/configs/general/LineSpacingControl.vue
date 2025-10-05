<script setup lang="ts">
const LINE_HEIGHT_MIN = 0.8
const LINE_HEIGHT_MAX = 2

interface Emits {
  (e: "update:line-height", value: number): void
}

const props = defineProps<{
  lineHeight: number
}>()
const emit = defineEmits<Emits>()

const lineHeightModel = computed({
  get: () => props.lineHeight,
  set: (value: number) => emit("update:line-height", value)
})
</script>

<template>
  <ResumeConfigsWrapper
    title="Line Spacing"
    icon="i-heroicons-bars-3-bottom-left"
  >
    <div class="flex justify-center">
      <span class="text-sm font-medium text-default">{{ lineHeight }}</span>
    </div>
    <USlider
      v-model="lineHeightModel"
      :min="LINE_HEIGHT_MIN"
      :max="LINE_HEIGHT_MAX"
      :step="0.1"
      size="xs"
      :tooltip="true"
    />
    <div class="flex justify-between text-xs text-muted">
      <span>{{ LINE_HEIGHT_MIN }}</span>
      <span>{{ LINE_HEIGHT_MAX }}</span>
    </div>
  </ResumeConfigsWrapper>
</template>
