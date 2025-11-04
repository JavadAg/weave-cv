<script setup lang="ts">
import { computed, onMounted, onUpdated, ref } from "vue"
import type { TPersonalConfigs } from "~/utils/schemas/configs/sectionsConfigs.schema"
import type { TPersonalContent } from "~/utils/schemas/content.schema"
import DetailWrapper from "./DetailWrapper.vue"

interface Props {
  personalDetails: TPersonalContent["details"]
  personalConfigs: TPersonalConfigs
  separator: TPersonalConfigs["details"]["separator"]
  icon: TPersonalConfigs["details"]["icon"]
  fontSize: number
  lineHeight: number
}

const {
  personalDetails,
  personalConfigs: _personalConfigs,
  separator,
  icon: _icon,
  fontSize: _fontSize,
  lineHeight
} = defineProps<Props>()

const containerRef = ref<HTMLElement>()

// Filter valid details
const detailItems = computed(() => {
  return personalDetails.filter((item) => item.value && !item.isHidden)
})

// Adjust delimiter visibility based on line wrapping
const adjustDelimiterVisibility = () => {
  const container = containerRef.value
  if (!container) return

  const childNodes = container.childNodes
  if (!childNodes?.length) return

  let currentTop = (childNodes[0] as HTMLElement).offsetTop
  let previousNode = childNodes[0]

  for (const node of childNodes) {
    const element = node as HTMLElement
    if (element.classList?.contains("delimiter")) {
      element.style.visibility = "visible"
      element.style.display = "flex"
    }

    if (Math.abs(element.offsetTop - currentTop) > 10) {
      currentTop = element.offsetTop
      if (element.classList?.contains("delimiter")) {
        element.style.display = "none"
      }
      if ((previousNode as HTMLElement).classList?.contains("delimiter")) {
        ;(previousNode as HTMLElement).style.visibility = "hidden"
      }
    }

    previousNode = node
  }
}

onMounted(() => {
  adjustDelimiterVisibility()
})

onUpdated(() => {
  adjustDelimiterVisibility()
})
</script>

<template>
  <div
    ref="containerRef"
    :style="{
      display: 'flex',
      flexWrap: 'wrap'
    }"
  >
    <template v-for="(detailItem, index) in detailItems" :key="`wrapper${index}`">
      <DetailWrapper
        :url="detailItem.url"
        :style="{
          display: 'flex',
          alignItems: 'center',
          paddingBottom: `${0.5 + 0.3 * lineHeight}em`
        }"
      >
        <div
          v-if="_icon.visible"
          :style="{
            marginRight: `${0.45 * lineHeight}em`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }"
        >
          <!-- Icon component would go here -->
          <div
            :style="{
              width: '16px',
              height: '16px',
              backgroundColor: '#ccc',
              borderRadius: '2px'
            }"
          />
        </div>
        <span
          :style="{
            display: 'flex',
            alignItems: 'center'
          }"
        >
          {{ detailItem.value }}
          <span style="font-size: 1px"> </span>
        </span>
      </DetailWrapper>
      <span
        v-if="index !== detailItems.length - 1"
        class="delimiter"
        :style="{
          padding: '0 0.7em 0 0.7em',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#000000'
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
