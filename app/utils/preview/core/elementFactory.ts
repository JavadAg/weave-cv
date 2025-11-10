import SectionHeading from "~/components/resume/preview/sections/heading/SectionHeading.vue"
import SectionSpace from "~/components/resume/preview/sections/space/SectionSpace.vue"
import type { TBlock } from "~/utils/preview/core/types"

export const generateHeadingBlock = (sid: string): TBlock => {
  const { blocks } = usePreviewStore()

  return (
    blocks?.get(`${sid}Heading`) ?? {
      id: `${sid}Heading`,
      component: h(SectionHeading, {
        sid,
        elementId: `${sid}Heading`
      }),
      height: 0
    }
  )
}

export const generateBottomSpaceBlock = (sid: string): TBlock => {
  const { blocks } = usePreviewStore()

  return (
    blocks?.get(`${sid}Space`) ?? {
      id: `${sid}Space`,
      component: h(SectionSpace, {
        elementId: `${sid}Space`
      }),
      height: 0
    }
  )
}
