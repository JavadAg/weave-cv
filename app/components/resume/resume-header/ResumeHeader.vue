<script setup lang="ts">
import Download from "./Download.vue"
import SaveChanges from "./SaveChanges.vue"

interface Props {
  saving: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: "saving", value: boolean): void
}>()

const { title } = useResumeStore()
</script>

<template>
  <div class="relative flex items-center justify-between gap-4 p-4 rounded-xl bg-default">
    <UButton
      to="/dashboard"
      variant="ghost"
      color="neutral"
      size="lg"
      icon="i-lucide-arrow-left"
      class="hidden lg:flex transition-all hover:scale-105 hover:bg-default/80 rounded-xl"
    >
      <span class="hidden xl:inline">Dashboard</span>
    </UButton>
    <div class="flex-1 min-w-0">
      <UInput v-model="title" placeholder="عنوان رزومه" size="lg" icon="i-heroicons-document-text" />
    </div>
    <div class="flex items-center gap-2">
      <SaveChanges :saving="props.saving" :disabled="props.saving" @saving="emit('saving', $event)" />
      <Download :disabled="props.saving" />
    </div>

    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="props.saving"
        class="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/90 text-primary-foreground shadow-lg backdrop-blur-sm"
      >
        <UIcon name="i-lucide-loader-2" class="size-4 animate-spin" />
        <span class="text-sm font-medium">Saving changes...</span>
      </div>
    </Transition>
  </div>
</template>
