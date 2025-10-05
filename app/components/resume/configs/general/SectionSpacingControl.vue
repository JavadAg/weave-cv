<script setup lang="ts">
const PARAGRAPH_SPACE_MIN = 0
const PARAGRAPH_SPACE_MAX = 50

interface Emits {
  (e: "update:paragraph-space", value: number): void
}

const props = defineProps<{
  paragraphSpace: number
}>()

const emit = defineEmits<Emits>()

const paragraphSpaceModel = computed({
  get: () => props.paragraphSpace,
  set: (value: number) => emit("update:paragraph-space", value)
})
</script>

<template>
  <ResumeConfigsWrapper
    title="Section Spacing"
    icon="i-heroicons-arrows-up-down"
  >
    <div class="flex justify-center">
      <span class="text-sm font-medium text-default">{{ paragraphSpace }}</span>
    </div>
    <USlider
      v-model="paragraphSpaceModel"
      :min="PARAGRAPH_SPACE_MIN"
      :max="PARAGRAPH_SPACE_MAX"
      :step="1"
      size="xs"
      :tooltip="true"
    />

    <div class="flex justify-between text-xs text-muted">
      <span>{{ PARAGRAPH_SPACE_MIN }}</span>
      <span>{{ PARAGRAPH_SPACE_MAX }}</span>
    </div>
  </ResumeConfigsWrapper>
</template>
