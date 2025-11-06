<script setup lang="ts">
const props = defineProps<{
  elementId: string
}>()

const { updateHeight } = usePreviewStore()

const configsStore = useConfigsStore()
const { configs } = storeToRefs(configsStore)

const height = computed(() => {
  return `${configs.value.general.typography.lineHeight * configs.value.general.layout.sectionGap}px`
})

const { elementRef } = useSelfResizeObserver((height) => {
  updateHeight(props.elementId, height)
})
</script>
<template>
  <div ref="elementRef" :style="{ height }" />
</template>
