<script setup lang="ts">
const MARGIN_V_MIN = 10
const MARGIN_V_MAX = 40
const MARGIN_H_MIN = 10
const MARGIN_H_MAX = 40

interface Emits {
  (e: "update:margin-v" | "update:margin-h", value: number): void
}

const props = defineProps<{
  marginV: number
  marginH: number
}>()
const emit = defineEmits<Emits>()

const marginVModel = computed({
  get: () => props.marginV,
  set: (value: number) => emit("update:margin-v", value)
})


const marginHModel = computed({
  get: () => props.marginH,
  set: (value: number) => emit("update:margin-h", value)
})
</script>

<template>
  <ResumeConfigsWrapper title="Margins" icon="i-heroicons-arrows-pointing-out">
    <div class="space-y-2">
      <div class="flex justify-between items-center">
        <span class="text-xs text-muted">Vertical (Top/Bottom)</span>
        <span class="text-xs text-default">{{ marginV }}px</span>
      </div>
      <USlider
        v-model="marginVModel"
        :min="MARGIN_V_MIN"
        :max="MARGIN_V_MAX"
        :step="2"
        size="xs"
        class="w-full"
      />
      <div class="flex justify-between text-xs text-muted">
        <span>{{ MARGIN_V_MIN }}px</span>
        <span>{{ MARGIN_V_MAX }}px</span>
      </div>
    </div>

    <div class="space-y-2">
      <div class="flex justify-between items-center">
        <span class="text-xs text-muted">Horizontal (Left/Right)</span>
        <span class="text-xs text-default">{{ marginH }}px</span>
      </div>
      <USlider
        v-model="marginHModel"
        :min="MARGIN_H_MIN"
        :max="MARGIN_H_MAX"
        :step="2"
        size="xs"
        class="w-full"
      />
      <div class="flex justify-between text-xs text-muted">
        <span>{{ MARGIN_H_MIN }}px</span>
        <span>{{ MARGIN_H_MAX }}px</span>
      </div>
    </div>
  </ResumeConfigsWrapper>
</template>
