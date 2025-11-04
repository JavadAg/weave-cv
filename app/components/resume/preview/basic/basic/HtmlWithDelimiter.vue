<script setup lang="ts">
import { computed, Fragment, h } from "vue"
import type { TSeparator } from "~/utils/schemas/shared.schema"
import LinkIcon from "../../advanced/content/LinkIcon.vue"

interface Props {
  html: string
  separator: TSeparator
}

const props = defineProps<Props>()

const shouldRenderNode = (node: Node): boolean => {
  const nodeName = node.nodeName.toLowerCase()

  if (nodeName === "p" || nodeName === "li") {
    const children = [...node.childNodes]
    if (children.length === 0) return false
    const firstChild = children[0]
    if (firstChild && firstChild.nodeName.toLowerCase() === "br") return false
    if (children.every((child) => !child.textContent?.trim())) return false
  }

  return true
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const processNode = (node: Node, isFirst: boolean, index: number): any => {
  const nodeName = node.nodeName.toLowerCase()

  // Handle text nodes
  if (node.nodeType === Node.TEXT_NODE) {
    return node.nodeValue
  }

  // Recursively process child nodes
  const childNodes = [...node.childNodes]
    .map((child, childIndex) => processNode(child, isFirst && childIndex === 0, childIndex))
    .filter((child) => child !== null)

  // Handle paragraph or list item nodes
  if (/* nodeName === "p" || */ nodeName === "li") {
    if (!shouldRenderNode(node)) return null

    const children = [...node.childNodes]
      .map((child, childIndex) => processNode(child, false, childIndex))
      .filter((child) => child !== null)

    const content = h(Fragment, { key: `pli-${index}` }, children)

    return isFirst ? content : h("span", { key: `delimiter-${index}-${Math.random()}` }, [",", content])
  }

  // Render based on node type
  switch (nodeName) {
    case "strong": {
      return h("strong", { key: `strong-${index}`, style: { fontWeight: "bold" } }, childNodes)
    }
    case "em": {
      return h("em", { key: `em-${index}`, style: { fontStyle: "italic" } }, childNodes)
    }
    case "u": {
      return h("u", { key: `u-${index}`, style: { textDecoration: "underline" } }, childNodes)
    }
    case "a": {
      const href = (node as HTMLAnchorElement).getAttribute("href")
      return h(
        "span",
        {
          key: `a-wrapper-${index}`,
          style: {
            display: "inline-flex",
            alignItems: "center",
            gap: "0.2em"
          }
        },
        [
          h(
            "a",
            {
              key: `a-${index}`,
              target: "_blank",
              href: href,
              rel: "noopener noreferrer",
              style: {
                color: "inherit",
                textDecoration: "none"
              }
            },
            childNodes
          ),
          h(LinkIcon, { key: `link-icon-${index}`, usage: "description", isInBubble: false })
        ]
      )
    }
    default: {
      return childNodes.length > 0 ? childNodes : null
    }
  }
}

const renderContent = computed(() => {
  if (!props.html) return () => null

  return () => {
    try {
      const parser = new DOMParser()
      const parsedDoc = parser.parseFromString(props.html, "text/html")

      const nodes = [...parsedDoc.body.childNodes]
        .map((node, index) => processNode(node, index === 0, index))
        .filter((node) => node !== null)

      return h(Fragment, nodes)
    } catch (error) {
      console.error("Error parsing HTML:", error)
      return h("span", props.html)
    }
  }
})
</script>

<template>
  <component :is="renderContent" />
</template>
