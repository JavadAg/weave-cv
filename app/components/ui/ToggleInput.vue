<script setup lang="ts">
const props = defineProps<{
  label: string
  modelValue: boolean
}>()

const emit = defineEmits<{ (e: "update:modelValue", value: boolean): void }>()

const model = computed({
  get: () => props.modelValue,
  set: (v: boolean) => emit("update:modelValue", v)
})
</script>

<template>
  <USwitch v-model="model" :label="props.label" size="sm" :ui="{ label: 'text-sm font-medium text-muted' }" />
</template>
