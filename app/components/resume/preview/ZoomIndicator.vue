<script setup lang="ts">
interface Props {
  scale: number
}

const { scale } = defineProps<Props>()

const showZoomIndicator = ref(false)
const previousScale = ref<number | undefined>(undefined)
let hideTimeout: ReturnType<typeof setTimeout> | null = null

const zoomPercentage = computed(() => Math.round(scale * 100))

// Initialize previous scale on mount
onMounted(() => {
  previousScale.value = scale
})

watch(
  () => scale,
  (newScale) => {
    if (previousScale.value !== undefined && newScale !== previousScale.value) {
      showZoomIndicator.value = true

      if (hideTimeout) {
        clearTimeout(hideTimeout)
      }

      hideTimeout = setTimeout(() => {
        showZoomIndicator.value = false
      }, 2000)
    }

    previousScale.value = newScale
  }
)

onUnmounted(() => {
  if (hideTimeout) {
    clearTimeout(hideTimeout)
  }
})
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 scale-95 translate-y-2"
    enter-to-class="opacity-100 scale-100 translate-y-0"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100 scale-100 translate-y-0"
    leave-to-class="opacity-0 scale-95 translate-y-2"
  >
    <div
      v-if="showZoomIndicator"
      class="absolute bottom-4 right-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-default/95 backdrop-blur-sm border border-border shadow-lg"
    >
      <UIcon name="i-lucide-zoom-in" class="size-4 text-primary" />
      <span class="text-sm font-semibold text-foreground">{{ zoomPercentage }}%</span>
    </div>
  </Transition>
</template>
