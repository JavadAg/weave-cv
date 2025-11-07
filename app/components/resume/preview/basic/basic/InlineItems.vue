<script setup lang="ts">
import { computed } from "vue"
import type { TBasicSectionConfigs } from "~/utils/schemas/configs/sectionsConfigs.schema"
import type { TBasicContent } from "~/utils/schemas/content.schema"
import type { TSeparator } from "~/utils/schemas/shared.schema"
import BasicTitle from "./BasicTitle.vue"
import InfoHtml from "./InfoHtml.vue"

interface Props {
  contents: TBasicContent[]
  sectionConfigs: TBasicSectionConfigs
}

const props = defineProps<Props>()

const separator = computed(() => props.sectionConfigs.separator)

const getSeparator = (separator: TSeparator) => {
  switch (separator) {
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
  <template v-for="(content, index) in contents" :key="index">
    <BasicTitle :title="content.title" :url="content.url" :section-configs="sectionConfigs" />
    <InfoHtml v-if="content.description" :description="content.description" :section-configs="sectionConfigs" />
    <span
      v-if="index !== contents.length - 1"
      :style="{ paddingInline: '0.5em', display: 'inline-block', verticalAlign: 'middle' }"
    >
      <span
        :style="{
          height: '1ch',
          marginBottom: '0.3em',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }"
      >
        {{ getSeparator(separator) }}
      </span>
    </span>
  </template>
</template>
