<script setup lang="ts">
import ZoomComponent from "~/components/ZoomComponent.vue"
import { generateSectionsOrder } from "~/utils/preview/core/layoutGenerator"
import { sizeToPx } from "~/utils/preview/helpers"
import RenderPages from "./pages/RenderPages.vue"

interface Props {
  loading: boolean
  scale: number
}

const emit = defineEmits<{
  (e: "update:scale", value: number): void
}>()

const { loading, scale } = defineProps<Props>()

const zoom = ref<InstanceType<typeof ZoomComponent>>()
const container = ref<HTMLElement>()

const { width } = useElementSize(container)
const { configs } = useConfigsStore()

const resumeStore = useResumeStore()
const { core, title } = storeToRefs(resumeStore)

const sectionsOrder = computed(() => generateSectionsOrder(configs.general.layout))

useProcessContent(core, title)

const pages = useGeneratePages(sectionsOrder)

const fitWidth = () => {
  const newScale = width.value / sizeToPx(configs.general.layout.size, "w")
  emit("update:scale", newScale)
}

watch(width, fitWidth)
</script>
<template>
  <div ref="container" class="relative overflow-y-auto h-full hide-scrollbar">
    <ZoomComponent ref="zoom" :scale="scale">
      <RenderPages v-if="!loading" :pages="pages" />
      <div v-else class="h-full flex justify-center items-center">
        <UIcon name="i-lucide-eye" class="size-12 text-emerald-500 animate-pulse" />
        <p class="text-muted font-medium">Loading preview...</p>
      </div>
    </ZoomComponent>
  </div>
</template>
