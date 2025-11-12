// Constants for HTML parsing
const EMPTY_BREAK_TAGS = ["<p><br></p>", "<li><br></li>"] as const
const EMPTY_BREAK_REPLACEMENT = "<p><br/></p>"
const LIST_TAG_PATTERNS = [
  [/<ul>/g, ""],
  [/<\/ul>/g, ""]
] as const

/**
 * Removes trailing break tags from the end of a content array
 */
export function trimTrailingEmptyTags(lines: string[]): string[] {
  const trimmed = [...lines]

  while (trimmed.length > 0) {
    const lastLine = trimmed.at(-1)
    if (!lastLine || !EMPTY_BREAK_TAGS.includes(lastLine as (typeof EMPTY_BREAK_TAGS)[number])) {
      break
    }
    trimmed.pop()
  }

  return trimmed
}

/**
 * Checks if a DOM node represents an empty text node
 */
export function isWhitespaceOnlyNode(node: ChildNode): boolean {
  return (
    node.childNodes.length === 1 &&
    node.firstChild?.nodeType === Node.TEXT_NODE &&
    node.firstChild?.textContent?.trim() === ""
  )
}

/**
 * Converts a DOM node to its HTML string representation
 */
export function nodeToHtmlString(node: ChildNode): string {
  if (node.nodeType === Node.TEXT_NODE) {
    return node.textContent ?? ""
  }

  if (node instanceof HTMLElement && "outerHTML" in node) {
    return node.outerHTML
  }

  const container = document.createElement("div")
  container.append(node.cloneNode(true))
  return container.innerHTML
}

/**
 * Parses an HTML string into an array of line strings
 */
export function extractHtmlLines(htmlString: string): string[] {
  const parser = document.createElement("div")

  parser.innerHTML = htmlString

  const lines: string[] = []

  for (const childNode of parser.childNodes) {
    if (
      childNode instanceof HTMLElement &&
      childNode.tagName.toLowerCase() === "p" &&
      childNode.textContent?.trim() === "" &&
      !childNode.querySelector("br, img, hr")
    ) {
      continue
    }

    if (isWhitespaceOnlyNode(childNode)) {
      lines.push(EMPTY_BREAK_REPLACEMENT)
    } else {
      lines.push(nodeToHtmlString(childNode))
    }
  }

  return lines
}

/**
 * Removes list container tags from HTML string
 */
export function sanitizeListMarkup(htmlString: string): string {
  let sanitized = htmlString
  for (const [pattern, replacement] of LIST_TAG_PATTERNS) {
    sanitized = sanitized.replace(pattern, replacement)
  }
  return sanitized
}

/**
 * Processes HTML description into content lines
 */
export function processDescriptionLines(description: string): string[] {
  const sanitized = sanitizeListMarkup(description)
  const lines = extractHtmlLines(sanitized)
  return trimTrailingEmptyTags(lines)
}
