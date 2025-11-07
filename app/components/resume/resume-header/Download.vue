<script setup lang="ts">
interface Props {
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false
})

const downloading = ref(false)
const resumeStore = useResumeStore()
const { title } = storeToRefs(resumeStore)
const configsStore = useConfigsStore()
const { configs } = storeToRefs(configsStore)

const handleDownload = async () => {
  if (props.disabled || downloading.value) return

  downloading.value = true

  const element = document.querySelector("#resumePages") as HTMLElement | null
  if (!element) {
    console.error("Resume preview not found")
    downloading.value = false
    return
  }

  try {
    // Clone the element to avoid modifying the original
    const clonedElement = element.cloneNode(true) as HTMLElement

    // Remove preview-only classes and styles that shouldn't appear in PDF
    const resumePages = clonedElement.querySelectorAll(".resumePage")
    for (const page of resumePages) {
      page.classList.remove("resumePage")
      // Remove any inline margin-bottom if present
      const pageEl = page as HTMLElement
      if (pageEl.style.marginBottom) {
        pageEl.style.marginBottom = ""
      }
    }

    // Get the cleaned HTML content
    const html = clonedElement.outerHTML

    // Get the paper format from configs
    const format = configs.value.general.layout.size

    // Call the PDF generation API
    const response = await $fetch<Blob>("/api/pdf", {
      method: "POST",
      body: {
        html,
        format
      },
      responseType: "blob"
    })

    // Create a download link
    const blob = new Blob([response], { type: "application/pdf" })
    const url = globalThis.URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${title.value || "resume"}.pdf`
    document.body.append(link)
    link.click()
    link.remove()
    globalThis.URL.revokeObjectURL(url)
  } catch (error) {
    console.error("Error generating PDF:", error)
  } finally {
    downloading.value = false
  }
}
</script>

<template>
  <UButton
    :disabled="props.disabled || downloading"
    color="secondary"
    variant="subtle"
    size="lg"
    :icon="downloading ? 'i-lucide-loader-2' : 'i-lucide-download'"
    :class="[
      'transition-all duration-200 hover:scale-105 hover:shadow-xl font-semibold rounded-xl',
      downloading && 'animate-pulse'
    ]"
    @click="handleDownload"
  >
    <span class="hidden sm:inline">{{ downloading ? "Generating..." : "Download" }}</span>
  </UButton>
</template>
