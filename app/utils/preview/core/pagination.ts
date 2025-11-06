import { calculatePageHeight } from "~/utils/preview/core/pageHeight"
import type { TResumeElement, TResumeElements } from "~/utils/preview/core/types"

interface IProcessPagesProps {
  resumeElements: Record<string, TResumeElement>
  elements: Array<Array<TResumeElements>>
}

export function processPages({ resumeElements, elements }: IProcessPagesProps) {
  const processedPages = [[]] as Array<Array<TResumeElements>>

  const configsStore = useConfigsStore()
  const { configs } = storeToRefs(configsStore)

  const {
    general: {
      layout: { verticalMargin, size, personalPosition }
    }
  } = configs.value

  const isHeaderBackgroundActive = personalPosition === "top"

  let currentHeading: TResumeElement | undefined
  let currentLeftHeading: TResumeElement | undefined
  let currentRightHeading: TResumeElement | undefined
  let currentHeight = 0
  let isFirstPage = true

  for (const page of elements) {
    for (const element of page) {
      if (!element) continue

      if (
        "leftCol" in element &&
        "rightCol" in element &&
        (element.leftCol.length > 0 || element.rightCol.length > 0)
      ) {
        const lastPage = processedPages.at(-1) as Array<{ leftCol: TResumeElement[]; rightCol: TResumeElement[] }>
        if (!lastPage?.at(-1)?.leftCol) {
          lastPage?.push({ leftCol: [], rightCol: [] })
        }

        const leftIds = element.leftCol.map((e) => e.id)
        const rightIds = element.rightCol.map((e) => e.id)
        let leftHeight = currentHeight
        let rightHeight = currentHeight
        let leftDone = false
        let rightDone = false

        while (leftIds.length > 0 || rightIds.length > 0) {
          const pageHeightLimit = calculatePageHeight({
            pageFormat: size,
            verticalMargin,
            isHeaderBackgroundActive,
            isFirstPage
          })

          const leftElement = resumeElements[leftIds[0] ?? ""]
          if (leftElement && !leftDone) {
            if (leftElement.type === "heading") {
              currentLeftHeading = leftElement
              leftIds.splice(0, 1)
            } else {
              let elementHeight = leftElement.height
              if (currentLeftHeading) elementHeight += currentLeftHeading.height
              if (leftHeight === 0 && leftElement.type === "space" && leftElement.height !== 0) {
                leftIds.splice(0, 1)
              } else if (leftHeight + elementHeight < pageHeightLimit || leftHeight === 0) {
                const currentPage = processedPages.at(-1)
                const currentCol = currentPage?.at(-1) as { leftCol: TResumeElement[]; rightCol: TResumeElement[] }
                if (currentLeftHeading) {
                  currentCol.leftCol.push(currentLeftHeading)
                  currentLeftHeading = undefined
                }
                currentCol.leftCol.push(leftElement)
                leftHeight += elementHeight
                leftIds.splice(0, 1)
              } else {
                leftDone = true
              }
            }
          }

          const rightElement = resumeElements[rightIds[0] ?? ""]
          if (rightElement && !rightDone) {
            if (rightElement.type === "heading") {
              currentRightHeading = rightElement
              rightIds.splice(0, 1)
            } else {
              let elementHeight = rightElement.height
              if (currentRightHeading) elementHeight += currentRightHeading.height
              if (rightHeight === 0 && rightElement.type === "space" && rightElement.height !== 0) {
                rightIds.splice(0, 1)
              } else if (rightHeight + elementHeight < pageHeightLimit || rightHeight === 0) {
                const currentPage = processedPages.at(-1)
                const currentCol = currentPage?.at(-1) as { leftCol: TResumeElement[]; rightCol: TResumeElement[] }
                if (currentRightHeading) {
                  currentCol.rightCol.push(currentRightHeading)
                  currentRightHeading = undefined
                }
                currentCol.rightCol.push(rightElement)
                rightHeight += elementHeight
                rightIds.splice(0, 1)
              } else {
                rightDone = true
              }
            }
          }

          if ((leftDone && rightDone) || (leftIds.length === 0 && rightDone) || (rightIds.length === 0 && leftDone)) {
            processedPages.push([{ leftCol: [], rightCol: [] }])
            leftHeight = 0
            rightHeight = 0
            currentHeight = 0
            leftDone = false
            rightDone = false
            isFirstPage = false
          }
        }
        currentHeight = Math.max(leftHeight, rightHeight)
      } else if ("id" in element) {
        const pageHeightLimit = calculatePageHeight({
          pageFormat: size,
          verticalMargin,
          isHeaderBackgroundActive,
          isFirstPage
        })

        if (element.type === "heading") {
          currentHeading = element
        } else {
          let elementHeight = element.height
          if (currentHeading) elementHeight += currentHeading.height
          if (currentHeight + elementHeight > pageHeightLimit) {
            processedPages.push([])
            currentHeight = 0
            isFirstPage = false
          }
          if (!(currentHeight === 0 && element.type === "space" && element.height !== 0)) {
            if (currentHeading) {
              processedPages.at(-1)?.push(currentHeading)
              currentHeading = undefined
            }
            currentHeight += elementHeight

            processedPages.at(-1)?.push(element)
          }
        }
      }
    }
  }

  return processedPages
}
