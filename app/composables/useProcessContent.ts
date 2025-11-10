import type { TResumeState } from "~/stores/resume.store"
import { processContents, type ContentCacheEntry } from "~/utils/preview/core/contentComparator"
import type { TCoreSections } from "~/utils/schemas/content.schema"

function getOrCreateCacheContent(resumeTitle: string): ContentCacheEntry {
  const cacheKey = resumeTitle

  if (!contentCache.has(cacheKey)) {
    contentCache.set(cacheKey, {
      previousState: {} as TCoreSections
    })
  }

  return contentCache.get(cacheKey)!
}

const contentCache = new Map<string, ContentCacheEntry>()

export function useProcessContent(core: Ref<TResumeState["core"]>, title: Ref<TResumeState["title"]>) {
  function processContent() {
    const cache = getOrCreateCacheContent(title.value)

    const previewStore = usePreviewStore()
    const { contentLines } = storeToRefs(previewStore)
    const { setContentLines } = previewStore

    const processedContents = new Map(contentLines.value)

    processContents(core.value, cache, processedContents)

    if (processedContents.size > 0) {
      setContentLines(processedContents)
    }
  }

  watch([core, title], processContent, { deep: true, immediate: true })
}
