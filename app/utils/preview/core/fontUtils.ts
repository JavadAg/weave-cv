import { FONTS_CUTS, type TFontFamily } from "~/constants/fonts"
import type { TFontStyle, TFontWeight } from "~/utils/schemas/shared.schema"

export async function preloadLocalFont(family: TFontFamily) {
  const cuts = FONTS_CUTS[family]
  if (!cuts) return

  const faces = cuts.map((cut) => {
    const [weight] = cut.split("-")
    return `${weight} 16px "${family}"`
  })

  await Promise.all(faces.map((face) => document.fonts.load(face)))
  await document.fonts.ready
}

const loadedFonts: Partial<Record<TFontFamily, boolean>> = {}

export function loadLocalFont(family: TFontFamily) {
  if (loadedFonts[family]) return

  const css = buildFontCss(family)
  if (!css) return

  const style = document.createElement("style")
  style.append(document.createTextNode(css))
  document.head.append(style)

  loadedFonts[family] = true
}

function normalizeFontName(family: TFontFamily) {
  return family.toLowerCase().replaceAll(/\s+/g, "")
}

export function buildFontCss(family: TFontFamily, baseUrl?: string) {
  const cuts = FONTS_CUTS[family]
  if (!cuts) return ""

  const normalized = normalizeFontName(family)

  return cuts
    .map((cut) => {
      const [weight, style] = cut.split("-") as [TFontWeight, TFontStyle]

      const url = baseUrl
        ? `${baseUrl}/fonts/${normalized}/${normalized}-${weight}-${style.toLowerCase()}.woff2`
        : `/fonts/${normalized}/${normalized}-${weight}-${style.toLowerCase()}.woff2`

      return `
      @font-face {
        font-family: '${family}';
        src: url('${url}') format('woff2');
        font-weight: ${weight};
        font-style: ${style};
        font-display: swap;
      }`
    })
    .join(" ")
}
