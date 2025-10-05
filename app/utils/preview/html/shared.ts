import type { TConfigs } from "~/types/resume.types"
import type { TSeparator } from "~/utils/schemas/shared.schema"

/**
 * Render functions
 */
export function renderSectionTitle(value: string, configs: TConfigs["general"]["headings"]) {
  const { variant } = configs
  const variantClass = `section-title-${variant}`

  return `<h2 data-section-header class="${variantClass}">${esc(value)}</h2>`
}

export function renderLink(value: string, url: string, showIcon: boolean = true, styled?: boolean) {
  return `<a style="gap: 4px; max-width: fit-content;" data-styled="${styled ?? true}" href="${esc(url)}" data-link-icon="${showIcon}" target="_blank" rel="noopener noreferrer" class="center">${value}</a>`
}

export function renderText(value: string, classNames?: string) {
  return `<div class="${classNames ?? ""} text-body">${value}</div>`
}

export const renderDate = (from: string, to: string, general: TConfigs["general"], present?: boolean) => {
  const format = general.layout.dateFormat
  const toFormatted = present ? "Present" : fmtDate(to, format)
  const dateText = `${fmtDate(from, format)} – ${toFormatted}`

  return `<span class="date">${dateText}</span>`
}

/**
 * Helper functions
 */
export const fmtDate = (iso: string, format: string) => {
  const date = new Date(iso)
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
  const shortMonthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  return format
    .replaceAll("YYYY", year.toString())
    .replaceAll("YY", year.toString().slice(-2))
    .replaceAll("MMMM", monthNames[month] || "")
    .replaceAll("MMM", shortMonthNames[month] || "")
    .replaceAll("MM", (month + 1).toString().padStart(2, "0"))
    .replaceAll("DD", day.toString().padStart(2, "0"))
}

export const SEP: Record<TSeparator, string> = {
  pipe: " | ",
  dot: " · ",
  slash: " / ",
  dash: " - ",
  comma: ", ",
  none: ""
}

export const esc = (s: string) =>
  s.replaceAll(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[m]!)
