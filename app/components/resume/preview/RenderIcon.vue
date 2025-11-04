<script setup lang="ts">
import { computed } from "vue"
import { getIcon } from "~/utils/preview/helpers"

interface Props {
  iconKey: string
  headerCustomizations: {
    iconFrame: string
    iconFrameStyle: string
  }
  width?: string
  height?: string
}

const props = withDefaults(defineProps<Props>(), {
  width: undefined,
  height: undefined
})

// Placeholder for context values - replace with actual context/composable
const trContext = {
  applyAccentColor: { icons: true }, // placeholder
  accentColor: "#007bff", // placeholder
  textColor: "#000000", // placeholder
  backgroundColor: "#ffffff" // placeholder
}

const iiContext = {
  colors: {
    mode: "basic", // placeholder
    advanced: { selected: "color" }, // placeholder
    basic: { selected: "color" } // placeholder
  }
}

// Determine if image mode is active in advanced or basic mode
const isImageMode = computed(() => {
  return (
    (iiContext.colors.mode === "advanced" && iiContext.colors.advanced.selected === "image") ||
    (iiContext.colors.mode === "basic" && iiContext.colors.basic.selected === "image")
  )
})

// Choose color based on icon accent setting
const iconColor = computed(() => {
  return trContext.applyAccentColor.icons ? trContext.accentColor : trContext.textColor
})

// Set default width and height based on frame
const iconWidth = computed(() => {
  return props.width || (props.headerCustomizations.iconFrame === "none" ? "1em" : "1.4em")
})

const iconHeight = computed(() => {
  return props.height || (props.headerCustomizations.iconFrame === "none" ? "1em" : "1.4em")
})

// Get icon SVG HTML
const iconSvg = computed(() => {
  try {
    // Use the existing getIcon utility with a default size
    const size = Number.parseInt(iconWidth.value.replace("em", "")) * 16 // Convert em to px
    const icon = getIcon(props.iconKey, size)
    return icon || ""
  } catch {
    console.warn(`Icon "${props.iconKey}" not found`)
    return ""
  }
})

// Container styles
const containerStyles = computed(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: iconWidth.value,
  height: iconHeight.value
}))

// Icon styles
const iconStyles = computed(() => ({
  width: iconWidth.value,
  height: iconHeight.value === "auto" ? "auto" : iconHeight.value,
  fill: iconColor.value,
  stroke: iconColor.value,
  color: iconColor.value
}))

// Frame styles (placeholder implementation)
const frameStyles = computed(() => {
  const baseStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "4px", // default
    padding: "2px"
  }

  // Apply frame-specific styles based on iconFrame and iconFrameStyle
  switch (props.headerCustomizations.iconFrame) {
    case "circle": {
      return {
        ...baseStyles,
        borderRadius: "50%",
        backgroundColor: isImageMode.value ? "#222222" : trContext.backgroundColor
      }
    }
    case "square": {
      return {
        ...baseStyles,
        borderRadius: "0px",
        backgroundColor: isImageMode.value ? "#222222" : trContext.backgroundColor
      }
    }
    case "rounded": {
      return {
        ...baseStyles,
        borderRadius: "8px",
        backgroundColor: isImageMode.value ? "#222222" : trContext.backgroundColor
      }
    }
    case "none":
    default: {
      return baseStyles
    }
  }
})
</script>

<template>
  <div :style="frameStyles">
    <div v-if="iconSvg" :style="iconStyles" v-html="iconSvg" />
    <div v-else :style="containerStyles">
      <!-- Fallback placeholder icon -->
      <svg :width="iconWidth" :height="iconHeight" viewBox="0 0 24 24" :fill="iconColor" :style="iconStyles">
        <path
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
        />
      </svg>
    </div>
  </div>
</template>
