import { capitalize } from "vue"
import {
  DUMMY_AWARD_DATA,
  DUMMY_CERTIFICATE_DATA,
  DUMMY_CORE_SECTIONS_DATA,
  DUMMY_COURSE_DATA,
  DUMMY_EDUCATION_DATA,
  DUMMY_EXPERIENCE_DATA,
  DUMMY_LANGUAGE_DATA,
  DUMMY_PERSONAL_CONTENT,
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
  state: () => ({
    personal: DUMMY_PERSONAL_CONTENT,
    core: DUMMY_CORE_SECTIONS_DATA,
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

    updateContent(path: string, value: unknown) {
      this.$patch((state) => {
        const keys = path.split(".")
        if (keys.length === 0) return

        // Determine if we're updating personal or core content
        let target: any
        let startIndex = 0

        if (keys[0] === "personal") {
          target = state.personal
          startIndex = 1
        } else {
          target = state.core
        }

        // Handle personal content differently since it has a flat structure
        if (keys[0] === "personal") {
          // For personal content, handle direct properties and array items
          if (keys.length === 2) {
            // Direct property access like "personal.title"
            const finalKey = keys[1]!
            target[finalKey] = value
            return
          } else if (keys.length > 2) {
            // Array item access like "personal.details.0.value"
            const arrayKey = keys[1]! // "details"
            const itemIndex = Number.parseInt(keys[2]!) // "0"
            const finalKey = keys[3]! // "value"

            if (Array.isArray(target[arrayKey]) && target[arrayKey][itemIndex]) {
              target[arrayKey][itemIndex][finalKey] = value
            }
            return
          }
        }

        // Handle core content (existing logic)
        for (let i = startIndex; i < keys.length - 1; i++) {
          const key = keys[i]!
          const nextKey = keys[i + 1]

          if (Array.isArray(target[key])) {
            const array = target[key]
            const itemIndex = array.findIndex((item: any) => item.id === nextKey)
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

        const finalKey = keys.at(-1)!
        target[finalKey] = value
      })
    },

    addSection(type: TCoreSectionType, title?: string) {
      const sectionKey = `${type}-${crypto.randomUUID()}`

      let defaultData: TBasicContent[] | TAdvancedContent[] = []

      switch (type) {
        case "summary": {
          defaultData = DUMMY_SUMMARY_DATA
          break
        }
        case "experiences": {
          defaultData = DUMMY_EXPERIENCE_DATA
          break
        }
        case "educations": {
          defaultData = DUMMY_EDUCATION_DATA
          break
        }
        case "projects": {
          defaultData = DUMMY_PROJECT_DATA
          break
        }
        case "skills": {
          defaultData = DUMMY_SKILL_DATA
          break
        }
        case "languages": {
          defaultData = DUMMY_LANGUAGE_DATA
          break
        }
        case "certificates": {
          defaultData = DUMMY_CERTIFICATE_DATA
          break
        }
        case "courses": {
          defaultData = DUMMY_COURSE_DATA
          break
        }
        case "awards": {
          defaultData = DUMMY_AWARD_DATA
          break
        }
      }

      const newSection: TCoreSection = {
        title: title || capitalize(type),
        isTitleVisible: true,
        isSectionVisible: true,
        type,
        contents: defaultData
      }

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
