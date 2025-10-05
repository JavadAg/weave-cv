<script setup lang="ts">
import { PAPER_SIZES, type PaperSize } from "~/constants/papers"

interface Emits {
  (e: "update:paper-size", value: PaperSize): void
}

const props = defineProps<{
  paperSize: PaperSize
}>()
const emit = defineEmits<Emits>()

const paperSizeModel = computed({
  get: () => props.paperSize,
  set: (value: PaperSize) => emit("update:paper-size", value)
})
</script>

<template>
  <ResumeConfigsWrapper title="Resume Size" icon="i-heroicons-document-duplicate">
    <USelect
      v-model="paperSizeModel"
      :items="
        Object.entries(PAPER_SIZES).map(([key]) => ({
          value: key,
          label: key
        }))
      "
      placeholder="Select resume size"
      class="w-full"
    />
  </ResumeConfigsWrapper>
</template>
