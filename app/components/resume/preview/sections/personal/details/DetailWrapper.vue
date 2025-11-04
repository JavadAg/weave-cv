<script setup lang="ts">
import type { CSSProperties } from "vue"

interface Props {
  style: CSSProperties
  url?: string
}

const { style, url } = withDefaults(defineProps<Props>(), {
  url: undefined
})

const hasUrl = computed(() => url && url.trim() !== "")

const configsStore = useConfigsStore()
const { configs } = storeToRefs(configsStore)

const combinedStyle = computed<CSSProperties>(() => ({
  color: configs.value.general.colors.primary.textColor,
  minWidth: "0",
  ...style
}))
</script>

<template>
  <a v-if="hasUrl" :href="url" target="_blank" rel="noopener noreferrer" :style="combinedStyle">
    <slot />
  </a>
  <span v-else :style="combinedStyle">
    <slot />
  </span>
</template>
