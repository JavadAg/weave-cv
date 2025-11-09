import { z } from "zod"
import { FONT_OPTIONS } from "~/constants/fonts"
import { PAPER_SIZES, type TPaperSize } from "~/constants/papers"
import { SectionTypeSchema } from "../content.schema"
import { DateFormat, FontCase, FontStyle, FontWeight, LinkIconType, ListType, PersonalPosition } from "../shared.schema"

export type TLayout = z.infer<typeof LayoutSchema>
export type TColors = z.infer<typeof ColorsSchema>

export const ContentLayoutSchema = z.object({
  title: z.object({
    fontSizeMultiplier: z.number().min(1).max(2),
    fontWeight: FontWeight,
    fontCase: FontCase,
    fontStyle: FontStyle
  }),
  subtitle: z.object({
    fontSizeMultiplier: z.number().min(1).max(2),
    fontWeight: FontWeight,
    fontCase: FontCase,
    fontStyle: FontStyle
  }),
  listType: ListType,
  indent: z.number().min(0).max(16),
  contentFirstWidth: z.object({
    left: z.number().min(25).max(75),
    right: z.number().min(25).max(75)
  }),
  dateFirstWidth: z.object({
    left: z.number().min(25).max(75),
    right: z.number().min(25).max(75)
  })
})

export const LayoutSchema = z.object({
  dateFormat: DateFormat,
  rtl: z.boolean(),
  language: z.string(),
  size: z.enum(Object.keys(PAPER_SIZES) as [TPaperSize, ...TPaperSize[]]),
  verticalMargin: z.number().min(5).max(30),
  horizontalMargin: z.number().min(5).max(30),
  sectionGap: z.number().min(2).max(50),
  columns: z.enum(["1", "2"]),
  personalPosition: PersonalPosition,
  contentLayout: ContentLayoutSchema,
  columnsWidth: z.object({
    left: z.number().min(25).max(75),
    right: z.number().min(25).max(75)
  }),
  order: z.object({
    twoCol: z.object({
      left: z.array(SectionTypeSchema),
      right: z.array(SectionTypeSchema)
    }),
    oneCol: z.array(SectionTypeSchema)
  })
})

export const HeadingsSchema = z.object({
  fontSizeMultiplier: z.number().min(1).max(2),
  fontWeight: FontWeight,
  fontCase: z.enum(["inherit", "uppercase", "lowercase"]),
  variant: z.enum(["plain", "underline", "underline-full", "pill", "border", "vertical-border"]),
  icon: z.object({
    visible: z.boolean(),
    size: z.number().min(8).max(32),
    custom: z.record(z.string(), z.string().optional()).optional()
  })
})

export const LinksSchema = z.object({
  underline: z.boolean(),
  color: z.string(),
  icon: z.object({
    visible: z.boolean(),
    type: LinkIconType,
    color: z.string()
  })
})

export const TypographySchema = z.object({
  fontFamily: z.enum(FONT_OPTIONS.map((option) => option.value)),
  fontSize: z.number().min(6).max(24),
  lineHeight: z.number().min(1).max(2),
  letterSpacing: z.number().min(-2).max(10)
})

export const ApplyableColorItems = z.enum(["name", "dates", "headings"])
export type TApplyableColorItems = z.infer<typeof ApplyableColorItems>
const ColorsSchema = z.object({
  apply: z.array(ApplyableColorItems),
  primary: z.object({
    textColor: z.string(),
    bgColor: z.string(),
    accentColor: z.string()
  }),
  secondary: z.object({
    textColor: z.string(),
    bgColor: z.string(),
    accentColor: z.string()
  })
})

export const GeneralSchema = z.object({
  layout: LayoutSchema,
  headings: HeadingsSchema,
  links: LinksSchema,
  typography: TypographySchema,
  colors: ColorsSchema
})
