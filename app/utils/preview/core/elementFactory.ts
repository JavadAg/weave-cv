import SectionHeading from "~/components/resume/preview/sections/heading/SectionHeading.vue"
import SectionSpace from "~/components/resume/preview/sections/space/SectionSpace.vue"
import type { TResumeElement } from "~/utils/preview/core/types"

export const createHeadingElement = (sectionId: string): TResumeElement => {
  const { blocks } = usePreviewStore()

  return (
    blocks.get(`${sectionId}Heading`) ?? {
      id: `${sectionId}Heading`,
      component: h(SectionHeading, {
        sectionId,
        elementId: `${sectionId}Heading`
      }),
      height: 0
    }
  )
}

export const createBottomSpaceElement = (sectionId: string): TResumeElement => {
  const { blocks } = usePreviewStore()

  return (
    blocks.get(`${sectionId}Space`) ?? {
      id: `${sectionId}Space`,
      component: h(SectionSpace, {
        elementId: `${sectionId}Space`
      }),
      height: 0
    }
  )
}
