export type Font = {
  readonly name: string
  readonly fontFamily?: string
}

export type FontCut = `${number}-${"normal" | "italic"}`

export const LocalFonts: Record<string, FontCut[]> = {
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
