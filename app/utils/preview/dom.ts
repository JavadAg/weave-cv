/* -------------------------- content structure helpers -------------------------- */

export function mountStagingClone(host: HTMLElement, htmlContent: string | null) {
  const shadow = host.cloneNode(true) as HTMLElement
  shadow.innerHTML = htmlContent ?? ""
  shadow.classList.add("resume-root")

  Object.assign(shadow.style, {
    display: "block",
    padding: "0",
    margin: "0 auto",
    boxSizing: "border-box",
    position: "fixed",
    left: "-10000px",
    top: "0",
    visibility: "hidden"
  })
  document.body.append(shadow)
  return shadow
}

export function createPageShell(pageWidthPx: number, pageHeightPx: number, margins: Required<PageMargins>) {
  const root = document.createElement("div")
  root.dataset.scope = "resume-page"

  Object.assign(root.style, {
    width: `${pageWidthPx}px`,
    height: `${pageHeightPx}px`,
    boxSizing: "border-box",
    background: "white",
    margin: "0 auto 8px",
    overflow: "hidden",
    position: "relative",
    pageBreakAfter: "always"
  })

  const content = document.createElement("div")
  Object.assign(content.style, {
    position: "absolute",
    left: `${margins.left}px`,
    top: `${margins.top}px`,
    right: `${margins.right}px`,
    bottom: `${margins.bottom}px`,
    display: "block"
  })

  root.append(content)
  return { root, content }
}

export function createColumn(widthPx: number, heightPx: number, gapPx: number) {
  const column = document.createElement("div")

  Object.assign(column.style, {
    width: `${widthPx}px`,
    minHeight: `${heightPx}px`,
    display: "flex",
    flexDirection: "column",
    rowGap: `${gapPx}px`,
    alignItems: "stretch"
  })
  return column
}

export function createGrid(cols: number, totalWidthPx: number, heightPx: number, gapPx: number) {
  const el = document.createElement("div")
  Object.assign(el.style, {
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
    columnGap: `${gapPx}px`,
    width: `${totalWidthPx}px`,
    minHeight: `${heightPx}px`
  })
  // Split widths fairly
  const left = createColumn(Math.floor((totalWidthPx - gapPx) / 2), heightPx, gapPx)
  const right = createColumn(Math.ceil((totalWidthPx - gapPx) / 2), heightPx, gapPx)
  el.append(left, right)
  return { el, cols: [left, right] as const }
}

/* -------------------------- splitting helpers -------------------------- */

function splitSection(el: HTMLElement) {
  const header = el.querySelector<HTMLElement>(":scope > [data-section-header]") || null
  const items = [...el.querySelectorAll<HTMLElement>(":scope > [data-item]")]
  return { header, items }
}

function cloneSectionSkeleton(section: HTMLElement, opts?: { continued?: boolean }) {
  const shell = document.createElement(section.tagName.toLowerCase())

  // copy data-* attributes
  for (const { name, value } of section.attributes) {
    if (name.startsWith("data-")) shell.setAttribute(name, value)
  }
  shell.dataset.part = opts?.continued ? "continued" : "start"
  shell.style.margin = "0"
  return shell
}

export function trySplitSectionIntoColumn(
  section: HTMLElement,
  columnEl: HTMLElement,
  height: number
): { movedAny: boolean; remainder?: HTMLElement } {
  const { header, items } = splitSection(section)
  if (items.length === 0) return { movedAny: false }

  // slice is the fragment built for this column
  const slice = cloneSectionSkeleton(section, { continued: false })

  if (header) slice.append(header.cloneNode(true))

  columnEl.append(slice)

  let movedAny = false

  for (const node of items) {
    const nextSibling = node.nextSibling
    slice.append(node)
    if (columnEl.scrollHeight > height) {
      // revert this node
      node.remove()
      if (nextSibling) nextSibling.before(node)
      else section.append(node)
      break
    } else {
      movedAny = true
    }
  }

  if (!movedAny) {
    slice.remove()
    return { movedAny: false }
  }

  // build remainder from whatever remains in section
  const leftover = [...section.querySelectorAll<HTMLElement>(":scope > [data-item]")]
  let remainder: HTMLElement | undefined
  if (leftover.length > 0) {
    remainder = cloneSectionSkeleton(section, { continued: true })
    for (const li of leftover) remainder.append(li)
  }

  return { movedAny: true, remainder }
}

/* -------------------------- shell + column/grid helpers -------------------------- */

export function createSidebarLayout(
  contentWidthPx: number,
  contentHeightPx: number,
  gapPx: number,
  personalPosition: "left" | "right",
  personalEl: HTMLElement | null
) {
  const sidebarWidthRatio = 0.34
  const sidebarWidthPx = Math.floor(contentWidthPx * sidebarWidthRatio)
  const mainWidthPx = contentWidthPx - sidebarWidthPx - gapPx

  const container = document.createElement("div")
  Object.assign(container.style, {
    display: "grid",
    gridTemplateColumns:
      personalPosition === "left" ? `${sidebarWidthPx}px ${mainWidthPx}px` : `${mainWidthPx}px ${sidebarWidthPx}px`,
    columnGap: `${gapPx}px`,
    height: `${contentHeightPx}px`,
    alignItems: "start"
  })

  const sidebarCol = createColumn(sidebarWidthPx, contentHeightPx, gapPx)
  if (personalEl) {
    const clone = personalEl.cloneNode(true) as HTMLElement
    sidebarCol.append(clone)
  }

  const mainCol = createColumn(mainWidthPx, contentHeightPx, gapPx)
  if (personalPosition === "left") container.append(sidebarCol, mainCol)
  else container.append(mainCol, sidebarCol)

  return { sidebarCol: { container, el: sidebarCol }, mainCol }
}

export function fillColumn(column: HTMLElement, queue: HTMLElement[], height: number) {
  let placedSomething = false

  while (queue.length > 0) {
    const next = queue[0]
    if (!next) break

    // try to place whole element in the column
    column.append(next)
    if (column.scrollHeight <= height) {
      placedSomething = true
      queue.shift()
      continue
    }

    // revert if it doesn't fit
    next.remove()

    if (next.dataset.splittable === "items") {
      const splitResult = trySplitSectionIntoColumn(next, column, height)

      if (splitResult.movedAny) {
        placedSomething = true
        if (splitResult.remainder) queue[0] = splitResult.remainder
        else queue.shift()
        continue
      }
    }

    break
  }

  return placedSomething
}
