import type { TCoreSections } from "~/utils/schemas/content.schema"
import { processDescriptionContent } from "../html/contentParser"

interface ContentCacheEntry {
  previousState: TCoreSections
  processedContents: Record<string, string[]>
}

/**
 * Processes content sections and updates the cache with processed fragments
 */
export function processContents(sections: TCoreSections, cache: ContentCacheEntry) {
  const { processedContents } = cache
  const sectionKeys = Object.keys(sections)

  for (const sectionKey of sectionKeys) {
    const currentSection = sections[sectionKey]
    const currentContents = currentSection?.contents

    if (!currentContents?.length) {
      continue
    }

    for (const currentContent of currentContents) {
      if (!currentContent?.id) {
        continue
      }

      const previousContent = cache.previousState[sectionKey]?.contents?.find((e) => e?.id === currentContent.id)
      const descriptionChanged =
        typeof currentContent.description === "string" && previousContent?.description !== currentContent.description

      if (descriptionChanged) {
        processedContents[currentContent.id] = processDescriptionContent(currentContent.description)
      } else if (!processedContents[currentContent.id] && currentContent.description) {
        processedContents[currentContent.id] = processDescriptionContent(currentContent.description)
      }
    }
  }
}

export type { ContentCacheEntry }
