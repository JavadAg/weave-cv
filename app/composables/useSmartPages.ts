import { unref as vueUnref } from "vue"
import { PX_PER_MM } from "~/constants/papers"
import {
  createColumn,
  createGrid,
  createPageShell,
  createSidebarLayout,
  fillColumn,
  mountStagingClone
} from "~/utils/preview/dom"

export type PageSize = { h: number; w: number }
export type PageMargins = Required<{ top: number; bottom: number; left: number; right: number }>
export type PageLayout = {
  columns: 1 | 2
  gapPx: number
  personalPosition: "top" | "left" | "right"
}
export type SectionOrder = {
  oneCol?: string[]
  twoCol?: {
    left: string[]
    right: string[]
  }
}

export function useResumePagination(
  host: Ref<HTMLElement | null>,
  html: MaybeRef<string>,
  size: MaybeRef<PageSize>,
  margins: MaybeRef<PageMargins>,
  layout: MaybeRef<PageLayout>,
  sectionOrder: MaybeRef<SectionOrder>
) {
  const render = async () => {
    const wrapper = host.value
    const htmlVal = vueUnref(html)

    if (!wrapper || !htmlVal) return

    const staging = mountStagingClone(wrapper, htmlVal)

    try {
      const pageSize = vueUnref(size)
      const marginsVal = vueUnref(margins)
      const layoutVal = vueUnref(layout)
      const sectionOrderVal = vueUnref(sectionOrder)

      const pagedFragment = paginate(staging, pageSize, marginsVal, layoutVal, sectionOrderVal)

      wrapper.innerHTML = ""
      wrapper.classList.add("resume-root")
      wrapper.append(pagedFragment)
    } finally {
      staging.remove()
    }
  }

  watchThrottled([size, margins, html, layout, sectionOrder], render, { throttle: 200 })
}

function paginate(
  stagingRoot: HTMLElement,
  pageSize: PageSize,
  margins: PageMargins,
  layout: PageLayout,
  sectionOrder: SectionOrder
): DocumentFragment {
  const frag = document.createDocumentFragment()
  const pages: HTMLElement[] = []

  const pageW = pageSize.w * PX_PER_MM
  const pageH = pageSize.h * PX_PER_MM
  const gapPx = layout.gapPx

  const contentW = pageW - (margins.left + margins.right)
  const contentH = pageH - (margins.top + margins.bottom)

  const allSections = [...stagingRoot.querySelectorAll<HTMLElement>("[data-section]")]
  const personal = allSections.find((el) => el.dataset.section === "personal") || null
  const others = allSections.filter((el) => el !== personal)

  // Create section queues based on layout and order configuration
  let leftQueue: HTMLElement[] = []
  let rightQueue: HTMLElement[] = []
  let singleQueue: HTMLElement[] = []

  const isSidebarLayout = layout.personalPosition !== "top"

  if (layout.columns === 1) {
    // Single column: use oneCol order or default order
    const order = sectionOrder.oneCol || []
    singleQueue =
      order.length > 0
        ? (order.map((id) => others.find((el) => el.dataset.id === id)).filter(Boolean) as HTMLElement[])
        : [...others]
  } else {
    // Two columns: use twoCol order
    const leftOrder = sectionOrder.twoCol?.left || []
    const rightOrder = sectionOrder.twoCol?.right || []

    leftQueue = leftOrder.map((id) => others.find((el) => el.dataset.id === id)).filter(Boolean) as HTMLElement[]
    rightQueue = rightOrder.map((id) => others.find((el) => el.dataset.id === id)).filter(Boolean) as HTMLElement[]
  }

  let firstPage = true

  // Determine if we have more content to paginate
  const hasMoreContent = () => {
    if (isSidebarLayout) {
      // For sidebar layouts, check both left and right queues
      return leftQueue.length > 0 || rightQueue.length > 0
    } else {
      // For top layouts, use the column logic
      return layout.columns === 1 ? singleQueue.length > 0 : leftQueue.length > 0 || rightQueue.length > 0
    }
  }

  while (hasMoreContent() || (layout.personalPosition !== "top" && firstPage)) {
    const page = createPageShell(pageW, pageH, margins)

    stagingRoot.append(page.root)

    if (layout.personalPosition === "top") {
      // Add personal section at the top of the page if it exists and this is the first page
      if (personal && firstPage) {
        const personalClone = personal.cloneNode(true) as HTMLElement
        page.content.append(personalClone)
      }

      // 1 column layout
      if (layout.columns === 1) {
        const col = createColumn(contentW, contentH, gapPx)
        page.content.append(col)
        fillColumn(col, singleQueue, contentH)

        // 2 column layout
      } else {
        const grid = createGrid(2, contentW, contentH, gapPx)
        page.content.append(grid.el)

        // Fill left and right columns with their respective queues
        while (leftQueue.length > 0 || rightQueue.length > 0) {
          const leftPlaced = fillColumn(grid.cols[0], leftQueue, contentH)
          const rightPlaced = fillColumn(grid.cols[1], rightQueue, contentH)
          if (!leftPlaced && !rightPlaced) break
        }
      }
    } else {
      // sidebar layout: personal only on first page
      const shouldShowPersonal = firstPage && personal
      const { sidebarCol, mainCol } = createSidebarLayout(
        contentW,
        contentH,
        gapPx,
        layout.personalPosition,
        shouldShowPersonal ? personal : null
      )
      page.content.append(sidebarCol.container)

      // For sidebar layout, use appropriate queue based on personal position and section order
      if (layout.personalPosition === "left") {
        // Personal is on left, so left column gets personal + left sections, right column gets right sections
        fillColumn(sidebarCol.el, leftQueue, contentH)
        fillColumn(mainCol, rightQueue, contentH)
      } else {
        // Personal is on right, so right column gets personal + right sections, left column gets left sections
        fillColumn(mainCol, leftQueue, contentH)
        fillColumn(sidebarCol.el, rightQueue, contentH)
      }
    }

    pages.push(page.root)
    firstPage = false
  }

  for (const p of pages) frag.append(p)
  return frag
}
