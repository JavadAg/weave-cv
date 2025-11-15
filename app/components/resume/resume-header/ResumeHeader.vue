<script setup lang="ts">
import Download from "./Download.vue"
import Export from "./Export.vue"
import SaveChanges from "./SaveChanges.vue"

const saving = ref(false)

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
      <UInput
        v-model="titleModel"
        :minlength="3"
        :maxlength="50"
        placeholder="Resume Title"
        size="lg"
        icon="i-heroicons-document-text"
      >
        <template #trailing>
          <span class="text-xs text-muted">{{ titleModel.length }}/50</span>
        </template>
      </UInput>
    </div>
    <div class="flex items-center gap-3">
      <div class="flex items-center rounded-lg bg-elevated/50 p-1 gap-2 border border-muted shadow-sm backdrop-blur-sm">
        <SaveChanges :saving="saving" :disabled="saving" @saving="saving = $event" />
        <Download :disabled="saving" />
        <Export :disabled="saving" />
      </div>
    </div>
  </div>
</template>
