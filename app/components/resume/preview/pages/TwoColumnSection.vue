<script setup lang="ts">
import type { TBlock } from "~/utils/preview/core/types"
import RenderColumn from "./RenderColumn.vue"

interface Props {
  left: TBlock[]
  right: TBlock[]
  isTopPersonal: boolean
}

defineProps<Props>()
</script>

<template>
  <div class="flex h-full">
    <RenderColumn side="left">
      <component :is="item.component" v-for="(item, itemIndex) in left" :key="itemIndex" />
    </RenderColumn>
    <RenderColumn side="right">
      <component :is="item.component" v-for="(item, itemIndex) in right" :key="itemIndex" />
    </RenderColumn>
  </div>
</template>
