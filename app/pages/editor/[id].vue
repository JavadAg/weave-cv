<script setup lang="ts">
import { useRoute } from "vue-router"
import type { Tables } from "~/types/database.types"

const route = useRoute()

const saving = ref(false)
const id = computed(() => route.params.id as string)

const { setContent, setTitle } = useResumeStore()
const { configs, setConfigs } = useConfigsStore()

const { pending } = useFetch<Tables<"resumes">>(`/api/resumes/${id.value}`, {
  method: "GET",
  lazy: true
  /* onResponse: ({ response }) => {
    const data = response._data

    const parsedContent = ContentSchema.nullable().safeParse(data?.content ?? null)
    const parsedConfigs = ConfigsSchema.nullable().safeParse(data?.configs ?? null)

    if (parsedContent.success && parsedContent.data) {
      setContent(parsedContent.data)
    }
    if (parsedConfigs.success && parsedConfigs.data) {
      setConfigs(parsedConfigs.data)
    }
    setTitle(data?.title ?? "")
  } */
})

// load font family on mount
onMounted(() => {
  const fontFamily = configs.general.typography.fontFamily
  if (fontFamily) {
    loadLocalFont(fontFamily.toLowerCase())
  }
})
</script>

<template>
  <ClientOnly>
    <div class="w-full flex flex-col gap-4 max-h-[calc(100dvh-88px)] overflow-hidden">
      <ResumeHeader :saving="saving" @saving="saving = $event" />
      <div class="overflow-hidden">
        <SplitterGroup direction="horizontal" class="flex gap-1 h-full">
          <SplitterPanel :min-size="20" :default-size="30" :max-size="60">
            <ResumeContents />
          </SplitterPanel>
          <SplitterResizeHandle class="w-3 rounded-2xl bg-default/70 flex justify-center items-center">
            <UIcon name="i-lucide-grip-vertical" class="text-primary" />
          </SplitterResizeHandle>
          <SplitterPanel :min-size="20">
            <ResumePreview :loading="pending" />
          </SplitterPanel>
          <SplitterResizeHandle class="w-3 rounded-2xl bg-default/70 flex justify-center items-center">
            <UIcon name="i-lucide-grip-vertical" class="text-primary size-5" />
          </SplitterResizeHandle>
          <SplitterPanel :min-size="20" :default-size="20" :max-size="30">
            <ResumeConfigs />
          </SplitterPanel>
        </SplitterGroup>
      </div>
    </div>
  </ClientOnly>
</template>
