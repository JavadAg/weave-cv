<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, onUpdated, ref, watch } from "vue"
import DetailWrapper from "./DetailWrapper.vue"

interface Props {
  align: "left" | "center" | "right"
}
const props = defineProps<Props>()

const resumeStore = useResumeStore()
const { personal } = storeToRefs(resumeStore)

const configsStore = useConfigsStore()
const { configs } = storeToRefs(configsStore)

const separator = computed(() => configs.value.personal.details.separator)

const containerRef = ref<HTMLElement>()

const detailItems = computed(() => {
  return personal.value.details.filter((item) => item.value && !item.isHidden)
})

let resizeObserver: ResizeObserver | null = null

const adjustSeparatorVisibility = () => {
  const container = containerRef.value
  if (!container) return

  const children = [...container.children] as HTMLElement[]
  if (children.length === 0) return

  for (const child of children) {
    if (child.classList?.contains("separator")) {
      child.style.visibility = "visible"
      child.style.opacity = "1"
    }
  }

  const firstElement = children[0]
  if (!firstElement) return

  let previousTop = firstElement.offsetTop
  let previousElement = firstElement

  for (let i = 1; i < children.length; i++) {
    const currentElement = children[i]
    if (!currentElement) continue

    const currentTop = currentElement.offsetTop

    if (previousTop !== undefined && Math.abs(currentTop - previousTop) > 5) {
      if (previousElement?.classList?.contains("separator")) {
        previousElement.style.visibility = "hidden"
        previousElement.style.opacity = "0"
      }
      if (currentElement.classList?.contains("separator")) {
        currentElement.style.visibility = "hidden"
        currentElement.style.opacity = "0"
      }
    }

    previousTop = currentTop
    previousElement = currentElement
  }
}

const updateSeparators = () => {
  nextTick(() => {
    adjustSeparatorVisibility()
  })
}

const setupResizeObserver = () => {
  if (containerRef.value && !resizeObserver) {
    resizeObserver = new ResizeObserver(updateSeparators)
    resizeObserver.observe(containerRef.value)
    updateSeparators()
  }
}

onMounted(() => {
  setupResizeObserver()
})

watch(containerRef, (newContainer) => {
  if (newContainer && !resizeObserver) {
    setupResizeObserver()
  } else if (!newContainer && resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
})

watch(
  detailItems,
  () => {
    updateSeparators()
  },
  { deep: true }
)

onUpdated(() => {
  updateSeparators()
})

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
})
</script>

<template>
  <div
    ref="containerRef"
    :style="{ justifyContent: props.align, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }"
  >
    <template v-for="(detailItem, index) in detailItems" :key="`wrapper${index}`">
      <DetailWrapper
        :url="detailItem.url"
        :style="{
          display: 'flex',
          height: 'fit-content',
          paddingBottom: '0.5em'
        }"
      >
        {{ detailItem.value }}
      </DetailWrapper>
      <span
        v-if="index !== detailItems.length - 1"
        class="separator"
        :style="{
          paddingInline: '0.5em',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: '0.5em',
          height: 'fit-content',
          color: configs.general.colors.primary.textColor
        }"
      >
        <span v-if="separator === 'dot'">•</span>
        <span v-else-if="separator === 'pipe'">|</span>
        <span v-else-if="separator === 'dash'">-</span>
        <span v-else-if="separator === 'comma'">,</span>
        <span v-else-if="separator === 'slash'">/</span>
        <span v-else>{{ separator }}</span>
      </span>
    </template>
  </div>
</template>
