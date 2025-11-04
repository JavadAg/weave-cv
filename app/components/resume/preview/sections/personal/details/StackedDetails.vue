<script setup lang="ts">
import { computed } from "vue"
import DetailWrapper from "./DetailWrapper.vue"

interface Props {
  align: "left" | "center" | "right"
}
const props = defineProps<Props>()

const resumeStore = useResumeStore()
const { personal } = storeToRefs(resumeStore)

const detailItems = computed(() => {
  return personal.value.details.map((item) => {
    if (!item.value || item.isHidden) return null

    return item
  })
})
</script>

<template>
  <div
    :style="{
      display: 'flex',
      flexDirection: 'column'
    }"
  >
    <DetailWrapper
      v-for="(detailItem, index) in detailItems"
      :key="index"
      :url="detailItem?.url"
      :style="{
        display: 'flex',
        paddingBottom: '0.5em',
        whiteSpace: 'nowrap'
      }"
    >
      <span
        :style="{
          display: 'flex',
          textAlign: props.align,
          justifyContent: props.align === 'center' ? 'center' : props.align === 'right' ? 'flex-end' : 'flex-start',
          overflowWrap: 'anywhere',
          width: '100%'
        }"
      >
        {{ detailItem?.value }}
      </span>
    </DetailWrapper>
  </div>
</template>
