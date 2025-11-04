<script setup lang="ts">
import { computed } from "vue"
import { useHtmlTransformers } from "~/composables/useHtmlTransformers"
import { convertHtmlToVNodes } from "~/utils/preview/core/html"

interface Props {
  html: string
  isProfileSection?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isProfileSection: false
})

const configsStore = useConfigsStore()
const { configs } = storeToRefs(configsStore)

const contentLayout = computed(() => configs.value.general.layout.contentLayout)

const htmlTransformers = computed(() => useHtmlTransformers())

const vNodes = computed(() => {
  return props.html ? convertHtmlToVNodes(props.html, htmlTransformers.value) : []
})

const hasIndentation = computed(() => !props.isProfileSection && contentLayout.value.indent > 0)
const paddingLeft = computed(() => (hasIndentation.value ? `${contentLayout.value.indent}px` : undefined))

const containerStyles = computed(() => ({
  width: "100%",
  paddingLeft: paddingLeft.value,
  whiteSpace: "pre-wrap" as const,
  wordBreak: "break-word" as const
}))
</script>

<template>
  <div :style="containerStyles">
    <component :is="vNode" v-for="(vNode, index) in vNodes" :key="index" />
  </div>
</template>
