import type { SectionByType, TConfigs } from "~/types/resume.types"
import { renderSectionTitle, renderText } from "./shared"

export function renderSummary(s: SectionByType<"summary">, _: TConfigs["summary"], general: TConfigs["general"]) {
  const header = s.isTitleVisible ? renderSectionTitle(s.title || "Summary", general.headings) : ""

  return `${header}${renderText(s.data.text)}`
}
