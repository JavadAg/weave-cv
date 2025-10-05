import type { SectionByType, TConfigs } from "~/types/resume.types"
import { renderDate, renderLink, renderSectionTitle, renderText, SEP } from "./shared"

const renderDescription = (description: string, bulletsConfig: { bulletStyle: string }) => {
  if (!description || description.trim() === "") {
    return ""
  }

  const hasListElements = /<(ul|ol|li)/i.test(description)

  if (hasListElements) {
    // If it's already a list, apply classes to make list styles visible
    const bulletClass =
      bulletsConfig.bulletStyle === "dash" ? "experience-bullets experience-bullet-dash" : "experience-bullets"

    // Extract list content and apply classes
    const listMatch = description.match(/<(ul|ol)[^>]*>(.*?)<\/(ul|ol)>/is)
    if (listMatch) {
      const listTag = listMatch[1]
      const listContent = listMatch[2]
      return `<${listTag} class="${bulletClass}">${listContent}</${listTag}>`
    }

    // If it's a list but doesn't match the pattern, wrap the whole content
    return `<div class="${bulletClass}">${description}</div>`
  } else {
    return `${description}`
  }
}

export function renderExperience(
  s: SectionByType<"experience">,
  cfg: TConfigs["experience"],
  general: TConfigs["general"]
) {
  const visibleItems = s.data.filter((item) => item.isVisible)
  const sep = SEP[cfg.separator]

  const items = visibleItems.map((item) => {
    const role = renderText(item.role, "experience-role")
    const company = renderLink(renderText(item.company, "experience-company"), item.url)
    const date = renderDate(item.from, item.to, general, item.present)
    const location = renderText(item.location, "experience-location")
    const description = renderDescription(item.description, cfg.bullets)

    let content = ""

    const renderRoleCompany = () => {
      const titleParts = [role, company].filter(Boolean)
      return cfg.titleVariant === "inline"
        ? `<div class="experience-title-inline">${titleParts.join(sep)}</div>`
        : `<div class="experience-title-stacked">${titleParts.join("")}</div>`
    }

    const renderDateLocation = () => {
      const dateParts = [date, location].filter(Boolean)
      return cfg.dateVariant === "inline" ? dateParts.join(sep) : dateParts.join("<br>")
    }

    switch (cfg.variant) {
      case "contentFirst": {
        const leftColumnContent = renderRoleCompany()
        const rightColumnContent = renderDateLocation()
        content = `<div class="experience-content-first">
          <div class="experience-content-first-content">
            <div>${leftColumnContent}</div>
            ${description}
          </div>
          <div class="experience-content-first-dates">
            ${rightColumnContent}
          </div>
        </div>`
        break
      }
      case "dateFirst": {
        const leftColumnContent = renderDateLocation()
        const rightColumnContent = renderRoleCompany()
        content = `<div class="experience-date-first">
          <div class="experience-date-first-dates">
            ${leftColumnContent}
          </div>
          <div class="experience-date-first-content">
            ${rightColumnContent}
            ${description}
          </div>
        </div>`
        break
      }
      case "stacked": {
        const leftColumnContent = renderRoleCompany()
        const rightColumnContent = renderDateLocation()
        const header = `<div class="experience-stacked-header"><div>${leftColumnContent}</div><div>${rightColumnContent}</div></div>`
        content = `${header}${description}`
        break
      }
    }

    return `<div data-item class="experience-item text-body">${content}</div>`
  })

  const header = s.isTitleVisible ? renderSectionTitle(s.title, general.headings) : ""

  return `${header}${items.join("")}`
}
