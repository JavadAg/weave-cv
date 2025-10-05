import type {
  TAlign,
  TDateFormat,
  TFontCase,
  TFontWeight,
  TIconStyle,
  TSeparator,
  TSide,
  TVariant,
  TVariantSimple
} from "../schemas/shared.schema"

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

export const fontWeightOptions: { label: string; value: TFontWeight }[] = [
  { label: "100", value: "100" },
  { label: "200", value: "200" },
  { label: "300", value: "300" },
  { label: "400", value: "400" },
  { label: "500", value: "500" },
  { label: "600", value: "600" },
  { label: "700", value: "700" },
  { label: "800", value: "800" },
  { label: "900", value: "900" }
]

export const fontCaseOptions: { label: string; value: TFontCase }[] = [
  { label: "Normal", value: "normal" },
  { label: "Uppercase", value: "uppercase" },
  { label: "Lowercase", value: "lowercase" },
  { label: "Capitalize", value: "capitalize" }
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

export const dateFormatOptions: { label: string; value: TDateFormat }[] = [
  { label: "Jan 2020", value: "MMM YYYY" },
  { label: "2020-01", value: "YYYY-MM" },
  { label: "2020", value: "YYYY" },
  { label: "01/2020", value: "MM/YYYY" },
  { label: "Jan 2020 – Dec 2020", value: "MMM YYYY – MMM YYYY" }
]
