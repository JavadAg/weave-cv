import type { TLayout } from "~/utils/schemas/configs/generalConfigs.schema"
import type { TAdvancedSectionConfigs } from "~/utils/schemas/configs/sectionsConfigs.schema"

export interface ContentFragmentSplit {
  contentFragmentsForEntry: string[]
  contentFragmentsForParagraphs: string[]
}

function calculateFragmentSplitIndex(
  columns: TLayout["columns"],
  variant: TAdvancedSectionConfigs["variant"],
  titleSubtitleVariant: TAdvancedSectionConfigs["titleSubtitleVariant"]
): number {
  if (columns === "2") {
    return 1
  }

  if (titleSubtitleVariant === "stacked") {
    return 1
  }

  if (variant === "contentFirst" || variant === "dateFirst") {
    return 2
  }

  return 1
}

export const splitContentFragments = (
  contentLine: string[],
  columns: TLayout["columns"],
  sectionConfigs: TAdvancedSectionConfigs
): ContentFragmentSplit => {
  const { variant, titleSubtitleVariant } = sectionConfigs
  const splitIndex = calculateFragmentSplitIndex(columns, variant, titleSubtitleVariant)

  return {
    contentFragmentsForEntry: contentLine.slice(0, splitIndex),
    contentFragmentsForParagraphs: contentLine.slice(splitIndex)
  }
}
