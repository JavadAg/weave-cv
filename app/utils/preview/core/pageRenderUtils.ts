import type { TResumeElement, TResumeElements } from "./types"

export function findPersonalElement(page: TResumeElements[]): TResumeElement | null {
  return (page.find((item) => "id" in item && item.id === "personal") as TResumeElement) || null
}

export function isPersonalElement(section: TResumeElements): boolean {
  return "id" in section && section.id === "personal"
}

export function isTwoColumnSection(
  section: TResumeElements
): section is { leftCol: TResumeElement[]; rightCol: TResumeElement[] } {
  return "leftCol" in section && "rightCol" in section && !!section.leftCol && !!section.rightCol
}

export function shouldRenderSection(section: TResumeElements, isTopPersonal: boolean, isFirstPage: boolean): boolean {
  if (!section) return false
  if (isTopPersonal && isFirstPage && isPersonalElement(section)) return false
  return true
}
