import { storeToRefs } from "pinia"
import { useResumeStore } from "~/stores/resume.store"
import { createBottomSpaceElement, createHeadingElement } from "~/utils/preview/core/elementFactory"
import { AdvancedSectionTypeSchema, BasicSectionTypeSchema } from "~/utils/schemas/content.schema"
import { generateAdvancedSectionElements } from "./advancedSectionElements"
import { generateBasicSectionElements } from "./basicSectionElements"
import type { TResumeElement } from "./types"

/**
 * Generates core elements (heading, content elements, bottom space) for a resume section.
 * Handles both advanced sections (with detail and description elements) and basic sections.
 */
export const generateCoreElements = (sectionId: string): TResumeElement[] | undefined => {
  const { setBlock } = usePreviewStore()

  const resumeStore = useResumeStore()
  const { core } = storeToRefs(resumeStore)
  const section = core.value[sectionId]

  if (!section) {
    return []
  }

  // Create heading and bottom space elements (common to all sections)
  const heading = createHeadingElement(sectionId)
  setBlock(heading.id, heading)

  const bottomSpace = createBottomSpaceElement(sectionId)
  setBlock(bottomSpace.id, bottomSpace)

  // Handle advanced sections (Experience, Education, Projects, etc.)
  if (AdvancedSectionTypeSchema.safeParse(section.type).success) {
    const contentElements = generateAdvancedSectionElements(sectionId, section)

    if (contentElements) {
      return [heading, ...contentElements, bottomSpace]
    }

    return [heading, bottomSpace]
  }

  // Handle basic sections (Skills, Languages, etc.)
  if (BasicSectionTypeSchema.safeParse(section.type).success) {
    const contentElement = generateBasicSectionElements(sectionId, section)

    if (contentElement) {
      setBlock(contentElement.id, contentElement)
      return [heading, contentElement, bottomSpace]
    }

    return [heading, bottomSpace]
  }

  return [heading, bottomSpace]
}
