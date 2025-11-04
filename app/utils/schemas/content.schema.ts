import { z } from "zod"
import { ADVANCED_SECTION_TYPES, BASIC_SECTION_TYPES, OTHER_SECTION_TYPES } from "~/constants/sectionTypes"

export const DETAILS_CATALOG = {
  core: {
    email: {
      label: "Email",
      icon: "svg"
    },
    phone: {
      label: "Phone"
    },
    location: {
      label: "Location"
    },
    nationality: {
      label: "Nationality"
    },
    date_of_birth: {
      label: "Date of Birth"
    }
  },
  professional: {
    linkedin: {
      label: "LinkedIn"
    },
    github: {
      label: "GitHub"
    },
    gitlab: {
      label: "GitLab"
    },
    website: {
      label: "Website"
    }
  },
  social: {
    twitter: {
      label: "X / Twitter"
    },
    instagram: {
      label: "Instagram"
    },
    facebook: {
      label: "Facebook"
    },
    reddit: {
      label: "Reddit"
    }
  },
  creative: {
    dribbble: {
      label: "Dribbble"
    },
    behance: {
      label: "Behance"
    },
    figma: {
      label: "Figma"
    }
  },
  media: {
    youtube: {
      label: "YouTube"
    },
    spotify: {
      label: "Spotify"
    },
    twitch: {
      label: "Twitch"
    }
  },
  finance: {
    paypal: {
      label: "PayPal"
    },
    bitcoin: {
      label: "Bitcoin"
    },
    ethereum: {
      label: "Ethereum"
    }
  }
} as const

type DetailKeyFromCatalog<T> =
  T extends Record<string, infer U> ? (U extends Record<string, unknown> ? keyof U : never) : never

export type DetailKey = DetailKeyFromCatalog<typeof DETAILS_CATALOG>

// Extract all detail keys startDate DETAILS_CATALOG automatically
const DETAIL_KEYS = Object.values(DETAILS_CATALOG).flatMap((category) => Object.keys(category)) as [
  DetailKey,
  ...DetailKey[]
]

export type TPersonalContent = z.infer<typeof PersonalContentSchema>
export type TBasicContent = z.infer<typeof BasicContentSchema>
export type TAdvancedContent = z.infer<typeof AdvancedContentSchema>

export type TCoreSectionType = z.infer<typeof CoreSectionTypeSchema>
export type TSectionType = z.infer<typeof SectionTypeSchema>

export const AdvancedSectionTypeSchema = z.enum(ADVANCED_SECTION_TYPES)
export const BasicSectionTypeSchema = z.enum(BASIC_SECTION_TYPES)
export const OtherSectionTypeSchema = z.enum(OTHER_SECTION_TYPES)

export const CoreSectionTypeSchema = z.union([AdvancedSectionTypeSchema, BasicSectionTypeSchema])
export const SectionTypeSchema = z.union([CoreSectionTypeSchema, OtherSectionTypeSchema])

export const PersonalContentSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  details: z.array(
    z.object({
      value: z.string(),
      isHidden: z.boolean(),
      type: z.enum(DETAIL_KEYS),
      url: z.url().optional()
    })
  )
})

const BasicContentSchema = z.object({
  id: z.string(),
  isHidden: z.boolean(),
  title: z.string(),
  description: z.string(),
  url: z.url().optional()
})
const AdvancedContentSchema = z.object({
  id: z.string(),
  isHidden: z.boolean(),
  subtitle: z.string(),
  title: z.string(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  present: z.boolean().optional(),
  location: z.string().optional(),
  description: z.string(),
  url: z.url().optional()
})

const BaseSectionFields = z.object({
  isSectionVisible: z.boolean(),
  isTitleVisible: z.boolean(),
  title: z.string()
})

const CoreSectionSchema = z.discriminatedUnion("type", [
  BaseSectionFields.extend({
    type: z.literal("summary"),
    contents: z.array(BasicContentSchema)
  }),
  BaseSectionFields.extend({
    type: z.literal("awards"),
    contents: z.array(AdvancedContentSchema)
  }),
  BaseSectionFields.extend({
    type: z.literal("experiences"),
    contents: z.array(AdvancedContentSchema)
  }),
  BaseSectionFields.extend({
    type: z.literal("educations"),
    contents: z.array(AdvancedContentSchema)
  }),
  BaseSectionFields.extend({
    type: z.literal("projects"),
    contents: z.array(AdvancedContentSchema)
  }),
  BaseSectionFields.extend({
    type: z.literal("skills"),
    contents: z.array(BasicContentSchema)
  }),
  BaseSectionFields.extend({
    type: z.literal("languages"),
    contents: z.array(BasicContentSchema)
  }),
  BaseSectionFields.extend({
    type: z.literal("certificates"),
    contents: z.array(BasicContentSchema)
  }),
  BaseSectionFields.extend({
    type: z.literal("courses"),
    contents: z.array(AdvancedContentSchema)
  })
])

export type TCoreSection = z.infer<typeof CoreSectionSchema>
export const CoreSectionsSchema = z.record(z.string(), CoreSectionSchema)
export type TCoreSections = z.infer<typeof CoreSectionsSchema>
