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

export function useProcessContent(sections: Ref<TCoreSections>, resumeTitle: Ref<string>) {
  function processContent() {
    const cache = getOrCreateCacheContent(resumeTitle.value)
    const previewStore = usePreviewStore()

    const processedContents = new Map(previewStore.contentLines)
    processContents(sections.value, cache, processedContents)
    previewStore.setContentLines(processedContents)
  }

  watch([sections, resumeTitle], processContent, { deep: true, immediate: true })
}
