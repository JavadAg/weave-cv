<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    label: string
    labelVariant?: "inline" | "stacked"
    modelValue: string
    color: string
  }>(),
  {
    labelVariant: "inline"
  }
)

const emit = defineEmits<{ (e: "update:modelValue", value: string): void }>()

const model = computed({
  get: () => props.modelValue,
  set: (v: string) => emit("update:modelValue", v)
})

const chip = computed(() => ({ backgroundColor: model.value }))
</script>

<template>
  <UPopover>
    <UButton
      :label="label"
      color="neutral"
      variant="outline"
      class="w-full justify-between"
      :ui="{ label: 'text-muted' }"
    >
      <template #leading>
        <span :style="chip" class="size-4 rounded-full shrink-0" />
      </template>
    </UButton>

    <template #content>
      <UColorPicker v-model="model" format="hsl" :throttle="50" class="p-2" />
    </template>
  </UPopover>
</template>
