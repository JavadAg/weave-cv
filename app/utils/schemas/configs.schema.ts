import { z } from "zod"
import { PAPER_SIZES, type TPaperSize } from "~/constants/papers"
import { SectionTypeSchema } from "./content.schema"
import {
  Align,
  DateFormat,
  FontCase,
  FontStyle,
  FontWeight,
  IconStyle,
  Separator,
  Side,
  Variant,
  VariantSimple
} from "./shared.schema"

/**
 * Field Style Schema
 */
export const FieldStyle = z.object({
  fontSize: z.number().min(8).max(48),
  fontWeight: FontWeight,
  fontCase: FontCase,
  fontStyle: FontStyle
})

/**
 * Layout Schema
 */
const layoutSchema = z.object({
  showSectionDividers: z.boolean(),
  dateFormat: DateFormat,
  rtl: z.boolean(),
  size: z.enum(Object.keys(PAPER_SIZES) as [TPaperSize, ...TPaperSize[]]),
  margins: z.object({
    top: z.number(),
    right: z.number(),
    bottom: z.number(),
    left: z.number()
  }),
  /* border: z.object({
    isEnabled: z.boolean(),
    apply: z.enum(["all", "specific"]),
    color: z.string(),
    width: z.number(),
    style: z.enum(["solid", "dashed", "dotted", "double", "groove", "ridge", "inset", "outset"]),
    sides: BorderSidesSchema
  }), */
  columns: z.enum(["1", "2"]),
  sectionGap: z.number(),
  personalPosition: z.enum(["top", "left", "right"]),
  order: z.object({
    twoCol: z.object({
      left: z.array(SectionTypeSchema),
      right: z.array(SectionTypeSchema)
    }),
    oneCol: z.array(SectionTypeSchema)
  })
})

/**
 * Headings Schema
 */
const headingsSchema = z.object({
  fontSize: z.number(),
  fontWeight: FontWeight,
  fontCase: z.enum(["normal", "uppercase", "lowercase"]),
  variant: z.enum(["plain", "underline-short", "underline-long", "pill", "border", "vertical-border"])
})

/**
 * Links Schema
 */
const linksShema = z.object({
  underline: z.boolean(),
  icon: z.object({
    visible: z.boolean(),
    size: z.number().min(8).max(64).default(16),
    color: z.string(),
    linkIconSvg: z.string().optional()
  })
})

/**
 * Typography Schema
 */
const typographySchema = z.object({
  fontFamily: z.string(),
  lineHeight: z.number(),
  letterSpacing: z.number()
})

/**
 * Colors Schema
 */
export const applyableColorItems = z.enum(["name", "dates", "headings"])
export type TApplyableColorItems = z.infer<typeof applyableColorItems>
const colorsSchema = z.object({
  apply: z.array(applyableColorItems),
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

/**
 * Summary Schema
 */
const summarySchema = z.object({})

/**
 * Personal Schema
 */
const personalSchema = z.object({
  variant: VariantSimple,
  main: z.object({
    align: Align,
    variant: VariantSimple,
    title: z.object({
      fontSize: z.number().min(12).max(48),
      fontWeight: FontWeight,
      fontCase: FontCase,
      bottomSpace: z.number().min(0).max(48).default(8)
    }),
    subtitle: z.object({
      fontSize: z.number().min(12).max(48),
      fontWeight: FontWeight,
      fontCase: FontCase,
      bottomSpace: z.number().min(0).max(48).default(8)
    })
  }),
  details: z.object({
    variant: Variant,
    separator: Separator,
    fontSize: z.number().min(12).max(48),
    fontWeight: FontWeight,
    fontCase: FontCase,
    align: Align,
    icon: z.object({
      align: Side,
      type: IconStyle,
      size: z.number().min(8).max(64)
    })
  })
})

/**
 * Education Schema
 */
const educationSchema = z.object({
  titleVariant: VariantSimple,
  dateVariant: VariantSimple,
  separator: Separator,
  degree: FieldStyle,
  school: FieldStyle,
  location: FieldStyle,
  date: FieldStyle
})

/**
 * Experience Schema
 */
const experienceSchema = z.object({
  variant: z.enum(["contentFirst", "dateFirst", "stacked"]),
  separator: Separator,
  titleVariant: VariantSimple,
  dateVariant: VariantSimple,
  role: FieldStyle,
  company: FieldStyle,
  location: FieldStyle,
  date: FieldStyle,
  bullets: z.object({
    bulletStyle: z.enum(["disc", "dash", "square", "none"]),
    gap: z.number().min(0).max(32)
  })
})

/**
 * Skills Schema
 */
const skillsSchema = z.object({
  variant: Variant,
  grids: z.number().min(1).max(4),
  separator: Separator
})

/**
 * Certifications Schema
 */
const certificationsSchema = skillsSchema

/**
 * Projects Schema
 */
const projectsSchema = z.object({
  titleVariant: VariantSimple,
  dateVariant: VariantSimple,
  separator: Separator,
  title: FieldStyle,
  subtitle: FieldStyle,
  date: FieldStyle
})

/**
 * Languages Schema
 */
const languagesSchema = z.object({
  variant: Variant,
  grids: z.number().min(1).max(4),
  separator: Separator,
  title: FieldStyle,
  description: FieldStyle,
  levelVariant: z.enum(["dots", "text"])
})

/**
 * Configs Schema
 */
export const ConfigsSchema = z.object({
  general: z.object({
    layout: layoutSchema,
    headings: headingsSchema,
    links: linksShema,
    typography: typographySchema,
    colors: colorsSchema
  }),
  personal: personalSchema,
  summary: summarySchema,
  experience: experienceSchema,
  skills: skillsSchema,
  certifications: certificationsSchema,
  education: educationSchema,
  projects: projectsSchema,
  languages: languagesSchema
})
