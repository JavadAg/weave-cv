import { ref, unref, watch, type ComputedRef, type Ref } from "vue"
import type { TSectionsOrder } from "~/utils/preview/core/layoutGenerator"
import { generateElements } from "~/utils/preview/core/pageOrchestrator"
import type { TResumeElements } from "~/utils/preview/core/types"
import { processPages } from "../utils/preview/core/pagination"

const DEBOUNCE_DELAY = 20

export function useGeneratePages(sectionsOrder: Ref<TSectionsOrder> | ComputedRef<TSectionsOrder>) {
  const resumeStore = useResumeStore()
  const { core, title } = storeToRefs(resumeStore)

  const pages = ref<TResumeElements[][]>([[]])

  const previewStore = usePreviewStore()

  const updatePages = () => {
    const elements = generateElements(unref(sectionsOrder))

    pages.value = processPages({
      blocks: previewStore.blocks,
      elements
    })
  }

  previewStore.setUpdateHeightCallback(useDebounceFn(updatePages, DEBOUNCE_DELAY))

  watch([() => unref(sectionsOrder), core, title], updatePages, { deep: true, immediate: true })

  return pages
}
