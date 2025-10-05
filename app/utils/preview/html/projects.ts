import type { SectionByType, TConfigs } from "~/types/resume.types"
import { esc, fmtDate, renderSectionTitle, SEP } from "./shared"

const renderField = (text: string, fieldType: string, isVisible: boolean = true) => {
  if (!isVisible || !text) return ""
  return `<span class="projects-${fieldType}">${text}</span>`
}

const renderDate = (
  from: string | undefined,
  to: string | undefined,
  generalCfg: TConfigs["general"],
  isVisible: boolean = true
) => {
  if (!isVisible || !from) return ""
  const format = generalCfg.layout.dateFormat
  const toFormatted = to ? fmtDate(to, format) : "Present"
  const dateText = `${fmtDate(from, format)} – ${toFormatted}`
  return `<span class="projects-date">${dateText}</span>`
}

export function renderProjects(
  s: SectionByType<"projects">,
  configs: TConfigs["projects"],
  general: TConfigs["general"]
) {
  const sep = SEP[configs.separator] ?? " "

  const rows = s.data
    .filter((it) => it.isVisible)
    .map((p) => {
      const titleText = p.url
        ? `<a data-styled="true" href="${esc(p.url)}" rel="noopener" target="_blank">${esc(p.title)}</a>`
        : esc(p.title)
      const titleEl = renderField(titleText, "title")
      const subtitleEl = renderField(p.subtitle, "subtitle")
      const titleParts = [titleEl, subtitleEl].filter(Boolean)
      const titleContent = configs.titleVariant === "inline" ? titleParts.join(sep) : titleParts.join("<br>")

      const dateEl = renderDate(p.from, p.to, general)

      const headerContent = (() => {
        if (configs.dateVariant === "inline" && dateEl) {
          const parts = [titleContent, dateEl].filter(Boolean)
          return parts.join(sep)
        }
        return `<div class="projects-item-header-split">
        <div class="projects-item-header-left">${titleContent}</div>
        <div class="projects-item-header-right">${dateEl}</div>
      </div>`
      })()

      const description = p.description ? `<div class="projects-description">${esc(p.description)}</div>` : ""
      const stack = p.stack?.length
        ? `<div class="projects-stack">${p.stack.map((t) => `<span>${esc(t)}</span>`).join(" · ")}</div>`
        : ""
      const bullets = p.bullets?.length ? `<div class="projects-item-bullets" v-html="${p.bullets}"></div>` : ""

      return `<li class="projects-item">${headerContent}${description}${stack}${bullets}</li>`
    })

  const header = s.isTitleVisible ? renderSectionTitle(s.title, general.headings) : ""

  return `${header}<ul class="projects-section text-body">${rows.join("")}</ul>`
}
