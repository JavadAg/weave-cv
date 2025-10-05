import type { SectionByType, TConfigs } from "~/types/resume.types"
import { esc, SEP } from "~/utils/preview/html/shared"
import type { TPersonalData } from "~/utils/schemas/content.schema"
import { getIcon } from "../helpers"
import { renderLink } from "./shared"

export function renderPersonal(s: SectionByType<"personal">, cfg: TConfigs["personal"]) {
  const d = s.data

  let title = ""
  let subtitle = ""
  const details = []

  const titleAndSubtitleDisplayClass = cfg.main.variant === "inline" ? "personal-title-inline" : "personal-title-grid"
  const wrapperDisplayClass = cfg.variant === "inline" ? "personal-wrapper-inline" : "personal-wrapper-grid"

  if (d.title.isVisible) {
    title = `<h1>${esc(d.title.text)}</h1>`
  }

  if (d.subtitle.isVisible) {
    subtitle = `<p class="personal-subtitle">${esc(d.subtitle.text)}</p>`
  }

  function renderDetailItem(detail: TPersonalData["details"][number]) {
    const iconAlign = cfg.details.icon.align
    const iconHtml = `<span class="personal-detail-icon personal-detail-icon-${iconAlign}">${getIcon(detail.icon, cfg.details.icon.size)}</span>`

    let content: string
    if (iconAlign === "left") {
      content = `${iconHtml}${esc(detail.value)}`
    } else if (iconAlign === "right") {
      content = `${esc(detail.value)}${iconHtml}`
    } else {
      content = esc(detail.value)
    }

    if (detail.url) {
      return renderLink(content, detail.url, false, false)
    }

    return `<span class="personal-detail-item">${content}</span>`
  }

  // Render Details
  const visibleDetails = d.details.filter((detail) => detail.isVisible)

  if (visibleDetails.length > 0) {
    const sep = SEP[cfg.details.separator] ?? " "

    switch (cfg.details.variant) {
      case "inline": {
        const spans = visibleDetails.map((detail) => renderDetailItem(detail)).join(sep)
        details.push(`<p class="personal-details personal-details-inline text-body">${spans}</p>`)
        break
      }
      case "stacked": {
        const spans = visibleDetails.map((detail) => renderDetailItem(detail))
        details.push(`<p class="personal-details personal-details-stacked text-body">${spans.join("")}</p>`)
        break
      }
      case "grid": {
        const spans = visibleDetails.map((detail) => renderDetailItem(detail))
        details.push(`<p class="personal-details personal-details-grid text-body">${spans.join("")}</p>`)
        break
      }
    }
  }

  return `<section data-type="personal" class="${wrapperDisplayClass}"><div class="${titleAndSubtitleDisplayClass}">${title}${subtitle}</div>${details.join("")}</section>`
}
