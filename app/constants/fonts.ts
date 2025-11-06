export type TFontCut = `${number}-${"normal" | "italic"}`

export type TFontFamily = (typeof FONT_OPTIONS)[number]["value"]

export const FONT_OPTIONS = [
  { label: "Calibri", value: "calibri" },
  { label: "Cambria", value: "cambria" },
  { label: "Fira Sans", value: "firasans" },
  { label: "Garamond", value: "garamond" },
  { label: "Georgia", value: "georgia" },
  { label: "Helvetica", value: "helvetica" },
  { label: "Inter", value: "inter" },
  { label: "Lato", value: "lato" },
  { label: "Open Sans", value: "opensans" },
  { label: "Source Sans Pro", value: "sourcesanspro" },
  { label: "Space Mono", value: "spacemono" },
  { label: "Times New Roman", value: "timesnewroman" },
  { label: "Titillium Web", value: "titilliumweb" },
  { label: "Verdana", value: "verdana" },
  { label: "ایران سنس", value: "iransans" },
  { label: "Noto Sans Arabic", value: "notosansarabic" },
  { label: "ساحل", value: "sahel" },
  { label: "صمیم", value: "samim" },
  { label: "شبنم", value: "shabnam" },
  { label: "وزیر", value: "vazirmatn" }
] as const

export const FONTS_CUTS: Record<TFontFamily, TFontCut[]> = {
  calibri: ["400-normal", "700-normal", "400-italic", "700-italic"],
  cambria: ["400-normal", "700-normal", "400-italic", "700-italic"],
  firasans: ["400-normal", "700-normal", "400-italic", "700-italic"],
  garamond: ["400-normal", "700-normal", "400-italic", "700-italic"],
  georgia: ["400-normal", "700-normal", "400-italic", "700-italic"],
  helvetica: ["400-normal", "700-normal", "400-italic", "700-italic"],
  inter: ["400-normal", "700-normal", "400-italic", "700-italic"],
  lato: ["400-normal", "700-normal", "400-italic", "700-italic"],
  opensans: ["400-normal", "700-normal", "400-italic", "700-italic"],
  sourcesanspro: ["400-normal", "700-normal", "400-italic", "700-italic"],
  spacemono: ["400-normal", "700-normal", "400-italic", "700-italic"],
  timesnewroman: ["400-normal", "700-normal", "400-italic", "700-italic"],
  titilliumweb: ["400-normal", "700-normal", "400-italic", "700-italic"],
  verdana: ["400-normal", "700-normal", "400-italic", "700-italic"],
  iransans: ["400-normal", "700-normal"],
  notosansarabic: ["400-normal", "700-normal"],
  sahel: ["400-normal", "700-normal"],
  samim: ["400-normal", "700-normal"],
  shabnam: ["400-normal", "700-normal"],
  vazirmatn: ["400-normal", "700-normal"]
}
