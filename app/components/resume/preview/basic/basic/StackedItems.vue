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
</script>

<template>
  <div class="grid gap-2">
    <div v-for="(content, index) in contents" :key="index">
      <BasicTitle :title="content.title" :url="content.url" :section-configs="sectionConfigs" />
      <InfoHtml v-if="content.description" :description="content.description" :section-configs="sectionConfigs" />
    </div>
  </div>
</template>
