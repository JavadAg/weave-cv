<script setup lang="ts">
import { DEFAULT_CONFIGS } from "~/constants/default"
import type { TResume } from "~/types/resume.types"

interface Props {
  resume: TResume
}

const { resume } = defineProps<Props>()

const formatDate = (dateString: string | null) => {
  if (!dateString) return ""
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  })
}

const configs = computed(() => resume.configs || DEFAULT_CONFIGS)

const personal = computed(() => resume.content?.personal)
const visibleDetails = computed(() => {
  const details = personal.value?.details || []
  return details.filter((d) => !d.isHidden).slice(0, 3)
})

const accentColor = computed(() => {
  return configs.value.general.colors.primary.accentColor
})

const handleEdit = (id: string) => {
  navigateTo(`/editor/${id}`)
}
</script>
<template>
  <div class="space-y-3">
    <div
      class="min-h-36 max-h-40 cursor-pointer hover:border-primary duration-300 overflow-hidden bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
      @click="handleEdit(resume.id)"
    >
      <h4 class="text-base font-bold mb-1" :style="{ color: accentColor }">
        {{ personal?.title || "Your Name" }}
      </h4>
      <p class="text-sm text-gray-600 mb-2">
        {{ personal?.subtitle || "Your Job Title" }}
      </p>
      <div v-if="visibleDetails.length > 0" class="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500">
        <span v-for="(detail, idx) in visibleDetails" :key="idx">{{ detail.value }}</span>
      </div>
    </div>
    <div class="flex justify-between items-center text-xs text-muted">
      <span>Created {{ formatDate(resume.created_at) }}</span>
      <span v-if="resume.updated_at !== resume.created_at"> Updated {{ formatDate(resume.updated_at) }} </span>
    </div>
  </div>
</template>
