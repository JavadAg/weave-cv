import type { TConfigs } from "~/utils/schemas/configs/configs.schema"
import type { TCoreSections, TPersonalContent } from "~/utils/schemas/content.schema"

export type TResume = {
  id: string
  configs: TConfigs
  content: {
    personal: TPersonalContent
    core: TCoreSections | Record<string, unknown>
  }
  schemaVersion: number
  title: string
  created_at: string
  updated_at: string
}
