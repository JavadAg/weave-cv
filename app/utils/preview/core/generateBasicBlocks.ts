import { h } from "vue"
import BasicBlock from "~/components/resume/preview/basic/BasicBlock.vue"
import type { BasicSectionTypeSchema } from "~/utils/schemas/content.schema"

type BasicSectionType = (typeof BasicSectionTypeSchema.options)[number]

export function generateBasicBlocks(sid: string, section: { type: string; contents: unknown[] }) {
  const hasVisibleContent = section.contents.some((content) => content && !(content as { isHidden?: boolean }).isHidden)

  if (!hasVisibleContent) {
    return
  }

  const { blocks } = usePreviewStore()

  return (
    blocks?.get(sid) ?? {
      id: sid,
      component: h(BasicBlock, {
        sid,
        sectionType: section.type as BasicSectionType
      }),
      height: 0
    }
  )
}
