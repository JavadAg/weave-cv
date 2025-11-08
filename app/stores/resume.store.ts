import { capitalize } from "vue"
import {
  DUMMY_AWARD_DATA,
  DUMMY_CERTIFICATE_DATA,
  DUMMY_CORE_SECTIONS,
  DUMMY_COURSE_DATA,
  DUMMY_EDUCATION_DATA,
  DUMMY_EXPERIENCE_DATA,
  DUMMY_LANGUAGE_DATA,
  DUMMY_PERSONAL_SECTION,
  DUMMY_PROJECT_DATA,
  DUMMY_SKILL_DATA,
  DUMMY_SUMMARY_DATA,
  DUMMY_TITLE
} from "~/constants/dummyData"
import type {
  TAdvancedContent,
  TBasicContent,
  TCoreSection,
  TCoreSections,
  TCoreSectionType,
  TPersonalContent
} from "~/utils/schemas/content.schema"

export type ResumeData = {
  title: string
  personal: TPersonalContent
  core: TCoreSections
}

export const useResumeStore = defineStore("resume", {
  state: (): ResumeData => ({
    personal: DUMMY_PERSONAL_SECTION,
    core: DUMMY_CORE_SECTIONS,
    title: DUMMY_TITLE
  }),
  actions: {
    setTitle(title: string) {
      this.title = title
    },
    setContent({ personal, core }: { core: TCoreSections; personal: TPersonalContent }) {
      this.personal = personal
      this.core = core
    },
    updatePersonal(key: keyof TPersonalContent, value: unknown) {
      this.$patch((state) => {
        if (key === "details") {
          state.personal.details = value as TPersonalContent["details"]
        } else {
          state.personal[key] = value as TPersonalContent[typeof key]
        }
      })
    },

    updateContent(path: string, value: unknown) {
      this.$patch((state) => {
        const pathParts = path.split(".")
        if (pathParts.length === 0) return

        // TODO: Fix this type
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let target: any = state.core
        const startIndex = 0

        for (let i = startIndex; i < pathParts.length - 1; i++) {
          const key = pathParts[i]!
          const nextKey = pathParts[i + 1]

          if (Array.isArray(target[key])) {
            const array = target[key]
            const itemIndex = array.findIndex((item) => item.id === nextKey)
            if (itemIndex === -1) {
              target = target[key]
            } else {
              target = array[itemIndex]
              i++
            }
          } else {
            target = target[key]
          }
        }

        const finalKey = pathParts.at(-1)!
        target[finalKey] = value
      })
    },

    addSection(type: TCoreSectionType, title?: string) {
      const sectionKey = `${type}-${crypto.randomUUID()}`

      const sectionDataMap: Record<TCoreSectionType, TBasicContent[] | TAdvancedContent[]> = {
        summary: DUMMY_SUMMARY_DATA,
        experiences: DUMMY_EXPERIENCE_DATA,
        educations: DUMMY_EDUCATION_DATA,
        projects: DUMMY_PROJECT_DATA,
        skills: DUMMY_SKILL_DATA,
        languages: DUMMY_LANGUAGE_DATA,
        certificates: DUMMY_CERTIFICATE_DATA,
        courses: DUMMY_COURSE_DATA,
        awards: DUMMY_AWARD_DATA
      }

      const newSection = {
        title: title || capitalize(type),
        isTitleVisible: true,
        isSectionVisible: true,
        type,
        contents: sectionDataMap[type]
      } as TCoreSection

      this.$patch((state) => {
        state.core[sectionKey] = newSection
      })

      return { sectionKey }
    },

    removeSection(sectionKey: string) {
      this.$patch((state) => {
        const { [sectionKey]: removed, ...rest } = state.core
        state.core = rest
      })
    }
  }
})
