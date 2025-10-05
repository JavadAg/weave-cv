import { z } from "zod"

export const DETAILS_CATALOG = {
  core: {
    email: {
      label: "Email",
      icon: "mail",
      urlTemplate: "mailto:{value}"
    },
    phone: {
      label: "Phone",
      icon: "phone",
      urlTemplate: "tel:{value}"
    },
    location: {
      label: "Location",
      icon: "map-pin",
      urlTemplate: "https://www.google.com/maps/search/{value}"
    },
    nationality: {
      label: "Nationality",
      icon: "flag"
    },
    date_of_birth: {
      label: "Date of Birth",
      icon: "cake"
    }
  },
  professional: {
    linkedin: {
      label: "LinkedIn",
      icon: "linkedin",
      urlTemplate: "https://linkedin.com/{value}"
    },
    github: {
      label: "GitHub",
      icon: "github",
      urlTemplate: "https://github.com/{value}"
    },
    gitlab: {
      label: "GitLab",
      icon: "gitlab",
      urlTemplate: "https://gitlab.com/{value}"
    },
    website: {
      label: "Website",
      icon: "globe",
      urlTemplate: "{value}" // expects full URL
    }
  },
  social: {
    twitter: {
      label: "X / Twitter",
      icon: "twitter",
      urlTemplate: "https://twitter.com/{value}"
    },
    instagram: {
      label: "Instagram",
      icon: "instagram",
      urlTemplate: "https://instagram.com/{value}"
    },
    facebook: {
      label: "Facebook",
      icon: "facebook",
      urlTemplate: "https://facebook.com/{value}"
    },
    reddit: {
      label: "Reddit",
      icon: "reddit",
      urlTemplate: "https://reddit.com/u/{value}"
    }
  },
  creative: {
    dribbble: {
      label: "Dribbble",
      icon: "dribbble",
      urlTemplate: "https://dribbble.com/{value}"
    },
    behance: {
      label: "Behance",
      icon: "palette",
      urlTemplate: "https://behance.net/{value}"
    },
    figma: {
      label: "Figma",
      icon: "figma",
      urlTemplate: "https://figma.com/@{value}"
    }
  },
  media: {
    youtube: {
      label: "YouTube",
      icon: "youtube",
      urlTemplate: "https://youtube.com/{value}"
    },
    spotify: {
      label: "Spotify",
      icon: "spotify",
      urlTemplate: "https://open.spotify.com/{value}"
    },
    twitch: {
      label: "Twitch",
      icon: "twitch",
      urlTemplate: "https://twitch.tv/{value}"
    }
  },
  finance: {
    paypal: {
      label: "PayPal",
      icon: "wallet",
      urlTemplate: "https://paypal.me/{value}"
    },
    bitcoin: {
      label: "Bitcoin",
      icon: "bitcoin",
      urlTemplate: "bitcoin:{value}"
    },
    ethereum: {
      label: "Ethereum",
      icon: "diamond",
      urlTemplate: "ethereum:{value}"
    }
  }
} as const

export type DetailKey = keyof typeof DETAILS_CATALOG

export type TPersonalData = z.infer<typeof PersonalDataSchema>
export type TSummaryData = z.infer<typeof SummaryDataSchema>
export type TExperienceData = z.infer<typeof ExperienceDataSchema>
export type TEducationData = z.infer<typeof EducationDataSchema>
export type TProjectData = z.infer<typeof ProjectDataSchema>
export type TSkillData = z.infer<typeof SkillDataSchema>
export type TLanguageData = z.infer<typeof LanguageDataSchema>

export const PersonalDataSchema = z.object({
  title: z.object({
    text: z.string(),
    isVisible: z.boolean()
  }),
  subtitle: z.object({
    text: z.string(),
    isVisible: z.boolean()
  }),
  details: z.array(
    z.object({
      value: z.string(),
      isVisible: z.boolean(),
      label: z.string(),
      icon: z.string(),
      url: z.url().optional()
    })
  )
})
export const SummaryDataSchema = z.object({ text: z.string() })
export const ExperienceDataSchema = z.object({
  id: z.string(),
  isVisible: z.boolean(),
  company: z.string(),
  role: z.string(),
  from: z.string(),
  to: z.string(),
  present: z.boolean().optional(),
  location: z.string(),
  description: z.string(),
  url: z.url()
})
export const EducationDataSchema = z.object({
  id: z.string(),
  isVisible: z.boolean(),
  school: z.string(),
  degree: z.string(),
  from: z.string(),
  to: z.string(),
  present: z.boolean().optional(),
  location: z.string(),
  description: z.string().optional()
})
export const ProjectDataSchema = z.object({
  id: z.string(),
  isVisible: z.boolean(),
  title: z.string(),
  subtitle: z.string(),
  from: z.string().optional(),
  to: z.string().optional(),
  url: z.string().optional(),
  description: z.string().optional()
})
export const SkillDataSchema = z.object({
  id: z.string(),
  title: z.string(),
  isVisible: z.boolean(),
  description: z.string()
})
export const LanguageDataSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  isVisible: z.boolean()
})

export type SectionType = z.infer<typeof SectionTypeSchema>
export const SectionTypeSchema = z.enum([
  "personal",
  "summary",
  "experience",
  "education",
  "projects",
  "skills",
  "languages"
])

const BaseSectionFields = z.object({
  id: z.string(),
  isSectionVisible: z.boolean(),
  isTitleVisible: z.boolean(),
  title: z.string()
})

export const SectionSchema = z.discriminatedUnion("type", [
  BaseSectionFields.extend({
    type: z.literal("personal"),
    data: PersonalDataSchema
  }),
  BaseSectionFields.extend({
    type: z.literal("summary"),
    data: SummaryDataSchema
  }),
  BaseSectionFields.extend({
    type: z.literal("experience"),
    data: z.array(ExperienceDataSchema)
  }),
  BaseSectionFields.extend({
    type: z.literal("education"),
    data: z.array(EducationDataSchema)
  }),
  BaseSectionFields.extend({
    type: z.literal("projects"),
    data: z.array(ProjectDataSchema)
  }),
  BaseSectionFields.extend({
    type: z.literal("skills"),
    data: z.array(SkillDataSchema)
  }),
  BaseSectionFields.extend({
    type: z.literal("languages"),
    data: z.array(LanguageDataSchema)
  })
])

export const ContentSchema = z.record(z.string(), SectionSchema)
