import type { SectionByType, TConfigs } from "~/types/resume.types"
import { esc, renderSectionTitle, SEP } from "./shared"

export function renderLanguages(
  s: SectionByType<"languages">,
  cfg: TConfigs["languages"],
  general: TConfigs["general"]
) {
  const blocks = (() => {
    if (cfg.variant === "inline") {
      const groupSep = SEP[cfg.separator] ?? " "
      const line = s.data
        .map((grp) => {
          return `<span><span class="languages-group-title">${esc(grp.title)}</span> ${esc(grp.description ?? "")}</span>`
        })
        .join(groupSep)

      return [`<li class="languages-item-inline"><div class="languages-inline-content">${line}</div></li>`]
    }

    return s.data.map((grp) => {
      const itemsHtml = `<span class="languages-item-description">${esc(grp.description ?? "")}</span>`

      return `<li class="languages-item-stacked">
        <div class="languages-group-title">${esc(grp.title)}</div>
        ${itemsHtml}
      </li>`
    })
  })()

  const header = s.isTitleVisible ? renderSectionTitle(s.title, general.headings) : ""

  const sectionClass = (() => {
    switch (cfg.variant) {
      case "inline": {
        return "languages-section-inline"
      }
      case "grid": {
        return "languages-section-grid"
      }
      case "stacked": {
        return "languages-section-stacked"
      }
      default: {
        return "languages-section-stacked"
      }
    }
  })()

  return `${header}<div class="${sectionClass} text-body">${blocks.join("")}</div>`
}
