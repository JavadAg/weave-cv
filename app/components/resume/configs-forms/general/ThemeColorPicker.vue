<script setup lang="ts">
import { computed } from "vue"
import { PRESET_COLORS } from "~/constants/colors"

interface Emits {
  (e: "update:color", value: string): void
}

const props = defineProps<{
  color: string
}>()
const emit = defineEmits<Emits>()

const colorModel = computed({
  get: () => props.color,
  set: (value: string) => emit("update:color", value)
})
</script>

<template>
  <ResumeConfigsWrapper title="Theme Color" icon="i-lucide-palette">
    <div class="flex flex-col gap-2">
      <span class="text-xs">Preset Colors</span>
      <div class="flex items-center flex-wrap justify-between">
        <button
          v-for="c in PRESET_COLORS"
          :key="c"
          :class="[
            'size-6 shrink-0 rounded-full cursor-pointer transition-all hover:scale-110 ',
            colorModel === c ? 'ring-2 ring-offset-1 ring-muted' : ''
          ]"
          :style="{ backgroundColor: c }"
          :title="c"
          @click="colorModel = c"
        />
      </div>
    </div>

    <UPopover>
      <UButton :label="colorModel" color="neutral" variant="subtle" class="w-full">
        <template #leading>
          <span :style="{ backgroundColor: colorModel }" class="size-5 rounded-full" />
        </template>
      </UButton>

      <template #content>
        <UColorPicker v-model="colorModel" :throttle="50" class="p-2" />
      </template>
    </UPopover>
  </ResumeConfigsWrapper>
</template>
