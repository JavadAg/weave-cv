import { generateSectionBlocks } from "./generateSectionBlocks"
import type { TSectionsOrder } from "./layoutGenerator"
import { isTwoColumnSection } from "./pageRenderUtils"
import type { TBlocks } from "./types"

function generateBlocksTwoColumn(item: { left: string[]; right: string[] }) {
  const leftBlocks = item.left.flatMap((sid) => generateSectionBlocks(sid))
  const rightBlocks = item.right.flatMap((sid) => generateSectionBlocks(sid))

  return {
    left: leftBlocks,
    right: rightBlocks
  }
}

export function generateBlocks(sectionsOrder: TSectionsOrder) {
  const page: TBlocks[] = []

  for (const item of sectionsOrder) {
    if (!item) {
      continue
    }

    if (typeof item === "string") {
      const blocks = generateSectionBlocks(item)
      page.push(...blocks)
    } else if (isTwoColumnSection(item)) {
      const blocks = generateBlocksTwoColumn(item)
      page.push(blocks)
    }
  }

  return page
}
