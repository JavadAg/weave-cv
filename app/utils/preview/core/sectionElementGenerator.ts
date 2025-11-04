import { storeToRefs } from "pinia"
import { computed, h, unref, type Ref } from "vue"
import ResumeAdvancedContentDescription from "~/components/resume/preview/advanced/description/ResumeAdvancedContentDescription.vue"
import ResumeAdvancedContentDetail from "~/components/resume/preview/advanced/detail/ResumeAdvancedContentDetail.vue"
import ResumeBasicSectionContent from "~/components/resume/preview/basic/ResumeBasicSectionContent.vue"
import { useConfigsStore } from "~/stores/configs.store"
import { useResumeStore } from "~/stores/resume.store"
import { createBottomSpaceElement, createHeadingElement } from "~/utils/preview/core/elementFactory"
import type { TLayout } from "~/utils/schemas/configs/generalConfigs.schema"
import type { TAdvancedSectionConfigs } from "~/utils/schemas/configs/sectionsConfigs.schema"
import {
  AdvancedSectionTypeSchema,
  BasicSectionTypeSchema,
  type TAdvancedContent
} from "~/utils/schemas/content.schema"
import type { TResumeElement } from "./types"

type AdvancedSectionType = (typeof AdvancedSectionTypeSchema.options)[number]
type BasicSectionType = (typeof BasicSectionTypeSchema.options)[number]

interface GenerateSectionElementsParams {
  sectionId: string
  resumeElementsRef: Ref<Record<string, TResumeElement>>
  processedContentsRef: Ref<Record<string, string[]>>
}

interface ContentFragmentSplit {
  contentFragmentsForEntry: string[]
  contentFragmentsForParagraphs: string[]
}

function calculateFragmentSplitIndex(
  columns: TLayout["columns"],
  variant: TAdvancedSectionConfigs["variant"],
  titleSubtitleVariant: TAdvancedSectionConfigs["titleSubtitleVariant"]
): number {
  if (columns === "2") {
    return 1
  }

  if (titleSubtitleVariant === "stacked") {
    return 1
  }

  if (variant === "contentFirst" || variant === "dateFirst") {
    return 2
  }

  return 1
}

export const splitContentFragments = (
  contentFragments: string[],
  columns: TLayout["columns"],
  sectionConfigs: TAdvancedSectionConfigs
): ContentFragmentSplit => {
  const { variant, titleSubtitleVariant } = sectionConfigs
  const splitIndex = calculateFragmentSplitIndex(columns, variant, titleSubtitleVariant)

  return {
    contentFragmentsForEntry: contentFragments.slice(0, splitIndex),
    contentFragmentsForParagraphs: contentFragments.slice(splitIndex)
  }
}

function createContentDetailElement(
  content: TAdvancedContent,
  sectionId: string,
  sectionType: AdvancedSectionType,
  processedContent: string[],
  isLastContent: boolean,
  resumeElementsRef: Ref<Record<string, TResumeElement>>
): TResumeElement {
  const contentId = content.id
  const resumeElements = unref(resumeElementsRef)

  return (
    resumeElements[contentId] ?? {
      id: contentId,
      component: h(ResumeAdvancedContentDetail, {
        content,
        sectionId,
        contentId,
        processedContent,
        sectionType,
        isLast: isLastContent
      }),
      height: 0,
      kind: "detail" as const
    }
  )
}

function createContentDescriptionElements(
  content: TAdvancedContent,
  sectionId: string,
  sectionType: AdvancedSectionType,
  processedContent: string[],
  descriptionFragments: string[],
  isLastContent: boolean,
  resumeElementsRef: Ref<Record<string, TResumeElement>>
): TResumeElement[] {
  const resumeElements = unref(resumeElementsRef)

  return descriptionFragments.map((_, fragmentIndex) => {
    const descriptionId = `${content.id}-${fragmentIndex}`

    const descriptionElement = resumeElements[descriptionId] ?? {
      id: descriptionId,
      component: h(ResumeAdvancedContentDescription, {
        content,
        sectionId,
        contentId: content.id,
        sectionType,
        processedContent,
        tagIndex: fragmentIndex,
        isLast: isLastContent
      }),
      height: 0,
      kind: "description" as const
    }

    resumeElementsRef.value[descriptionId] = descriptionElement
    return descriptionElement
  })
}

