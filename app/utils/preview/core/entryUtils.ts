import type { TAdvancedContent, TBasicContent } from "~/utils/schemas/content.schema"
import type { TAdvancedSectionVariant } from "~/utils/schemas/shared.schema"

// es
export const determineDisplayMode = ({
  columns,
  displayMode
}: {
  columns: string
  displayMode: TAdvancedSectionVariant
}) => {
  if (columns === "1") {
    return displayMode || "dateLocationLeft"
  }

  if (columns === "2") {
    return "columns"
  }

  return "columns"
}

// Ss
export const isContentEmpty = (content: TAdvancedContent | TBasicContent) => {
  if (!content) return true

  const { id, isHidden, ...rest } = content

  return Object.values(rest).every((value) => !value)
}

export const getTextAlign = (position: string) => {
  if (position === "dateLocationRight") return "right"
  if (position === "stacked") return "end"
  return
}
