import { processContents, type ContentCacheEntry } from "~/utils/preview/core/contentComparator"
import type { TCoreSections } from "~/utils/schemas/content.schema"

function getOrCreateCacheContent(resumeTitle: string): ContentCacheEntry {
  const cacheKey = resumeTitle

  if (!contentCache.has(cacheKey)) {
    contentCache.set(cacheKey, {
      previousState: {} as TCoreSections,
      processedContents: {}
    })
  }

  return contentCache.get(cacheKey)!
}

const contentCache = new Map<string, ContentCacheEntry>()

export function useProcessContent(sections: TCoreSections, resumeTitle: string) {
  const cache = getOrCreateCacheContent(resumeTitle)

  processContents(sections, cache)

  cache.previousState = sections

  return cache.processedContents
}
