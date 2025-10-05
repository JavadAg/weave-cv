import type { z } from "zod"
import type { ConfigsSchema, FieldStyle } from "~/utils/schemas/configs.schema"
import type { ContentSchema, SectionSchema, SectionTypeSchema } from "~/utils/schemas/content.schema"

export type TResume = {
  content: TContent
  configs: TConfigs
  title: string
}

export type TConfigs = z.infer<typeof ConfigsSchema>
export type TContent = z.infer<typeof ContentSchema>

type SectionType = z.infer<typeof SectionTypeSchema>
export type SectionByType<T extends SectionType> = Extract<z.infer<typeof SectionSchema>, { type: T }>

export type TFieldStyle = z.infer<typeof FieldStyle>
