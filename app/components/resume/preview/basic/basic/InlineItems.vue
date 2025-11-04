<script setup lang="ts">
import { computed } from "vue"
import type { TBasicSectionConfigs } from "~/utils/schemas/configs/sectionsConfigs.schema"
import type { TBasicContent } from "~/utils/schemas/content.schema"
import BasicTitle from "./BasicTitle.vue"
import InfoHtml from "./InfoHtml.vue"

interface Props {
  contents: TBasicContent[]
  sectionConfigs: TBasicSectionConfigs
}

const props = defineProps<Props>()

const delimiter = computed(() => props.sectionConfigs.separator)

const getDelimiterContent = (delimiterType: string) => {
  switch (delimiterType) {
    case "pipe": {
      return "|"
    }
    case "dash": {
      return "—"
    }
    case "slash": {
      return "/"
    }
    case "dot": {
      return "•"
    }
    case "comma": {
      return ","
    }
    case "none": {
      return null
    }
    default: {
      return ","
    }
  }
}
</script>

<template>
  <span v-for="(content, index) in contents" :key="index">
    <BasicTitle :title="content.title" :url="content.url" :section-configs="sectionConfigs" />
    <InfoHtml v-if="content.description" :description="content.description" :section-configs="sectionConfigs" />
    <span v-if="index !== contents.length - 1" class="px-1 inline-block align-middle">
      <span class="flex items-center justify-center" style="height: 1ch; margin-bottom: 0.3em">
        {{ getDelimiterContent(delimiter) }}
      </span>
    </span>
  </span>
</template>
