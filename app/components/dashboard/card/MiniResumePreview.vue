<script setup lang="ts">
import type { TResume } from "~/types/resume.types"

interface Props {
  personal: TResume["content"]["personal"]
  core: TResume["content"]["core"]
  configs: TResume["configs"]
  resumeId: string
  resumeTitle?: string
}

const props = withDefaults(defineProps<Props>(), {
  resumeTitle: "Preview"
})

const accentColor = computed(() => props.configs.general.colors.primary.accentColor)
const bgColor = computed(() => props.configs.general.colors.primary.bgColor)
const textColor = computed(() => props.configs.general.colors.primary.textColor)

const visibleDetails = computed(() => {
  if (!props.personal?.details) return []
  return props.personal.details.filter((d) => d.value && !d.isHidden).slice(0, 3)
})

const summaryContent = computed(() => {
  const sections = Object.values(props.core || {})
  const summary = sections.find((s) => s.type === "summary" && s.isSectionVisible)
  if (summary?.contents && summary.contents.length > 0) {
    const firstContent = summary.contents.find((c) => !c.isHidden)
    if (firstContent?.description) {
      const htmlTagRegex = /<[^>]*>/g
      const text = firstContent.description.replaceAll(htmlTagRegex, "").trim()
      return text.length > 120 ? text.slice(0, 120) + "..." : text
    }
  }
  return null
})

const firstExperience = computed(() => {
  const sections = Object.values(props.core || {})
  const experience = sections.find((s) => (s.type === "experiences" || s.type === "educations") && s.isSectionVisible)
  if (experience?.contents && experience.contents.length > 0) {
    const firstContent = experience.contents.find((c) => !c.isHidden)
    return firstContent?.title || null
  }
  return null
})
</script>

<template>
  <div class="w-full min-h-[140px] flex flex-col rounded-md overflow-hidden shadow-sm">
    <div class="p-4 flex flex-col gap-2" :style="{ backgroundColor: bgColor, color: textColor }">
      <h3 class="text-lg font-bold m-0 leading-[1.2]" :style="{ color: accentColor }">
        {{ personal?.title || "Your Name" }}
      </h3>
      <p v-if="personal?.subtitle" class="text-sm m-0 opacity-90 leading-[1.3]">{{ personal.subtitle }}</p>
      <div v-if="visibleDetails.length > 0" class="flex flex-wrap gap-2 text-xs mt-1 opacity-80">
        <template v-for="(detail, index) in visibleDetails" :key="index">
          <span class="inline-flex items-center gap-2">{{ detail.value }}</span>
          <span v-if="index < visibleDetails.length - 1" class="ml-2 opacity-50">•</span>
        </template>
      </div>
    </div>
    <div class="flex-1 p-4 bg-white flex items-start">
      <div v-if="summaryContent" class="w-full">
        <p class="text-[13px] leading-6 text-gray-700 m-0 line-clamp-3">{{ summaryContent }}</p>
      </div>
      <div v-else-if="firstExperience" class="w-full">
        <p class="text-[13px] leading-6 text-gray-700 m-0 line-clamp-3">{{ firstExperience }}</p>
      </div>
      <div v-else class="w-full">
        <p class="text-[13px] leading-6 text-gray-700 m-0 italic">No content yet</p>
      </div>
    </div>
  </div>
</template>
