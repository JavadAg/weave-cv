<script setup lang="ts">
import { capitalize } from "vue"
import { DETAILS_CATALOG } from "~/utils/schemas/content.schema"

interface DetailConfig {
  label: string
  icon: string
  urlTemplate?: string
}

const { content, updateContent } = useResumeStore()

// Form state
const isAddingDetail = ref(false)
const form = reactive({
  type: "core" as keyof typeof DETAILS_CATALOG,
  key: "",
  value: ""
})

// Computed properties
const categoryOptions = computed(() =>
  Object.keys(DETAILS_CATALOG).map((key) => ({
    label: capitalize(key),
    value: key
  }))
)

const detailOptions = computed(() => {
  const catalog = DETAILS_CATALOG[form.type]
  return Object.entries(catalog).map(([key, config]) => ({
    label: config.label,
    value: key
  }))
})

const currentConfig = computed(() => {
  const catalog = DETAILS_CATALOG[form.type]
  return (catalog as Record<string, DetailConfig>)[form.key]
})

// Watchers
watch(
  () => form.type,
  (newType) => {
    const catalog = DETAILS_CATALOG[newType]
    const firstKey = Object.keys(catalog)[0]
    form.key = firstKey || ""
  },
  { immediate: true }
)

// Methods
const addDetail = () => {
  if (!form.value.trim() || !form.key || !currentConfig.value) return

  const { label, icon, urlTemplate } = currentConfig.value
  const url = urlTemplate?.replace("{value}", form.value)

  const newDetail = {
    value: form.value,
    isVisible: true,
    label,
    icon,
    url
  }

  const currentDetails = content.personal?.type === "personal" ? content.personal.data?.details || [] : []

  updateContent("personal.data.details", [...currentDetails, newDetail])
  closeForm()
}

const closeForm = () => {
  isAddingDetail.value = false
  resetForm()
}

const resetForm = () => {
  form.value = ""
  form.type = "core"
  form.key = ""
}
</script>

<template>
  <div class="flex items-center justify-between">
    <span class="text-sm font-medium text-default">Contact Details</span>
    <UButton variant="ghost" :disabled="isAddingDetail" size="sm" icon="i-lucide-plus" @click="isAddingDetail = true">
      Add Detail
    </UButton>
  </div>

  <div v-if="isAddingDetail" class="p-3 space-y-3 border border-muted rounded-lg">
    <div class="grid grid-cols-2 gap-2">
      <div class="flex flex-col gap-1.5">
        <span class="text-sm font-medium text-muted">Category</span>
        <USelect v-model="form.type" :items="categoryOptions" placeholder="Category" />
      </div>
      <div class="flex flex-col gap-1.5">
        <span class="text-sm font-medium text-muted">Detail Type</span>
        <USelect v-model="form.key" :items="detailOptions" placeholder="Detail Type" />
      </div>
    </div>

    <UInput v-model="form.value" class="w-full" placeholder="Enter value..." @keyup.enter="addDetail" />

    <div class="flex gap-2">
      <UButton size="sm" @click="addDetail">Add</UButton>
      <UButton variant="ghost" size="sm" @click="closeForm">Cancel</UButton>
    </div>
  </div>
</template>
