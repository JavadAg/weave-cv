<script setup lang="ts">
import { computed, ref } from "vue"
import { PAPER_SIZES } from "~/constants/papers"
import { useConfigsStore } from "~/stores/configs"
import { useResumeStore } from "~/stores/resume"
import { buildPreview } from "~/utils/preview/preview"

const host = ref<HTMLElement | null>(null)

const resumeStore = useResumeStore()
const { content } = storeToRefs(resumeStore)
const configsStore = useConfigsStore()
const { configs } = storeToRefs(configsStore)

const previewHtml = ref("")

watchDebounced(
  [() => content, () => configs],
  async () => {
    const { html, css } = await buildPreview(content.value, configs.value)
    const styleElement = document.createElement("style")
    styleElement.innerHTML = css
    document.head.append(styleElement)

    previewHtml.value = html
  },
  { debounce: 100, immediate: true, deep: true }
)

const marginsMM = computed(() => {
  const m = configs.value.general.layout.margins
  /* const bottomPx = Math.max(m.bottom - 10, 10) */
  return {
    top: m.top,
    bottom: m.bottom,
    left: m.left,
    right: m.right
  }
})

const layout = computed(() => {
  const cols = (configs.value.general.layout.columns === "2" ? 2 : 1) as 1 | 2
  const pos = (configs.value.general.layout.personalPosition || "top") as "top" | "left" | "right"
  return { columns: cols, personalPosition: pos, gapPx: configs.value.general.layout.sectionGap }
})

const pageSize = computed(() => {
  return PAPER_SIZES[configs.value.general.layout.size]
})

const sectionOrder = computed(() => {
  return configs.value.general.layout.order
})

useResumePagination(host, previewHtml, pageSize, marginsMM, layout, sectionOrder)
</script>

<template>
  <div ref="host" />
</template>
