import { calculatePageHeight } from "~/utils/preview/core/pageHeight"
import type { TResumeElement, TResumeElements } from "~/utils/preview/core/types"

interface IProcessPagesProps {
  blocks: Map<string, TResumeElement>
  elements: TResumeElements[]
}

interface ColumnState {
  heading: TResumeElement | undefined
  height: number
  done: boolean
  ids: string[]
}

const isHeading = (id: string): boolean => id.endsWith("Heading")
const isSpace = (id: string): boolean => id.endsWith("Space") || id === "personalSpace"

function processColumnElement(
  element: TResumeElement | undefined,
  state: ColumnState,
  pageHeightLimit: number,
  column: TResumeElement[]
): boolean {
  if (!element || state.done) return false

  if (isHeading(element.id)) {
    state.heading = element
    state.ids.shift()
    return true
  }

  const totalHeight = element.height + (state.heading?.height ?? 0)
  const shouldSkipSpace = state.height === 0 && isSpace(element.id) && element.height !== 0
  const fitsOnPage = state.height === 0 || state.height + totalHeight < pageHeightLimit

  if (shouldSkipSpace) {
    state.ids.shift()
    return true
  }

  if (fitsOnPage) {
    if (state.heading) {
      column.push(state.heading)
      state.heading = undefined
    }
    column.push(element)
    state.height += totalHeight
    state.ids.shift()
    return true
  }

  state.done = true
  return false
}

function processTwoColumnElement(
  element: { leftCol: TResumeElement[]; rightCol: TResumeElement[] },
  blocks: Map<string, TResumeElement>,
  processedPages: Array<Array<TResumeElements>>,
  config: {
    size: string
    verticalMargin: number
    isTopPersonal: boolean
    isFirstPage: boolean
    currentHeight: number
  }
) {
  const lastPage = processedPages.at(-1) as Array<{ leftCol: TResumeElement[]; rightCol: TResumeElement[] }>
  if (!lastPage?.at(-1)?.leftCol) {
    lastPage?.push({ leftCol: [], rightCol: [] })
  }

  const leftState: ColumnState = {
    heading: undefined,
    height: config.currentHeight,
    done: false,
    ids: element.leftCol.map((e) => e.id)
  }

  const rightState: ColumnState = {
    heading: undefined,
    height: config.currentHeight,
    done: false,
    ids: element.rightCol.map((e) => e.id)
  }

  let isFirstPage = config.isFirstPage

  while (leftState.ids.length > 0 || rightState.ids.length > 0) {
    const pageHeightLimit = calculatePageHeight({
      pageFormat: config.size,
      verticalMargin: config.verticalMargin,
      isTopPersonal: config.isTopPersonal,
      isFirstPage
    })

    const currentPage = processedPages.at(-1)
    const currentCol = currentPage?.at(-1) as { leftCol: TResumeElement[]; rightCol: TResumeElement[] }

    const leftElement = blocks.get(leftState.ids[0] ?? "")
    const rightElement = blocks.get(rightState.ids[0] ?? "")

    processColumnElement(leftElement, leftState, pageHeightLimit, currentCol.leftCol)
    processColumnElement(rightElement, rightState, pageHeightLimit, currentCol.rightCol)

    const needsNewPage =
      (leftState.done && rightState.done) ||
      (leftState.ids.length === 0 && rightState.done) ||
      (rightState.ids.length === 0 && leftState.done)

    if (needsNewPage) {
      processedPages.push([{ leftCol: [], rightCol: [] }])
      leftState.height = 0
      rightState.height = 0
      leftState.done = false
      rightState.done = false
      isFirstPage = false
    }
  }

  return { isFirstPage, currentHeight: Math.max(leftState.height, rightState.height) }
}

function processSingleColumnElement(
  element: TResumeElement,
  processedPages: Array<Array<TResumeElements>>,
  heading: { current: TResumeElement | undefined },
  config: {
    size: string
    verticalMargin: number
    isTopPersonal: boolean
    isFirstPage: boolean
    currentHeight: number
  }
) {
  const pageHeightLimit = calculatePageHeight({
    pageFormat: config.size,
    verticalMargin: config.verticalMargin,
    isTopPersonal: config.isTopPersonal,
    isFirstPage: config.isFirstPage
  })

  let { currentHeight, isFirstPage } = config

  if (isHeading(element.id)) {
    heading.current = element
    return { isFirstPage, currentHeight }
  }

  const totalHeight = element.height + (heading.current?.height ?? 0)
  const shouldSkipSpace = currentHeight === 0 && isSpace(element.id) && element.height !== 0

  if (shouldSkipSpace) {
    return { isFirstPage, currentHeight }
  }

  if (currentHeight > 0 && currentHeight + totalHeight > pageHeightLimit) {
    processedPages.push([])
    currentHeight = 0
    isFirstPage = false
  }

  if (heading.current) {
    processedPages.at(-1)?.push(heading.current)
    heading.current = undefined
  }

  processedPages.at(-1)?.push(element)
  currentHeight += totalHeight

  return { isFirstPage, currentHeight }
}

export function processPages({ blocks, elements }: IProcessPagesProps) {
  const processedPages = [[]] as Array<Array<TResumeElements>>

  const configsStore = useConfigsStore()
  const { configs } = storeToRefs(configsStore)

  const {
    general: {
      layout: { verticalMargin, size, personalPosition }
    }
  } = configs.value

  const isTopPersonal = personalPosition === "top"
  const config = { size, verticalMargin, isTopPersonal }

  const heading = { current: undefined as TResumeElement | undefined }
  let currentHeight = 0
  let isFirstPage = true

  for (const element of elements) {
    if (!element) continue

    if ("leftCol" in element && "rightCol" in element && (element.leftCol.length > 0 || element.rightCol.length > 0)) {
      const result = processTwoColumnElement(element, blocks, processedPages, {
        ...config,
        isFirstPage,
        currentHeight
      })

      isFirstPage = result.isFirstPage
      currentHeight = result.currentHeight
    } else if ("id" in element) {
      const result = processSingleColumnElement(element, processedPages, heading, {
        ...config,
        isFirstPage,
        currentHeight
      })
      isFirstPage = result.isFirstPage
      currentHeight = result.currentHeight
    }
  }

  return processedPages
}
