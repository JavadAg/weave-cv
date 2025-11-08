<script setup lang="ts">
import { PAPER_SIZES } from "~/constants/papers"
import type { TResume } from "~/types/resume.types"

interface Template {
  id: string
  name: string
  description: string
  preview: string
  isBlank?: boolean
}

const templates: Template[] = [
  {
    id: "blank",
    name: "Blank Resume",
    description: "Start with a clean slate and build your resume from scratch",
    preview: "blank",
    isBlank: true
  },
  {
    id: "template-1",
    name: "Modern Professional",
    description: "A clean and modern design perfect for tech and creative roles",
    preview: "template-1"
  },
  {
    id: "template-2",
    name: "Classic Executive",
    description: "Traditional layout ideal for corporate and executive positions",
    preview: "template-2"
  },
  {
    id: "template-3",
    name: "Creative Portfolio",
    description: "Eye-catching design for creative professionals and designers",
    preview: "template-3"
  }
]

const modelValue = defineModel<boolean>({ default: false })
const selectedTemplate = ref<Template | null>(null)
const isCreating = ref(false)

const toast = useToast()

const emits = defineEmits<{
  created: [resume: TResume]
}>()

const handleTemplateSelect = (template: Template) => {
  selectedTemplate.value = template
}

const handleCreate = async () => {
  if (!selectedTemplate.value) return

  isCreating.value = true
  try {
    // For now, all templates create a blank resume
    // This can be extended later to load actual template data
    const newResume = await $fetch<TResume>("/api/resumes", {
      method: "POST",
      body: {
        title: "New Resume"
      }
    })

    if (!newResume?.id) {
      throw new Error("Resume was created but no ID was returned")
    }

    toast.add({
      title: "Success",
      description: "Resume created successfully",
      color: "success"
    })

    emits("created", newResume)
    modelValue.value = false
    selectedTemplate.value = null
  } catch (error) {
    console.error("Failed to create resume:", error)

    toast.add({
      title: "Error",
      description: error instanceof Error ? error.message : "An unexpected error occurred",
      color: "error"
    })
  } finally {
    isCreating.value = false
  }
}

const handleCancel = () => {
  modelValue.value = false
  selectedTemplate.value = null
}

watch(modelValue, (isOpen) => {
  if (!isOpen) {
    selectedTemplate.value = null
  }
})
</script>

<template>
  <UModal v-model:open="modelValue" :prevent-close="isCreating" class="max-w-7xl w-full mx-auto">
    <template #content>
      <UCard>
        <template #header>
          <div class="flex items-center gap-3">
            <div
              class="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center"
            >
              <UIcon name="i-lucide-file-text" class="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 class="text-lg font-semibold text-default">Choose a Template</h3>
              <p class="text-sm text-muted mt-1">Select a template to start building your resume</p>
            </div>
          </div>
        </template>

        <div class="py-2">
          <div class="flex flex-wrap items-start justify-start gap-4">
            <button
              v-for="template in templates"
              :key="template.id"
              type="button"
              :disabled="isCreating"
              :style="{ width: `${PAPER_SIZES['A4'].w * 0.3}mm`, height: `${PAPER_SIZES['A4'].h * 0.3}mm` }"
              :class="[
                'group relative flex flex-col items-center justify-between rounded-lg border-2 p-4 text-left transition-all duration-200 hover:shadow-lg',
                selectedTemplate?.id === template.id
                  ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                  : 'border-default/20 hover:border-primary/40 bg-default/50',
                isCreating && 'opacity-50 cursor-not-allowed'
              ]"
              @click="handleTemplateSelect(template)"
            >
              <div
                :class="[
                  'size-full rounded-md mb-3 flex items-center justify-center overflow-hidden',
                  template.isBlank
                    ? 'bg-muted border-2 border-dashed border-default/30'
                    : 'bg-gradient-to-br from-primary/20 to-primary/5'
                ]"
              >
                <div v-if="template.isBlank" class="text-center">
                  <UIcon name="i-lucide-file-plus" class="w-8 h-8 text-muted mx-auto mb-2" />
                  <p class="text-xs text-muted font-medium">Blank Template</p>
                </div>
                <div v-else class="text-center">
                  <UIcon name="i-lucide-layout-template" class="w-8 h-8 text-primary/60 mx-auto mb-2" />
                  <p class="text-xs text-primary/60 font-medium">Coming Soon</p>
                </div>
              </div>
              <div class="space-y-1">
                <div class="flex items-center gap-2">
                  <h4 class="font-semibold text-default">{{ template.name }}</h4>
                  <UIcon
                    v-if="selectedTemplate?.id === template.id"
                    name="i-lucide-check-circle"
                    class="w-4 h-4 text-primary"
                  />
                </div>
                <p class="text-sm text-muted line-clamp-2">{{ template.description }}</p>
              </div>
            </button>
          </div>

          <div v-if="!selectedTemplate" class="mt-4 p-3 rounded-lg bg-muted/50 border border-default/20">
            <p class="text-sm text-muted text-center">Please select a template to continue</p>
          </div>
        </div>

        <template #footer>
          <div class="flex justify-end gap-3">
            <UButton color="neutral" variant="ghost" :disabled="isCreating" @click="handleCancel"> Cancel </UButton>
            <UButton
              color="primary"
              :disabled="!selectedTemplate || isCreating"
              :loading="isCreating"
              @click="handleCreate"
            >
              Create Resume
            </UButton>
          </div>
        </template>
      </UCard>
    </template>
  </UModal>
</template>
