import { storeToRefs } from "pinia"
import { useResumeStore } from "~/stores/resume.store"
import { generateBottomSpaceBlock, generateHeadingBlock } from "~/utils/preview/core/elementFactory"
import { AdvancedSectionTypeSchema, BasicSectionTypeSchema } from "~/utils/schemas/content.schema"
import { generateAdvancedBlocks } from "./generateAdvancedBlocks"
import { generateBasicBlocks } from "./generateBasicBlocks"

export function generateCoreBlocks(sid: string) {
  const resumeStore = useResumeStore()
  const { core } = storeToRefs(resumeStore)

  const section = core.value?.[sid]

  if (!section || !section.isSectionVisible) {
    return []
  }

  const { setBlock } = usePreviewStore()

  const heading = generateHeadingBlock(sid)
  setBlock(heading.id, heading)

  const bottomSpace = generateBottomSpaceBlock(sid)
  setBlock(bottomSpace.id, bottomSpace)

  // Handle advanced sections (Experience, Education, Projects, etc.)
  if (AdvancedSectionTypeSchema.safeParse(section.type).success) {
    const blocks = generateAdvancedBlocks(sid, section)

    if (blocks) {
      return [heading, ...blocks, bottomSpace]
    }

    return [heading, bottomSpace]
  }

  // Handle basic sections (Skills, Languages, etc.)
  if (BasicSectionTypeSchema.safeParse(section.type).success) {
    const blocks = generateBasicBlocks(sid, section)

    if (blocks) {
      setBlock(blocks.id, blocks)
      return [heading, blocks, bottomSpace]
    }

    return [heading, bottomSpace]
  }

  return [heading, bottomSpace]
}
