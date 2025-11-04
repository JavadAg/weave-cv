<script setup lang="ts">
import type { CSSProperties } from "vue"
import { useLinkConfigs } from "~/composables/useLinkConfigs"

interface Props {
  url?: string
  style?: CSSProperties
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  url: undefined,
  class: ""
})

const { isLink, linkAttributes, linkStyles } = useLinkConfigs(props.url)

const combinedStyle = computed<CSSProperties>(() => ({
  overflowWrap: "break-word",
  ...props.style,
  ...(isLink.value ? linkStyles.value : {})
}))
</script>

<template>
  <a v-if="isLink" v-bind="linkAttributes" :style="combinedStyle" :class="props.class">
    <slot />
  </a>
  <span v-else :style="combinedStyle" :class="props.class">
    <slot />
  </span>
</template>
