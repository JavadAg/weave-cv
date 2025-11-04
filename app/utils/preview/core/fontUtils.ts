import { LocalFonts } from "~/constants/fonts"

// ---------- Types ----------
export type CatalogItem = { family: string; category?: string }

export type FontWeight = "400" | "700"

export type FontRequest = {
  family: string
  weights?: FontWeight[]
  ital?: boolean
}

export async function preloadLocalFont(family: string) {
  const cuts = LocalFonts[family]
  if (!cuts) return

  const faces = cuts.map((cut) => {
    const [weight] = cut.split("-") as [string, "normal" | "italic"]
    return `${weight} 16px "${family}"`
  })

  await Promise.all(faces.map((face) => document.fonts.load(face)))
  await document.fonts.ready
}

const loadedFonts: Record<string, boolean> = {}

export function loadLocalFont(family: string) {
  if (loadedFonts[family]) return

  const css = buildFontCss(family)
  if (!css) return

  const style = document.createElement("style")
  style.append(document.createTextNode(css))
  document.head.append(style)

  loadedFonts[family] = true
}

function normalizeFontName(family: string) {
  return family.toLowerCase().replaceAll(/\s+/g, "")
}

export function buildFontCss(family: string): string {
  const cuts = LocalFonts[family]
  if (!cuts) return ""

  const normalized = normalizeFontName(family)

  return cuts
    .map((cut) => {
      const [weight, style] = cut.split("-") as [string, "normal" | "italic"]

      const url = `/fonts/${normalized}/${normalized}-${weight}-${style}.woff2`

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
