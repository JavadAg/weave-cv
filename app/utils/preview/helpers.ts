import { icons } from "@iconify-json/lucide"
import { getIconData, iconToHTML, iconToSVG, replaceIDs } from "@iconify/utils"
import DOMPurify from "dompurify"

export const createOptionsFromEnum = (enumValues: readonly string[], labelFormatter?: (value: string) => string) => {
  return enumValues.map((value) => ({
    label: labelFormatter ? labelFormatter(value) : value,
    value
  }))
}

export function getIcon(icon: string, size: number) {
  const iconData = getIconData(icons, icon)
  if (!iconData) {
    throw new Error(`Icon "${icon}" is missing`)
  }

  const renderData = iconToSVG(iconData, {
    height: size,
    width: size
  })

  return iconToHTML(replaceIDs(renderData.body), renderData.attributes)
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
