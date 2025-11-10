import type { TCoreSections } from "~/utils/schemas/content.schema"
import { processDescriptionContent } from "../html/contentParser"

interface ContentCacheEntry {
  previousState: TCoreSections
}

/**
 * Processes content sections and updates the store with processed fragments.
 * Uses cache to avoid re-processing unchanged content for performance.
 */
export function processContents(
  sections: TResumeState["core"],
  cache: ContentCacheEntry,
  processedContents: Map<string, string[]>
) {
  if (!sections) return

  const sectionKeys = Object.keys(sections)

  for (const sectionKey of sectionKeys) {
    if (!sections[sectionKey] || typeof sections[sectionKey] !== "object") continue

    const currentSection = sections[sectionKey] as TCoreSections[typeof sectionKey]
    const currentContents = currentSection.contents

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
        processedContents.set(currentContent.id, processDescriptionContent(currentContent.description))
      } else if (!processedContents.has(currentContent.id) && currentContent.description) {
        processedContents.set(currentContent.id, processDescriptionContent(currentContent.description))
      }
    }
  }
}

export type { ContentCacheEntry }
