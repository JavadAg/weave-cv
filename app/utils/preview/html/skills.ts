import type { SectionByType, TConfigs } from "~/types/resume.types"
import { esc, renderSectionTitle, SEP } from "./shared"

export function renderSkills(s: SectionByType<"skills">, cfg: TConfigs["skills"], general: TConfigs["general"]) {
  const blocks = (() => {
    if (cfg.variant === "inline") {
      const groupSep = SEP[cfg.separator] ?? " "
      const line = s.data
        .map((grp) => {
          const itemsJoined = grp.items.map((it) => esc(it.label)).join(", ")
          return `<span><span class="skills-group-title">${esc(grp.title)}</span> ${itemsJoined}</span>`
        })
        .join(groupSep)

      return [`<li class="skills-item-inline"><div class="skills-inline-content">${line}</div></li>`]
    }

    return s.data.map((grp) => {
      const itemsHtml = `<div class="skills-items-container">${grp.items
        .map((it) => `<span class="skills-item-label">${esc(it.label)}</span>`)
        .join("")}</div>`

      return `<li class="skills-item-stacked">
        <div class="skills-group-title">${esc(grp.title)}</div>
        ${itemsHtml}
      </li>`
    })
  })()

  const header = s.isTitleVisible ? renderSectionTitle(s.title, general.headings) : ""

  const sectionClass = (() => {
    switch (cfg.variant) {
      case "inline": {
        return "skills-section-inline"
      }
      case "grid": {
        return "skills-section-grid"
      }
      case "stacked": {
        return "skills-section-stacked"
      }
      default: {
        return "skills-section-stacked"
      }
    }
  })()

  return `${header}<ul class="${sectionClass} text-body">${blocks.join("")}</ul>`
}