function generateAdvancedSectionElements(
  sectionId: string,
  section: { type: string; contents: unknown[] },
  resumeElementsRef: Ref<Record<string, TResumeElement>>,
  processedContentsRef: Ref<Record<string, string[]>>
): TResumeElement[] | undefined {
  const processedContents = unref(processedContentsRef)

  const { configs } = useConfigsStore()
  const sectionType = section.type as AdvancedSectionType

  // Filter visible contents
  const visibleContents = Array.isArray(section.contents)
    ? (section.contents.filter(
        (content) => content && !(content as { isHidden?: boolean }).isHidden
      ) as TAdvancedContent[])
    : []

  if (visibleContents.length === 0) {
    return undefined
  }

  const sectionConfigs = computed(() => configs[sectionType])
  const elements: TResumeElement[] = []

  for (const [index, content] of visibleContents.entries()) {
    const isLastContent = index === visibleContents.length - 1
    const contentId = content.id
    const processedContent = processedContents[contentId] ?? []

    const detailElement = createContentDetailElement(
      content,
      sectionId,
      sectionType,
      processedContent,
      isLastContent,
      resumeElementsRef
    )
    resumeElementsRef.value[contentId] = detailElement

    const { contentFragmentsForParagraphs } = splitContentFragments(
      processedContent,
      configs.general.layout.columns,
      sectionConfigs.value
    )

    const descriptionElements = createContentDescriptionElements(
      content,
      sectionId,
      sectionType,
      processedContent,
      contentFragmentsForParagraphs,
      isLastContent,
      resumeElementsRef
    )

    elements.push(detailElement, ...descriptionElements)
  }

  return elements
}

function generateBasicSectionElements(
  sectionId: string,
  section: { type: string; contents: unknown[] },
  resumeElements: Record<string, TResumeElement>
): TResumeElement | undefined {
  const hasVisibleContent = section.contents.some((content) => content && !(content as { isHidden?: boolean }).isHidden)

  if (!hasVisibleContent) {
    return undefined
  }

  const sectionType = section.type as BasicSectionType

  return (
    resumeElements[sectionId] ?? {
      id: sectionId,
      component: h(ResumeBasicSectionContent, {
        sectionId,
        sectionType
      }),
      height: 0,
      kind: "detail" as const
    }
  )
}

/**
 * Generates core elements (heading, content elements, bottom space) for a resume section.
 * Handles both advanced sections (with detail and description elements) and basic sections.
 */
export const generateCoreElements = (params: GenerateSectionElementsParams): TResumeElement[] | undefined => {
  const { sectionId, resumeElementsRef, processedContentsRef } = params
  const resumeElements = unref(resumeElementsRef)

  const resumeStore = useResumeStore()
  const { core } = storeToRefs(resumeStore)
  const section = core.value[sectionId]

  if (!section) {
    return []
  }

  // Create heading and bottom space elements (common to all sections)
  const heading = createHeadingElement(sectionId, resumeElementsRef)
  resumeElements[heading.id] = heading

  const bottomSpace = createBottomSpaceElement(sectionId, resumeElementsRef)
  resumeElements[bottomSpace.id] = bottomSpace

  // Handle advanced sections (Experience, Education, Projects, etc.)
  if (AdvancedSectionTypeSchema.safeParse(section.type).success) {
    const contentElements = generateAdvancedSectionElements(sectionId, section, resumeElementsRef, processedContentsRef)

    if (contentElements) {
      return [heading, ...contentElements, bottomSpace]
    }

    return [heading, bottomSpace]
  }

  // Handle basic sections (Skills, Languages, etc.)
  if (BasicSectionTypeSchema.safeParse(section.type).success) {
    const contentElement = generateBasicSectionElements(sectionId, section, resumeElements)

    if (contentElement) {
      resumeElementsRef.value[sectionId] = contentElement
      return [heading, contentElement, bottomSpace]
    }

    return [heading, bottomSpace]
  }

  return [heading, bottomSpace]
}
