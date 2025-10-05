<script setup lang="ts">
const props = defineProps<{
  isVisible: boolean
  value: string
  onUpdate: (value: string) => void
  class?: string
}>()

const isEditing = ref(false)
const localValue = ref(props.value)

const handleUpdate = (value: string) => {
  if (props.value === value) {
    isEditing.value = false
    return
  }
  props.onUpdate(value)
  isEditing.value = false
}

const handleEdit = () => {
  if (isEditing.value) {
    handleUpdate(localValue.value)
    return
  }
  isEditing.value = true
}
</script>

<template>
  <div :class="['flex items-center gap-2 duration-200', props.isVisible ? 'opacity-100' : 'opacity-50']">
    <UInput v-if="isEditing" v-model="localValue" size="sm" />
    <div v-else :class="props.class" v-html="localValue"></div>
    <UButton
      v-if="props.isVisible"
      variant="subtle"
      size="sm"
      :icon="isEditing ? 'i-lucide-check' : 'i-lucide-pencil'"
      @click="handleEdit"
    />
  </div>
</template>
