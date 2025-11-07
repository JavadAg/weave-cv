<script setup lang="ts">
import { PAPER_SIZES, type TPaperSize } from "~/constants/papers"

interface Emits {
  (e: "update:paper-size", value: TPaperSize): void
}

const props = defineProps<{
  paperSize: TPaperSize
}>()
const emit = defineEmits<Emits>()

const paperSizeModel = computed({
  get: () => props.paperSize,
  set: (value: TPaperSize) => emit("update:paper-size", value)
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
