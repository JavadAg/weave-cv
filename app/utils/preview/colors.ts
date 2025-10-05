import type { TConfigs } from "~/types/resume.types"
import type { TApplyableColorItems } from "../schemas/configs.schema"

/**
 * Determines if a specific color type should use accent color based on user settings
 */
export function shouldUseAccentColor(colorType: TApplyableColorItems, general: TConfigs["general"]): boolean {
  return general.colors?.apply?.includes(colorType) ?? false
}

/**
 * Gets the appropriate color for a text element based on user settings
 */
export function getTextColor(
  colorType: TApplyableColorItems,
  general: TConfigs["general"],
  useSecondary: boolean = false
): string {
  const colors = general.colors
  if (!colors) return "hsl(0 0% 0%)"

  if (shouldUseAccentColor(colorType, general)) {
    return useSecondary ? colors.secondary.accentColor : colors.primary.accentColor
  }

  return useSecondary ? colors.secondary.textColor : colors.primary.textColor
}

/**
 * Creates a data attribute for text type targeting
 */
export function createTextTypeAttribute(textType: TApplyableColorItems): string {
  return `data-text-type="${textType}"`
}

/**
 * Wraps text with appropriate data attributes and inline styles if needed
 */
export function wrapTextWithColor(
  text: string,
  textType: TApplyableColorItems,
  general: TConfigs["general"],
  additionalStyles: string = "",
  useSecondary: boolean = false
): string {
  const dataAttr = createTextTypeAttribute(textType)

  // If accent color is not applied, use inline style as fallback
  if (!shouldUseAccentColor(textType, general)) {
    const color = getTextColor(textType, general, useSecondary)
    const colorStyle = `color: ${color};`
    const combinedStyles = additionalStyles ? `${colorStyle} ${additionalStyles}` : colorStyle
    return `<span ${dataAttr} style="${combinedStyles}">${text}</span>`
  }

  // If accent color is applied, CSS will handle it via data attribute
  const styles = additionalStyles ? ` style="${additionalStyles}"` : ""
  return `<span ${dataAttr}${styles}>${text}</span>`
}

/**
 * Creates a style string with color if accent is not applied
 */
export function getStyleWithColor(
  textType: TApplyableColorItems,
  general: TConfigs["general"],
  additionalStyles: string = "",
  useSecondary: boolean = false
): string {
  if (!shouldUseAccentColor(textType, general)) {
    const color = getTextColor(textType, general, useSecondary)
    const colorStyle = `color: ${color};`
    return additionalStyles ? `${colorStyle} ${additionalStyles}` : colorStyle
  }

  return additionalStyles
}
