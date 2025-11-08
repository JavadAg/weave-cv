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

const resumeStore = useResumeStore()
const { core, title, personal } = storeToRefs(resumeStore)
const configsStore = useConfigsStore()
const { configs } = storeToRefs(configsStore)

const route = useRoute()
const id = computed(() => route.params.id as string)

const handleSave = async () => {
  emit("saving", true)
  try {
    await $fetch(`/api/resumes/${id.value}`, {
      method: "PUT",
      body: {
        title,
        content: {
          personal,
          core
        },
        configs
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
    variant="soft"
    size="lg"
    icon="i-lucide-save"
    class="transition-all duration-200 font-semibold rounded-xl"
    @click="handleSave"
  >
    <span class="hidden sm:inline">{{ props.saving ? "Saving..." : "Save" }}</span>
    <span class="sm:hidden">{{ props.saving ? "..." : "Save" }}</span>
  </UButton>
</template>
