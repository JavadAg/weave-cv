import type { SectionByType, TConfigs, TContent } from "~/types/resume.types"
import { buildGlobalCss } from "./css/css"
import { renderExperience } from "./html/experience"
import { renderPersonal } from "./html/personal"
import { renderSummary } from "./html/summary"

type AnyRenderable = SectionByType<"summary" | "experience" | "education" | "projects" | "skills" | "languages">

function wrapSection(id: string, type: string, innerHtml: string) {
  return `<section data-section="${type}" data-id="${id}" data-splittable="items">${innerHtml}</section>`
}

function interleave<T>(a: T[], b: T[]): T[] {
  const out: T[] = []
  const max = Math.max(a.length, b.length)
  for (let i = 0; i < max; i++) {
    if (i < a.length) out.push(a[i] as T)
    if (i < b.length) out.push(b[i] as T)
  }
  return out
}

// ---- renderers -----------------------------------------------------------

function renderSection(section: AnyRenderable, configs: TConfigs) {
  switch (section.type) {
    case "summary": {
      return renderSummary(section, configs.summary, configs.general)
    }
    case "experience": {
      return renderExperience(section, configs.experience, configs.general)
    }
    /* case "education": {
      return renderEducation(section, configs.education, configs.general)
    }
    case "projects": {
      return renderProjects(section, configs.projects, configs.general)
    }
    case "skills": {
      return renderSkills(section, configs.skills, configs.general)
    }
    case "languages": {
      return renderLanguages(section, configs.languages, configs.general)
    } */
    default: {
      return ""
    }
  }
}

// ---- main ---------------------------------------------------------------

export function renderHtml(content: TContent, configs: TConfigs) {
  const { columns, personalPosition, order } = configs.general.layout

  const sectionsArr = Object.values(content).filter((s) => s.isSectionVisible !== false)

  const personalSection = sectionsArr.find((s) => s.type === "personal") as SectionByType<"personal">
  const personalHtml = wrapSection(personalSection.id, "personal", renderPersonal(personalSection, configs.personal))

  const otherSections = sectionsArr.filter((s) => s.type !== "personal")

  const byId = (id: string) => otherSections.find((s) => s.id === id)
  const renderAndWrap = (s: AnyRenderable) => wrapSection(s.id, s.type, renderSection(s, configs))

  let queueHtml = ""

  if (personalPosition === "top") {
    // One column
    if (columns === "1") {
      const sections = order.oneCol.map((id) => byId(id)).filter(Boolean) as AnyRenderable[]

      console.log("sections", sections)

      queueHtml = sections.map((s) => renderAndWrap(s)).join("")

      return `${personalHtml}${queueHtml}`
      // Two column
    } else {
      const left = order.twoCol.left.map((s) => byId(s)).filter(Boolean) as AnyRenderable[]
      const right = order.twoCol.right.map((s) => byId(s)).filter(Boolean) as AnyRenderable[]

      const combined = interleave(left, right)
      queueHtml = combined.map((s) => renderAndWrap(s)).join("")

      return `${personalHtml}${queueHtml}`
    }
  }

  // For sidebar layouts, use the same logic as top layouts based on columns
  if (columns === "1") {
    const sections = order.oneCol?.length
      ? (order.oneCol.map((s) => byId(s)).filter(Boolean) as AnyRenderable[])
      : otherSections
    queueHtml = sections.map((s) => renderAndWrap(s)).join("")
  } else {
    const left = (order.twoCol?.left ?? []).map((s) => byId(s)).filter(Boolean) as AnyRenderable[]
    const right = (order.twoCol?.right ?? []).map((s) => byId(s)).filter(Boolean) as AnyRenderable[]

    const combined = interleave(left, right)
    queueHtml = combined.map((s) => renderAndWrap(s)).join("")
  }

  return `${personalHtml}${queueHtml}`
}

export async function buildPreview(content: TContent, configs: TConfigs) {
  const html = renderHtml(content, configs)
  const css = buildGlobalCss(configs)

  return { html, css }
}
