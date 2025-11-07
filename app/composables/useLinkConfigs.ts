import { computed } from "vue"

export function useLinkConfigs(url?: string) {
  const configsStore = useConfigsStore()
  const { configs } = storeToRefs(configsStore)

  const linksConfig = computed(() => configs.value.general.links)

  const isLink = computed(() => !!url && url.trim() !== "")

  const linkAttributes = computed(() => {
    if (!isLink.value) return {}

    return {
      href: url,
      target: "_blank",
      rel: "noopener noreferrer"
    }
  })

  const linkStyles = computed<{ textDecoration: string; color: string }>(() => {
    return {
      textDecoration: linksConfig.value.underline ? "underline" : "none",
      color: linksConfig.value.color
    }
  })
  const linkIconStyles = computed(() => {
    return {
      visible: linksConfig.value.icon.visible,
      color: linksConfig.value.icon.color,
      type: linksConfig.value.icon.type
    }
  })

  return {
    isLink,
    linkAttributes,
    linkStyles,
    linkIconStyles
  }
}
