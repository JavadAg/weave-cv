import type { TCoreSectionType } from "~/utils/schemas/content.schema"

// Configuration options available for each section type
export type SectionConfigOption =
  | "variant"
  | "separator"
  | "titleSubtitleVariant"
  | "dateLocationVariant"
  | "subTitleFirst"
  | "grids"
  | "typography"

// Configuration mapping for each section type
export const SECTION_CONFIGS_CONFIG: Record<TCoreSectionType, SectionConfigOption[]> = {
  // Basic sections
  summary: [],
  skills: ["variant", "separator", "grids", "typography"],
  languages: ["variant", "separator", "grids", "typography"],
  certificates: ["variant", "separator", "grids", "typography"],

  // Advanced sections
  experiences: ["variant", "separator", "titleSubtitleVariant", "dateLocationVariant", "subTitleFirst", "typography"],
  educations: ["variant", "separator", "titleSubtitleVariant", "dateLocationVariant", "subTitleFirst", "typography"],
  projects: ["variant", "separator", "titleSubtitleVariant", "dateLocationVariant", "subTitleFirst", "typography"],
  awards: ["variant", "separator", "titleSubtitleVariant", "dateLocationVariant", "subTitleFirst", "typography"],
  courses: ["variant", "separator", "titleSubtitleVariant", "dateLocationVariant", "subTitleFirst", "typography"]
}

// Section display names and icons
export const SECTION_DISPLAY_CONFIG: Record<TCoreSectionType, { label: string; icon: string }> = {
  summary: { label: "Summary", icon: "i-lucide-book-open" },
  skills: { label: "Skills", icon: "i-lucide-wrench" },
  languages: { label: "Languages", icon: "i-lucide-globe" },
  certificates: { label: "Certificates", icon: "i-lucide-award" },
  experiences: { label: "Experience", icon: "i-lucide-briefcase" },
  educations: { label: "Education", icon: "i-lucide-graduation-cap" },
  projects: { label: "Projects", icon: "i-lucide-folder-open" },
  awards: { label: "Awards", icon: "i-lucide-trophy" },
  courses: { label: "Courses", icon: "i-lucide-book" }
}
