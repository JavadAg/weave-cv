import { h } from "vue"
import ResumeBasicSectionContent from "~/components/resume/preview/basic/ResumeBasicSectionContent.vue"
import type { BasicSectionTypeSchema } from "~/utils/schemas/content.schema"
import type { TResumeElement } from "./types"

type BasicSectionType = (typeof BasicSectionTypeSchema.options)[number]

export function generateBasicSectionElements(
  sectionId: string,
  section: { type: string; contents: unknown[] }
): TResumeElement | undefined {
  const hasVisibleContent = section.contents.some((content) => content && !(content as { isHidden?: boolean }).isHidden)

  if (!hasVisibleContent) {
    return undefined
  }

  const { blocks } = usePreviewStore()

  return (
    blocks.get(sectionId) ?? {
      id: sectionId,
      component: h(ResumeBasicSectionContent, {
        sectionId,
        sectionType: section.type as BasicSectionType
      }),
      height: 0
    }
  )
}
