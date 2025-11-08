import type { TConfigs } from "~/utils/schemas/configs/configs.schema"
import type { TCoreSections, TPersonalContent } from "~/utils/schemas/content.schema"

export type TResume = {
  id: string
  configs?: TConfigs | null
  content?: {
    personal?: TPersonalContent | null
    core?: TCoreSections | null
  } | null
  schemaVersion: number
  title: string
  created_at: string
  updated_at: string
}
