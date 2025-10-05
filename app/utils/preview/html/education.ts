import type { SectionByType, TConfigs } from "~/types/resume.types"
import { esc, fmtDate, renderSectionTitle, SEP } from "./shared"

const renderField = (text: string, fieldType: string) => {
  return `<span class="education-${fieldType}">${esc(text)}</span>`
}

export function renderEducation(
  s: SectionByType<"education">,
  cfg: TConfigs["education"],
  general: TConfigs["general"]
) {
  const visibleItems = s.data.filter((item) => item.isVisible)
  const sep = SEP[cfg.separator] ?? " "
  const dateFormat = general.layout.dateFormat

  const rows = visibleItems.map((item) => {
    const degree = item.degree ? renderField(item.degree, "degree") : ""
    const school = item.school ? renderField(item.school, "school") : ""

    const formatDateRange = () => {
      const fromDate = fmtDate(item.from, dateFormat)
      const toDate = item.present ? "Present" : item.to ? fmtDate(item.to, dateFormat) : ""
      return toDate ? `${fromDate} – ${toDate}` : fromDate
    }

    const dateSpan = renderField(formatDateRange(), "date")
    const locationSpan = item.location ? renderField(item.location, "location") : ""

    const leftParts = [degree, school].filter(Boolean)
    const rightParts = [dateSpan, locationSpan].filter(Boolean)

    const leftLine = cfg.titleVariant === "inline" ? leftParts.join(sep) : leftParts.join("<br>")
    const rightLine = cfg.dateVariant === "inline" ? rightParts.join(sep) : rightParts.join("<br>")

    const description = item.description ? `<div class="education-description">${esc(item.description)}</div>` : ""

    return `<li class="education-item">
      <div class="education-item-content">
        <div class="education-item-left">${leftLine}</div>
        <div class="education-item-right">${rightLine}</div>
      </div>
      ${description}
    </li>`
  })

  const header = s.isTitleVisible ? renderSectionTitle(s.title, general.headings) : ""

  return `${header}<ul class="education-section text-body">${rows.join("")}</ul>`
}
