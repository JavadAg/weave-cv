<script setup lang="ts">
interface Props {
  saving: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false
})

const emit = defineEmits<{
  (e: "saving", value: boolean): void
}>()

const { core, title, personal } = useResumeStore()

const route = useRoute()
const id = computed(() => route.params.id as string)

const handleSave = async () => {
  emit("saving", true)
  try {
    await $fetch(`/api/resumes/${id.value}`, {
      method: "PUT",
      body: {
        title,
        core,
        personal
      }
    })
  } finally {
    emit("saving", false)
  }
}
</script>

<template>
  <UButton
    :loading="props.saving"
    :disabled="props.saving || props.disabled"
    variant="subtle"
    size="lg"
    icon="i-lucide-save"
    class="transition-all duration-200 hover:scale-105 hover:shadow-xl font-semibold rounded-xl"
    @click="handleSave"
  >
    <span class="hidden sm:inline">{{ props.saving ? "Saving..." : "Save" }}</span>
    <span class="sm:hidden">{{ props.saving ? "..." : "Save" }}</span>
  </UButton>
</template>
