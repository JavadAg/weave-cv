<script setup lang="ts">
import { computed, ref } from "vue"
import { useLinkConfigs } from "~/composables/useLinkConfigs"
import type { AdvancedSectionTypeSchema } from "~/utils/schemas/content.schema"
import RenderSubtitleWords from "./RenderSubtitleWords.vue"
import RenderTitleWords from "./RenderTitleWords.vue"

interface Props {
  title?: string
  subtitle?: string
  url?: string
  isInColumn: boolean
  sectionType: (typeof AdvancedSectionTypeSchema.options)[number]
}

const props = defineProps<Props>()

const containerRef = ref<HTMLDivElement>()

const configsStore = useConfigsStore()
const { configs } = storeToRefs(configsStore)

const sectionConfigs = computed(() => configs.value[props.sectionType])

const layout = computed(() => configs.value.general.layout)
const colors = computed(() => configs.value.general.colors)
const typography = computed(() => configs.value.general.typography)
const titleConfig = computed(() => layout.value.contentLayout.title)
const subtitleConfig = computed(() => layout.value.contentLayout.subtitle)

const titleFontSize = computed(() => typography.value.fontSize * titleConfig.value.fontSizeMultiplier)
const paddingBottom = computed(() => {
  return `${0.4 * typography.value.lineHeight * layout.value.sectionGap}px`
})

const containerStyles = computed(() => ({
  display: props.title || props.subtitle ? "inline-block" : "",
  paddingBottom: paddingBottom.value,
  color: colors.value.secondary.textColor
}))

const { isLink, linkAttributes, linkStyles } = useLinkConfigs(props.url)

const subTitleFirst = computed(() => sectionConfigs.value.subTitleFirst)
</script>

<template>
  <div ref="containerRef" :style="containerStyles">
    <component
      :is="isLink && subTitleFirst ? 'a' : 'span'"
      v-if="title"
      :style="isLink && subTitleFirst ? linkStyles : {}"
      v-bind="isLink && subTitleFirst ? linkAttributes : {}"
    >
      <RenderTitleWords
        :is-inline-layout="sectionConfigs.titleSubtitleVariant === 'inline'"
        :title-config="titleConfig"
        :title="title"
        :url="url"
        :is-link-icon-next-to-title="subTitleFirst"
      />
    </component>
    <span
      v-if="subtitle && sectionConfigs.titleSubtitleVariant === 'inline'"
      :style="{ fontSize: `${titleFontSize}pt` }"
      >,
    </span>
    <component
      :is="isLink && !subTitleFirst ? 'a' : 'span'"
      v-if="subtitle"
      :style="isLink && !subTitleFirst ? linkStyles : {}"
      v-bind="isLink && !subTitleFirst ? linkAttributes : {}"
    >
      <RenderSubtitleWords
        :subtitle="subtitle"
        :url="url"
        :subtitle-config="subtitleConfig"
        :is-link-icon-next-to-title="subTitleFirst"
      />
    </component>
  </div>
</template>
