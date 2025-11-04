import type { TAlign, TIconStyle, TSeparator, TSide, TVariant, TVariantSimple } from "../schemas/shared.schema"

export const alignOptions: { label: string; value: TAlign }[] = [
  { label: "Left", value: "left" },
  { label: "Center", value: "center" },
  { label: "Right", value: "right" }
]
export const variantSimpleOptions: { label: string; value: TVariantSimple }[] = [
  { label: "Same Line", value: "inline" },
  { label: "Stacked", value: "stacked" }
]

export const variantOptions: { label: string; value: TVariant }[] = [
  { label: "Grid", value: "grid" },
  { label: "Stacked", value: "stacked" },
  { label: "Same Line", value: "inline" }
]

export const separatorOptions: { label: string; value: TSeparator }[] = [
  { label: "Pipe", value: "pipe" },
  { label: "Dot", value: "dot" },
  { label: "Dash", value: "dash" },
  { label: "Comma", value: "comma" },
  { label: "Slash", value: "slash" },
  { label: "None", value: "none" }
]

export const iconAlignOptions: { label: string; value: TSide }[] = [
  { label: "Left", value: "left" },
  { label: "Right", value: "right" }
]

export const iconStyleOptions: { label: string; value: TIconStyle }[] = [
  { label: "Simple", value: "simple" },
  { label: "Filled Rounded", value: "filledRounded" },
  { label: "Filled Square", value: "filledSquare" },
  { label: "Outline Rounded", value: "outlineRounded" },
  { label: "Outline Square", value: "outlineSquare" }
]
