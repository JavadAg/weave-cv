<script setup lang="ts">
import type { TBasicSectionConfigs } from "~/utils/schemas/configs/sectionsConfigs.schema"
import type { TBasicContent } from "~/utils/schemas/content.schema"
import BasicTitle from "./BasicTitle.vue"
import InfoHtml from "./InfoHtml.vue"

interface Props {
  contents: TBasicContent[]
  sectionConfigs: TBasicSectionConfigs
}

defineProps<Props>()

const configsStore = useConfigsStore()
const { configs } = storeToRefs(configsStore)

const layout = computed(() => configs.value.general.layout)
const spacingFactor = computed(() => layout.value.sectionGap)
const lineHeight = computed(
  () => configs.value.general.typography.lineHeight / configs.value.general.typography.fontSize
)
</script>

<template>
  <div :style="{ display: 'grid', gap: `${0.2 * spacingFactor * lineHeight}em` }">
    <div v-for="(content, index) in contents" :key="index">
      <BasicTitle :title="content.title" :url="content.url" :section-configs="sectionConfigs" />
      <InfoHtml v-if="content.description" :description="content.description" :section-configs="sectionConfigs" />
    </div>
  </div>
</template>
