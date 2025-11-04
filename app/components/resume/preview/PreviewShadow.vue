<script setup lang="ts">
import { useConfigsStore } from "~/stores/configs.store"
import { generateSectionsOrder } from "~/utils/preview/core/layoutGenerator"
import RenderPages from "./pages/RenderPages.vue"

const configsStore = useConfigsStore()
const { configs } = storeToRefs(configsStore)

const resumeStore = useResumeStore()
const { core, title } = storeToRefs(resumeStore)

const sectionsOrder = computed(() => generateSectionsOrder(configs.value.general.layout))
const processedContentsRef = computed(() => useProcessContent(core.value, title.value))

const pages = useGeneratePages({
  sectionsOrder,
  processedContentsRef
})
</script>

<template>
  <RenderPages :pages="pages" />
</template>
