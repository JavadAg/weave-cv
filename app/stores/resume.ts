/* eslint-disable @typescript-eslint/no-explicit-any */
import { capitalize } from "vue"
import type { z } from "zod"
import {
  DEFAULT_CONTENT,
  DEFAULT_EDUCATION_DATA,
  DEFAULT_EXPERIENCE_DATA,
  DEFAULT_LANGUAGE_DATA,
  DEFAULT_PERSONAL_DATA,
  DEFAULT_PROJECT_DATA,
  DEFAULT_SKILL_DATA,
  DEFAULT_SUMMARY_DATA,
  DEFAULT_TITLE
} from "~/constants/default"
import type { TContent } from "~/types/resume.types"
import type {
  SectionTypeSchema,
  TEducationData,
  TExperienceData,
  TLanguageData,
  TPersonalData,
  TProjectData,
  TSkillData,
  TSummaryData
} from "~/utils/schemas/content.schema"

export type ResumeData = {
  title: string
  content: TContent | null
}

export const useResumeStore = defineStore("resume", {
  state: () => ({
    content: DEFAULT_CONTENT,
    title: DEFAULT_TITLE
  }),
  actions: {
    setTitle(title: string) {
      this.title = title
    },
    setContent(content: TContent) {
      this.content = content
    },

    updateContent(path: string, value: unknown) {
      this.$patch((state) => {
        const keys = path.split(".")
        if (keys.length === 0) return

        let target: any = state.content

        for (let i = 0; i < keys.length - 1; i++) {
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

    addSection(type: z.infer<typeof SectionTypeSchema>, title?: string) {
      const sectionKey = `${type}-${crypto.randomUUID()}`

      let defaultData:
        | TPersonalData
        | TSummaryData
        | TExperienceData[]
        | TEducationData[]
        | TProjectData[]
        | TSkillData[]
        | TLanguageData[] = []

      switch (type) {
        case "personal": {
          defaultData = DEFAULT_PERSONAL_DATA
          break
        }
        case "summary": {
          defaultData = DEFAULT_SUMMARY_DATA
          break
        }
        case "experience": {
          defaultData = DEFAULT_EXPERIENCE_DATA
          break
        }
        case "education": {
          defaultData = DEFAULT_EDUCATION_DATA
          break
        }
        case "projects": {
          defaultData = DEFAULT_PROJECT_DATA
          break
        }
        case "skills": {
          defaultData = DEFAULT_SKILL_DATA
          break
        }
        case "languages": {
          defaultData = DEFAULT_LANGUAGE_DATA
          break
        }
      }

      const newSection = {
        id: sectionKey,
        title: title || capitalize(type),
        isTitleVisible: true,
        isSectionVisible: true,
        type,
        data: defaultData
      }

      this.$patch((state) => {
        state.content[sectionKey] = newSection as any
      })

      return { sectionKey }
    },

    removeSection(sectionKey: string) {
      this.$patch((state) => {
        const { [sectionKey]: removed, ...rest } = state.content
        state.content = rest
      })
    }
  }
})
