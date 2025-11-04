import { z } from "zod"

export const FontStyle = z.enum(["normal", "italic"])
export const FontCase = z.enum(["inherit", "uppercase", "lowercase", "capitalize"])
export const FontWeight = z.enum(["normal", "bold"])

export const Align = z.enum(["left", "center", "right", "justify"])
export const Side = Align.exclude(["center", "justify"])
export const PersonalPosition = z.enum(["top", "left", "right"])

export const ListType = z.enum(["disc", "circle", "square", "none"])
export const AdvancedSectionVariant = z.enum(["contentFirst", "dateFirst", "stacked"])

export const LinkIconType = z.enum(["arrow", "chain", "pill"])

export const DateFormat = z.enum([
  "MMM DD, YYYY",
  "DD MMM YYYY",
  "YYYY-MM-DD",
  "DD/MM/YYYY",
  "MM/DD/YYYY",
  "DD-MM-YYYY",
  "MM-DD-YYYY",
  "MMMM DD, YYYY",
  "DD MMMM YYYY",
  "YYYY MMM DD",
  "DD MMM YY",
  "MMM DD, YY",
  "YYYY/MM/DD",
  "DD.MM.YYYY",
  "MM.DD.YYYY",
  "DD MMMM, YYYY",
  "MMMM DD YYYY"
])
export const Separator = z.enum(["dot", "pipe", "dash", "comma", "slash", "none"])

export const Variant = z.enum(["inline", "grid", "stacked"])
export const VariantSimple = Variant.exclude(["grid"])

export const LinkStyle = z.enum(["underline", "pill", "iconLeft", "iconRight", "none"])
export const IconStyle = z.enum(["simple", "filledRounded", "filledSquare", "outlineRounded", "outlineSquare"])

export type TFontStyle = z.infer<typeof FontStyle>
export type TFontCase = z.infer<typeof FontCase>
export type TFontWeight = z.infer<typeof FontWeight>
export type TAlign = z.infer<typeof Align>
export type TSide = z.infer<typeof Side>
export type TPersonalPosition = z.infer<typeof PersonalPosition>
export type TDateFormat = z.infer<typeof DateFormat>
export type TSeparator = z.infer<typeof Separator>
export type TVariant = z.infer<typeof Variant>
export type TVariantSimple = z.infer<typeof VariantSimple>
export type TLinkStyle = z.infer<typeof LinkStyle>
export type TIconStyle = z.infer<typeof IconStyle>
export type TListType = z.infer<typeof ListType>
export type TAdvancedSectionVariant = z.infer<typeof AdvancedSectionVariant>
export type TLinkIconType = z.infer<typeof LinkIconType>
