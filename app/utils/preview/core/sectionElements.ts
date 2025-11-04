import type { Ref } from "vue"
import { h } from "vue"
import RenderPersonal from "~/components/resume/preview/sections/personal/RenderPersonal.vue"
import PersonalSpace from "~/components/resume/preview/sections/PersonalSpace.vue"
import type { OTHER_SECTION_TYPES } from "~/constants/sectionTypes"
import { generateCoreElements } from "./sectionElementGenerator"
import type { ResumeElementKind, TResumeElement } from "./types"

interface IGenerateSectionElementsProps {
  sectionId: string
  resumeElementsRef: Ref<Record<string, TResumeElement>>
  processedContentsRef: Ref<Record<string, string[]>>
}

type SimpleSectionConfig = {
  id: string
  component: Parameters<typeof h>[0]
  kind: ResumeElementKind
}

const OTHER_SECTIONS: Record<(typeof OTHER_SECTION_TYPES)[number], TResumeElement> = {
  personal: {
    id: "personal",
    component: RenderPersonal,
    height: 0,
    kind: "personal" as const
  },
  space: {
    id: "personalSpace",
    component: PersonalSpace,
    height: 0,
    kind: "space" as const
  }
}

const createOtherElement = (
  section: SimpleSectionConfig,
  resumeElementsRef: Ref<Record<string, TResumeElement>>
): TResumeElement => {
  const element = resumeElementsRef.value[section.id] ?? {
    id: section.id,
    component: h(section.component),
    height: 0,
    kind: section.kind
  }

  resumeElementsRef.value[section.id] = element
  return element
}

export const generateSectionElements = (props: IGenerateSectionElementsProps) => {
  const { sectionId, resumeElementsRef, processedContentsRef } = props

  const otherSection = OTHER_SECTIONS[sectionId as (typeof OTHER_SECTION_TYPES)[number]]

  if (otherSection) {
    return [createOtherElement(otherSection, resumeElementsRef)]
  }

  const elements = generateCoreElements({
    sectionId,
    resumeElementsRef,
    processedContentsRef
  })

  if (elements) {
    for (const element of elements) {
      resumeElementsRef.value[element.id] = element
    }
    return elements
  }

  return []
}
