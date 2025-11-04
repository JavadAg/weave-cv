<script setup lang="ts">
import type { TResumeElement, TResumeElements } from "~/utils/preview/core/types"
import RenderColumn from "./RenderColumn.vue"
import RenderContent from "./RenderContent.vue"
import RenderPage from "./RenderPage.vue"

interface Props {
  pages: Array<Array<TResumeElements>>
}

const props = defineProps<Props>()

const configsStore = useConfigsStore()
const { configs } = storeToRefs(configsStore)

const layout = computed(() => configs.value.general.layout)

const personalPosition = computed(() => layout.value.personalPosition)

const isTopPersonal = computed(() => personalPosition.value === "top")
const isSidePersonal = computed(() => personalPosition.value === "left" || personalPosition.value === "right")

const headerElement = computed<TResumeElement | null>(() => {
  if (isTopPersonal.value && props.pages[0]?.[0] && "id" in props.pages[0][0] && props.pages[0][0].id === "personal") {
    return props.pages[0].find((item) => "id" in item && item.id === "personal") as TResumeElement
  }

  return null
})
</script>
<template>
  <div id="resumePages">
    <RenderPage v-for="(page, pageIndex) in pages" :key="pageIndex">
      <template v-if="isTopPersonal && headerElement && pageIndex === 0 && 'component' in headerElement">
        <component :is="headerElement.component" />
      </template>

      <RenderContent :is-first-page="pageIndex === 0">
        <template v-for="(section, sectionIndex) in page" :key="sectionIndex">
          <template v-if="section && !(isTopPersonal && 'id' in section && section.id === 'personal')">
            <component :is="section.component" v-if="'id' in section && section.id" />
            <div
              v-else-if="'leftCol' in section && 'rightCol' in section && section.leftCol && section.rightCol"
              :style="{
                display: 'flex',
                width: '100%',
                flexGrow: isSidePersonal ? '1' : 'unset'
              }"
            >
              <RenderColumn side="left">
                <component :is="item.component" v-for="(item, itemIndex) in section.leftCol" :key="itemIndex" />
              </RenderColumn>
              <RenderColumn side="right">
                <component :is="item.component" v-for="(item, itemIndex) in section.rightCol" :key="itemIndex" />
              </RenderColumn>
            </div>
          </template>
        </template>
      </RenderContent>
    </RenderPage>
  </div>
</template>
