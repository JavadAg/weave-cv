<script setup lang="ts">
import type { TResumeElement } from "~/utils/preview/core/types"
import RenderColumn from "./RenderColumn.vue"

interface Props {
  leftCol: TResumeElement[]
  rightCol: TResumeElement[]
  isTopPersonal: boolean
}

defineProps<Props>()
</script>

<template>
  <div class="flex">
    <RenderColumn side="left">
      <component :is="item.component" v-for="(item, itemIndex) in leftCol" :key="itemIndex" />
    </RenderColumn>
    <RenderColumn side="right">
      <component :is="item.component" v-for="(item, itemIndex) in rightCol" :key="itemIndex" />
    </RenderColumn>
  </div>
</template>
