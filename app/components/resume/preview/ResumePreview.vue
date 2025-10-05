<script setup lang="ts">
import ZoomComponent from "~/components/ZoomComponent.vue"
import { sizeToPx } from "~/constants/papers"

interface Props {
  loading: boolean
}

const { loading } = defineProps<Props>()

const scale = ref(1)
const zoom = ref<InstanceType<typeof ZoomComponent>>()
const container = ref<HTMLElement>()

const { width } = useElementSize(container)
const { configs } = useConfigsStore()

const fitWidth = () => {
  const newScale = width.value / sizeToPx(configs.general.layout.size, "w")
  scale.value = newScale
}

watch(width, fitWidth)
</script>
<template>
  <div ref="container" class="overflow-y-auto h-full hide-scrollbar">
    <ZoomComponent ref="zoom" :scale="scale">
      <ResumePreviewShadow v-if="!loading" />
      <div v-else class="h-full flex justify-center items-center">
        <UIcon name="i-lucide-eye" class="size-12 text-emerald-500 animate-pulse" />
        <p class="text-muted font-medium">Loading preview...</p>
      </div>
    </ZoomComponent>
  </div>
</template>
