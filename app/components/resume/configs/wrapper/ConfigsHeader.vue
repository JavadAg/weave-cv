<script setup lang="ts">
interface Props {
  title: string
  icon: string
}

const props = defineProps<Props>()
</script>

<template>
  <UButton
    trailing-icon="i-lucide-chevron-down"
    :ui="{
      trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
    }"
    :icon="props.icon"
    variant="ghost"
    class="text-sm group p-0 shadow-none w-full font-semibold flex items-center active:bg-inherit hover:bg-inherit text-default"
    block
  >
    {{ props.title }}
  </UButton>
</template>
