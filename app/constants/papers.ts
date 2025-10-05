export const PAPER_SIZES = {
  A4: {
    h: 297 + 2,
    w: 210
  },
  Letter: {
    h: 279.4 + 3,
    w: 215.9
  }
}

export const MM_TO_PX = 3.78

export type TPaperSize = keyof typeof PAPER_SIZES

export const pxToMM = (px: number) => (px * 25.4) / 96
export const sizeToPx = (size: TPaperSize, v: "h" | "w") => Math.trunc(PAPER_SIZES[size][v] * MM_TO_PX)

export const PX_PER_MM = 96 / 25.4

export function pxFromMM(mm: number) {
  return mm * PX_PER_MM
}
