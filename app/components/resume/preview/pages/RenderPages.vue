<script setup lang="ts">
import { findPersonalElement, isTwoColumnSection, shouldRenderSection } from "~/utils/preview/core/pageRenderUtils"
import type { TBlocks } from "~/utils/preview/core/types"
import RenderContent from "./RenderContent.vue"
import RenderPage from "./RenderPage.vue"
import TwoColumnSection from "./TwoColumnSection.vue"

interface Props {
  pages: Array<Array<TBlocks>>
}

const props = defineProps<Props>()

const configsStore = useConfigsStore()
const { configs } = storeToRefs(configsStore)

const isTopPersonal = computed(() => configs.value.general.layout.personalPosition === "top")
const personalHeader = computed(() =>
  isTopPersonal.value && props.pages[0] ? findPersonalElement(props.pages[0]) : null
)
</script>

<template>
  <div id="resumePages">
    <RenderPage v-for="(page, pageIndex) in pages" :key="pageIndex">
      <component :is="personalHeader!.component" v-if="personalHeader && pageIndex === 0" />
      <RenderContent :is-first-page="pageIndex === 0">
        <template v-for="(section, sectionIndex) in page" :key="sectionIndex">
          <template v-if="shouldRenderSection(section, isTopPersonal, pageIndex === 0)">
            <component :is="section.component" v-if="'id' in section && 'component' in section" />
            <TwoColumnSection
              v-else-if="isTwoColumnSection(section)"
              :left="section.left"
              :right="section.right"
              :is-top-personal="isTopPersonal"
            />
          </template>
        </template>
      </RenderContent>
    </RenderPage>
  </div>
</template>
