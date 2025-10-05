<script setup lang="ts">
import SectionTitle from "./SectionTitle.vue"

const props = withDefaults(
  defineProps<{
    id: string
    title: string
    isTitleEditable?: boolean
    isSectionHideable?: boolean
    isSectionVisible: boolean
    isTitleVisible: boolean
  }>(),
  {
    isTitleEditable: true,
    isSectionHideable: true
  }
)
</script>

<template>
  <UCollapsible class="grid group gap-2 bg-muted p-2 rounded-lg border border-muted/50">
    <UButton
      trailing-icon="i-lucide-chevron-down"
      :ui="{
        trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
      }"
      variant="ghost"
      class="text-base group p-0 w-full font-semibold flex items-center active:bg-inherit hover:bg-inherit text-default"
      block
    >
      {{ props.title }}
    </UButton>
    <template #content>
      <SectionTitle
        :id="props.id"
        :section-title="props.title"
        :is-title-editable="props.isTitleEditable"
        :is-section-hideable="props.isSectionHideable"
        :is-section-visible="props.isSectionVisible"
        :is-title-visible="props.isTitleVisible"
      />
      <slot />
    </template>
  </UCollapsible>
</template>
