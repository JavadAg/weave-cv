<script setup lang="ts">
import type { Tables } from "~/types/database.types"

interface Props {
  saving: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false
})

const toast = useToast()

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
    const { status, error } = await useFetch<Tables<"resumes">>(`/api/resumes/${id.value}`, {
      method: "PUT",
      body: {
        title: title.value,
        content: {
          personal: personal.value,
          core: core.value
        },
        configs: configs.value
      }
    })

    if (status.value === "error") {
      console.error(error.value)
      toast.add({
        title: "Error",
        description: error.value?.statusMessage || "An error occurred while saving changes",
        color: "error"
      })
    }

    if (status.value === "success") {
      toast.add({
        title: "Success",
        description: "Changes saved successfully",
        color: "success"
      })
    }
  } finally {
    emit("saving", false)
  }
}
</script>

<template>
  <UButton
    :loading="props.saving"
    :disabled="props.saving || props.disabled"
    color="primary"
    variant="solid"
    size="lg"
    icon="i-lucide-save"
    :class="[props.saving || props.disabled ? 'opacity-70 cursor-not-allowed' : '']"
    @click="handleSave"
  >
    <span class="hidden sm:inline">{{ props.saving ? "Saving..." : "Save Changes" }}</span>
    <span class="sm:hidden">{{ props.saving ? "Saving..." : "Save" }}</span>
  </UButton>
</template>
