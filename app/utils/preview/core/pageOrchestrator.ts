import type { Ref } from "vue"
import type { TSectionsOrder } from "./layoutGenerator"
import { generateSectionElements } from "./sectionElements"
import type { TResumeElement, TResumeElements } from "./types"

interface TwoColumnSection {
  left: string[]
  right: string[]
}

interface GenerateElementsProps {
  sectionsOrder: TSectionsOrder
  resumeElementsRef: Ref<Record<string, TResumeElement>>
  processedContentsRef: Ref<Record<string, string[]>>
}

function isTwoColumnSection(section: unknown): section is TwoColumnSection {
  if (typeof section !== "object" || section === null) {
    return false
  }

  const candidate = section as Record<string, unknown>
  return "left" in candidate && "right" in candidate && Array.isArray(candidate.left) && Array.isArray(candidate.right)
}

function generateSingleColumnSectionElements(
  sectionId: string,
  resumeElementsRef: Ref<Record<string, TResumeElement>>,
  processedContentsRef: Ref<Record<string, string[]>>
): TResumeElements[] {
  return generateSectionElements({
    sectionId,
    resumeElementsRef,
    processedContentsRef
  })
}

function generateTwoColumnSectionElements(
  section: TwoColumnSection,
  resumeElementsRef: Ref<Record<string, TResumeElement>>,
  processedContentsRef: Ref<Record<string, string[]>>
): TResumeElements {
  const leftElements = section.left.flatMap((sectionId) =>
    generateSectionElements({ sectionId, resumeElementsRef, processedContentsRef })
  )

  const rightElements = section.right.flatMap((sectionId) =>
    generateSectionElements({ sectionId, resumeElementsRef, processedContentsRef })
  )

  return {
    leftCol: leftElements,
    rightCol: rightElements
  }
}

export function generateElements({
  sectionsOrder,
  resumeElementsRef,
  processedContentsRef
}: GenerateElementsProps): Array<Array<TResumeElements>> {
  const pageElements: TResumeElements[] = []

  for (const section of sectionsOrder) {
    if (!section) {
      continue
    }

    if (typeof section === "string") {
      const sectionElements = generateSingleColumnSectionElements(section, resumeElementsRef, processedContentsRef)
      pageElements.push(...sectionElements)
    } else if (isTwoColumnSection(section)) {
      const columnElement = generateTwoColumnSectionElements(section, resumeElementsRef, processedContentsRef)
      pageElements.push(columnElement)
    }
  }

  return [pageElements]
}
