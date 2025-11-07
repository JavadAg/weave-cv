<script setup lang="ts">
import { computed } from "vue"
import DetailWrapper from "./DetailWrapper.vue"

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
      display: 'grid',
      gridTemplateColumns: detailItems.length === 1 ? '1fr' : detailItems.length === 2 ? '1fr 1fr' : '1fr 1fr 1fr',
      gridColumnGap: '1em'
    }"
  >
    <div
      v-for="(detailItem, index) in detailItems"
      :key="index"
      :style="{ display: 'flex', alignItems: 'center', justifyContent: 'center' }"
    >
      <DetailWrapper
        :url="detailItem?.url"
        :style="{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          paddingBottom: '0.5em',
          whiteSpace: 'nowrap'
        }"
      >
        {{ detailItem?.value }}
      </DetailWrapper>
    </div>
  </div>
</template>
