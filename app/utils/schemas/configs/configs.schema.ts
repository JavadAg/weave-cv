import { z } from "zod"
import { GeneralSchema } from "./generalConfigs.schema"
import { SectionsConfigsSchema } from "./sectionsConfigs.schema"

export const ConfigsSchema = z.object({
  general: GeneralSchema,
  ...SectionsConfigsSchema.shape
})

export type TConfigs = z.infer<typeof ConfigsSchema>
