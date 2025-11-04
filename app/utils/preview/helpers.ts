import { icons } from "@iconify-json/lucide"
import { getIconData, iconToHTML, iconToSVG, replaceIDs } from "@iconify/utils"
import clsx, { type ClassValue } from "clsx"
import DOMPurify from "dompurify"
import { twMerge } from "tailwind-merge"
import { MM_TO_PX, PAPER_SIZES, type TPaperSize } from "~/constants/papers"
import type { TBasicContent } from "../schemas/content.schema"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const createOptionsFromEnum = (enumValues: readonly string[], labelFormatter?: (value: string) => string) => {
  return enumValues.map((value) => ({
    label: labelFormatter ? labelFormatter(value) : value,
    value
  }))
}

export const pxToMM = (px: number) => (px * 25.4) / 96
export const sizeToPx = (size: TPaperSize, v: "h" | "w") => Math.trunc(PAPER_SIZES[size][v] * MM_TO_PX)

export const convertMmToPx = (mm: number) => {
  return mm * 3.779_527_559_055_118
}
export const convertPxToMm = (px: number) => {
  return px / 3.779_527_559_055_118
}

// _r
export const calculateLineHeight = (lineHeightPct: number, fontSizePt: number): number => {
  const lineHeight = lineHeightPct * ((fontSizePt / 3) * 4)
  return Math.round(lineHeight)
}

// uo
export function getPageDimensionsInPx(paperSize: string) {
  const dimensions = {
    widthInPx: 0,
    heightInPx: 0
  }

  if (paperSize === "A4") {
    dimensions.widthInPx = 793.700_787_4
    dimensions.heightInPx = 1122.519_685
  } else {
    dimensions.widthInPx = 816
    dimensions.heightInPx = 1056
  }

  return dimensions
}

export const calculateHeaderMargin = (verticalMarginMm: number, isFirstPage = false) => {
  let headerAdjustment = 2
  if (isFirstPage) {
    headerAdjustment = 6
  }
  return verticalMarginMm - convertPxToMm(headerAdjustment)
}

export const hasValidDescription = (contents: TBasicContent[]) => {
  return contents.some((content) => content.description && content.description.trim().length > 0)
}

export function getIcon(icon: string, size: number) {
  try {
    const iconData = getIconData(icons, icon)
    if (!iconData) {
      console.warn(`Icon "${icon}" is missing`)
      return ""
    }

    const renderData = iconToSVG(iconData, {
      height: size,
      width: size
    })

    return iconToHTML(replaceIDs(renderData.body), renderData.attributes)
  } catch (error) {
    console.warn(`Error rendering icon "${icon}":`, error)
    return ""
  }
}

export const sanitizeRichHtml = (html: string) =>
  DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      "p",
      "br",
      "ul",
      "ol",
      "li",
      "span",
      "a",
      "strong",
      "b",
      "em",
      "i",
      "u",
      "s",
      "del",
      "mark",
      "code",
      "pre",
      "blockquote",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "img",
      "div"
    ],
    ALLOWED_ATTR: ["href", "title", "alt", "rel", "target", "class", "style", "data-type"]
  })
