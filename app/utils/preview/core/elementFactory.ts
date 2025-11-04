import type { Ref } from "vue"
import { h } from "vue"
import SectionHeading from "~/components/resume/preview/sections/heading/SectionHeading.vue"
import SectionSpace from "~/components/resume/preview/sections/space/SectionSpace.vue"
import type { ResumeElementKind, TResumeElement } from "~/utils/preview/core/types"

type ElementFactoryConfig = {
  idSuffix: string
  component: Parameters<typeof h>[0]
  kind: ResumeElementKind
  getProps: (elementId: string, sectionId?: string) => Record<string, unknown>
}

const createElement = (
  sectionId: string,
  config: ElementFactoryConfig,
  resumeElements: Ref<Record<string, TResumeElement>>
): TResumeElement => {
  const id = `${sectionId}${config.idSuffix}`
  const props = config.getProps(id, sectionId)
  const component = h(config.component, props)

  return (
    resumeElements.value[id] ?? {
      id,
      component,
      height: 0,
      kind: config.kind
    }
  )
}

export const createHeadingElement = (
  sectionId: string,
  resumeElements: Ref<Record<string, TResumeElement>>
): TResumeElement => {
  return createElement(
    sectionId,
    {
      idSuffix: "Heading",
      component: SectionHeading,
      kind: "heading",
      getProps: (elementId, sectionId) => ({
        sectionId,
        elementId
      })
    },
    resumeElements
  )
}

export const createBottomSpaceElement = (
  sectionId: string,
  resumeElements: Ref<Record<string, TResumeElement>>
): TResumeElement => {
  return createElement(
    sectionId,
    {
      idSuffix: "Space",
      component: SectionSpace,
      kind: "space",
      getProps: (elementId) => ({
        elementId
      })
    },
    resumeElements
  )
}
