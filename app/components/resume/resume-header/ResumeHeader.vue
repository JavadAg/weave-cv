<script setup lang="ts">
import Download from "./Download.vue"
import Export from "./Export.vue"
import SaveChanges from "./SaveChanges.vue"

interface Props {
  saving: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: "saving", value: boolean): void
}>()

const resumeStore = useResumeStore()
const { title } = storeToRefs(resumeStore)

const titleModel = computed({
  get: () => title.value,
  set: (v: string) => resumeStore.setTitle(v)
})
</script>

<template>
  <div class="relative flex items-center justify-between gap-4 p-4 rounded-xl bg-default">
    <UButton
      to="/dashboard"
      variant="ghost"
      color="neutral"
      size="lg"
      icon="i-lucide-arrow-left"
      class="hidden lg:flex"
    >
      <span class="hidden xl:inline">Dashboard</span>
    </UButton>
    <div class="flex-1 min-w-0">
      <UInput v-model="titleModel" placeholder="Resume Title" size="lg" icon="i-heroicons-document-text" />
    </div>
    <div class="flex items-center gap-3">
      <div class="flex items-center rounded-lg bg-elevated/50 p-1 gap-2 border border-muted shadow-sm backdrop-blur-sm">
        <SaveChanges :saving="props.saving" :disabled="props.saving" @saving="emit('saving', $event)" />
        <Download :disabled="props.saving" />
        <Export :disabled="props.saving" />
      </div>
    </div>
  </div>
</template>
