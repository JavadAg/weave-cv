<script setup lang="ts">
import { storeToRefs } from "pinia"
import { computed } from "vue"
import { useConfigsStore } from "~/stores/configs.store"
import { generateSectionsOrder } from "~/utils/preview/core/layoutGenerator"
import RenderPages from "./pages/RenderPages.vue"

const { configs } = useConfigsStore()
const resumeStore = useResumeStore()
const { core, title } = storeToRefs(resumeStore)

const sectionsOrder = computed(() => generateSectionsOrder(configs.general.layout))

useProcessContent(core, title)

const pages = useGeneratePages(sectionsOrder)
</script>

<template>
  <RenderPages :pages="pages" />
</template>
