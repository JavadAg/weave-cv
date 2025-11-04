<script setup lang="ts">
import { useRoute } from "vue-router"
import ResumeConfigs from "~/components/resume/configs-forms/ResumeConfigsForms.vue"
import ResumeSectionsForms from "~/components/resume/sections-forms/ResumeSectionsForms.vue"
import type { Tables } from "~/types/database.types"
import { loadLocalFont } from "~/utils/preview/core/fontUtils"

const route = useRoute()

const saving = ref(false)
const id = computed(() => route.params.id as string)

const { setContent, setTitle } = useResumeStore()
const { configs, setConfigs } = useConfigsStore()

const { pending } = useFetch<Tables<"resumes">>(`/api/resumes/${id.value}`, {
  method: "GET",
  lazy: true,
  onResponse: ({ response }) => {
    /* const data = response._data

    const { personal, ...core } = data?.content as { personal: TPersonalContent; core: TCoreSections }

    const parsedCore = CoreSectionsSchema.nullable().safeParse(core ?? null)
    const parsedPersonal = PersonalContentSchema.nullable().safeParse(personal ?? null)
    const parsedConfigs = ConfigsSchema.nullable().safeParse(data?.configs ?? null)

    if (parsedCore.success && parsedPersonal.success && parsedCore.data && parsedPersonal.data) {
      setContent({ personal: parsedPersonal.data, core: parsedCore.data })
    }
    if (parsedConfigs.success && parsedConfigs.data) {
      setConfigs(parsedConfigs.data)
    }
    setTitle(data?.title ?? "") */
  }
})

// load font family on mount
onMounted(() => {
  const fontFamily = configs.general.typography.fontFamily
  if (fontFamily) {
    loadLocalFont(fontFamily.toLowerCase())
  }
})

const scale = ref(1)
</script>

<template>
  <ClientOnly>
    <div class="w-full flex flex-col gap-4 max-h-[calc(100dvh-88px)] overflow-hidden">
      <ResumeHeader :saving="saving" :scale="scale" @saving="saving = $event" @update:scale="scale = $event" />
      <div class="overflow-hidden">
        <SplitterGroup direction="horizontal" class="flex gap-1 h-full">
          <SplitterPanel :min-size="20" :default-size="25" :max-size="35">
            <ResumeSectionsForms />
          </SplitterPanel>
          <SplitterResizeHandle class="w-3 rounded-2xl bg-default/70 flex justify-center items-center">
            <UIcon name="i-lucide-grip-vertical" class="text-primary" />
          </SplitterResizeHandle>
          <SplitterPanel :min-size="20">
            <ResumePreview :loading="pending" :scale="scale" @update:scale="scale = $event" />
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
