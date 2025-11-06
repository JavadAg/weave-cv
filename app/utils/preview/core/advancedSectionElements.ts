import { h } from "vue"
import ResumeAdvancedContentDescription from "~/components/resume/preview/advanced/description/ResumeAdvancedContentDescription.vue"
import ResumeAdvancedContentDetail from "~/components/resume/preview/advanced/detail/ResumeAdvancedContentDetail.vue"
import type { AdvancedSectionTypeSchema, TAdvancedContent, TCoreSection } from "~/utils/schemas/content.schema"
import type { TResumeElement } from "./types"

type AdvancedSectionType = (typeof AdvancedSectionTypeSchema.options)[number]

export function generateAdvancedSectionElements(sectionId: string, section: TCoreSection) {
  const { getContentLine, blocks, setBlock } = usePreviewStore()

  const sectionType = section.type as AdvancedSectionType

  const visibleContents = section.contents.filter((content) => content && !(content as { isHidden?: boolean }).isHidden)

  if (visibleContents.length === 0) {
    return
  }

  const elements: TResumeElement[] = []

  for (const content of visibleContents) {
    const contentId = content.id

    const detailElement = blocks.get(contentId) ?? {
      id: contentId,
      component: h(ResumeAdvancedContentDetail, {
        content: content as TAdvancedContent,
        sectionId,
        contentId,
        sectionType
      }),
      height: 0
    }

    setBlock(detailElement.id, detailElement)

    const descriptionElements = getContentLine(contentId).map((_, index) => {
      const descriptionId = `${content.id}-${index}`

      const descriptionElement = blocks.get(descriptionId) ?? {
        id: descriptionId,
        component: h(ResumeAdvancedContentDescription, {
          sectionId,
          descriptionId,
          index,
          contentId: content.id,
          sectionType
        }),
        height: 0
      }

      setBlock(descriptionId, descriptionElement)
      return descriptionElement
    })

    elements.push(detailElement, ...descriptionElements)
  }

  return elements
}
