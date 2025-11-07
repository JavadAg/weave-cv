import { h } from "vue"
import RenderPersonal from "~/components/resume/preview/sections/personal/RenderPersonal.vue"
import PersonalSpace from "~/components/resume/preview/sections/PersonalSpace.vue"
import type { OTHER_SECTION_TYPES } from "~/constants/sectionTypes"
import { generateCoreElements } from "./sectionElementGenerator"
import type { TResumeElement } from "./types"

type SimpleSectionConfig = {
  id: string
  component: Parameters<typeof h>[0]
}

const OTHER_SECTIONS: Record<(typeof OTHER_SECTION_TYPES)[number], TResumeElement> = {
  personal: {
    id: "personal",
    component: RenderPersonal,
    height: 0
  },
  space: {
    id: "personalSpace",
    component: PersonalSpace,
    height: 0
  }
}

const createOtherElement = (section: SimpleSectionConfig): TResumeElement => {
  const { blocks, setBlock } = usePreviewStore()

  const element = blocks.get(section.id) ?? {
    id: section.id,
    component: h(section.component),
    height: 0
  }

  setBlock(section.id, element)
  return element
}

export const generateSectionElements = (sectionId: string) => {
  const otherSection = OTHER_SECTIONS[sectionId as (typeof OTHER_SECTION_TYPES)[number]]

  const { setBlock } = usePreviewStore()

  if (otherSection) {
    return [createOtherElement(otherSection)]
  }

  const elements = generateCoreElements(sectionId)

  if (elements) {
    for (const element of elements) {
      setBlock(element.id, element)
    }
    return elements
  }

  return []
}
