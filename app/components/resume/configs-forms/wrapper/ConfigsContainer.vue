<script setup lang="ts">
import ConfigsHeader from "./ConfigsHeader.vue"

interface Props {
  title: string
  icon: string
}

const props = defineProps<Props>()

const isOpen = ref(false)
</script>

<template>
  <UCollapsible
    v-model:is-open="isOpen"
    class="gap-3 flex flex-col bg-muted p-2 rounded-lg border border-default/10 data-[state=open]:ring-2 duration-500 data-[state=open]:ring-primary/30"
  >
    <ConfigsHeader :title="props.title" :icon="props.icon" />
    <template #content>
      <div class="divide-y divide-muted/40 pt-1 [&>*]:py-2">
        <slot />
      </div>
    </template>
  </UCollapsible>
</template>
