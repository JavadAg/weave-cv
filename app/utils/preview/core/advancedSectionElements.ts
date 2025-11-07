import { h } from "vue"
import AdvancedLineBlock from "~/components/resume/preview/advanced/description/AdvancedLineBlock.vue"
import AdvancedDetailBlock from "~/components/resume/preview/advanced/detail/AdvancedDetailBlock.vue"
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
      component: h(AdvancedDetailBlock, {
        content: content as TAdvancedContent,
        sectionId,
        contentId,
        sectionType
      }),
      height: 0
    }

    setBlock(detailElement.id, detailElement)

    const lineBlocks = getContentLine(contentId).map((_, index) => {
      const lineId = `${content.id}-${index}`

      const lineBlock = blocks.get(lineId) ?? {
        id: lineId,
        component: h(AdvancedLineBlock, {
          sectionId,
          lineId,
          index,
          contentId: content.id,
          sectionType
        }),
        height: 0
      }

      setBlock(lineId, lineBlock)
      return lineBlock
    })

    elements.push(detailElement, ...lineBlocks)
  }

  return elements
}
