import { calculateHeaderMargin, convertMmToPx, getPageDimensionsInPx } from "~/utils/preview/helpers"

export interface PageHeightConfig {
  pageFormat: string
  verticalMargin: number
  isHeaderBackgroundActive: boolean
  isFirstPage: boolean
}

export function calculatePageHeight(config: PageHeightConfig): number {
  const { pageFormat, verticalMargin, isHeaderBackgroundActive, isFirstPage } = config

  const marginHeight = convertMmToPx(verticalMargin)

  let availableHeight = getPageDimensionsInPx(pageFormat).heightInPx - marginHeight * 2

  if (!isHeaderBackgroundActive || !isFirstPage) {
    availableHeight -= convertMmToPx(calculateHeaderMargin(verticalMargin, isFirstPage))
  }

  return availableHeight
}
