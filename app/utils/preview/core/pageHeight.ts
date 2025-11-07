import { convertMmToPx, getPageDimensionsInPx } from "~/utils/preview/helpers"

export interface PageHeightConfig {
  pageFormat: string
  verticalMargin: number
  isTopPersonal: boolean
  isFirstPage: boolean
}

export function calculatePageHeight({ pageFormat, verticalMargin, isTopPersonal, isFirstPage }: PageHeightConfig) {
  const marginPx = convertMmToPx(verticalMargin)

  const pageHeightPx = getPageDimensionsInPx(pageFormat).heightInPx

  let availableHeight = pageHeightPx - marginPx

  if (!isTopPersonal || !isFirstPage) {
    availableHeight -= marginPx
  }

  return availableHeight
}
