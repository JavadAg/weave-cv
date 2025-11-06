import type { TSectionsOrder } from "./layoutGenerator"
import { generateSectionElements } from "./sectionElements"
import type { TResumeElements } from "./types"

interface TwoColumnSection {
  left: string[]
  right: string[]
}

function isTwoColumnSection(section: unknown): section is TwoColumnSection {
  if (typeof section !== "object" || section === null) {
    return false
  }

  const candidate = section as Record<string, unknown>
  return "left" in candidate && "right" in candidate && Array.isArray(candidate.left) && Array.isArray(candidate.right)
}

function generateSingleColumnSectionElements(sectionId: string): TResumeElements[] {
  return generateSectionElements(sectionId)
}

function generateTwoColumnSectionElements(section: TwoColumnSection): TResumeElements {
  const leftElements = section.left.flatMap((sectionId) => generateSectionElements(sectionId))

  const rightElements = section.right.flatMap((sectionId) => generateSectionElements(sectionId))

  return {
    leftCol: leftElements,
    rightCol: rightElements
  }
}

export function generateElements(sectionsOrder: TSectionsOrder) {
  const pageElements: TResumeElements[] = []

  for (const section of sectionsOrder) {
    if (!section) {
      continue
    }

    if (typeof section === "string") {
      const sectionElements = generateSingleColumnSectionElements(section)
      pageElements.push(...sectionElements)
    } else if (isTwoColumnSection(section)) {
      const columnElement = generateTwoColumnSectionElements(section)
      pageElements.push(columnElement)
    }
  }

  return [pageElements]
}
