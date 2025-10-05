<script setup lang="ts">
interface Props {
  saving: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: "saving", value: boolean): void
}>()

const { content, title } = useResumeStore()

const route = useRoute()
const id = computed(() => route.params.id as string)

const handleSave = async () => {
  emit("saving", true)
  try {
    await $fetch(`/api/resumes/${id.value}`, {
      method: "PUT",
      body: {
        title,
        content
      }
    })
  } finally {
    emit("saving", false)
  }
}
</script>

<template>
  <div class="flex items-center justify-between gap-4">
    <UInput v-model="title" placeholder="عنوان رزومه" size="lg" class="font-medium" icon="i-heroicons-document-text" />

    <div class="flex items-center gap-3">
      <UButton
        to="/dashboard"
        variant="ghost"
        color="neutral"
        size="lg"
        icon="i-heroicons-arrow-left"
        class="hidden sm:flex"
      >
        Dashboard
      </UButton>
      <UButton
        :loading="props.saving"
        color="primary"
        variant="solid"
        size="lg"
        icon="i-heroicons-cloud-arrow-up"
        class="shadow-lg"
        @click="handleSave"
      >
        {{ props.saving ? "Saving..." : "Save" }}
      </UButton>
      <UButton
        :disabled="props.saving"
        color="success"
        variant="solid"
        size="lg"
        icon="i-heroicons-printer"
        class="shadow-lg"
      >
        Print
      </UButton>
    </div>
  </div>
</template>
