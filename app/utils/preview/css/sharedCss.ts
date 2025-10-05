import type { TConfigs } from "~/types/resume.types"
import type { TApplyableColorItems } from "~/utils/schemas/configs.schema"

export const accentColor = (item: TApplyableColorItems, applyList: TApplyableColorItems[], useSecondary: boolean) => {
  const shouldUseAccent = applyList?.includes(item) ?? false
  const colorType = useSecondary ? "secondary" : "primary"

  return shouldUseAccent ? `var(--${colorType}-accent-color)` : `var(--${colorType}-text-color)`
}

export function buildSharedCss(generalConfigs: TConfigs["general"]) {
  const { headings } = generalConfigs
  const headingsColor = accentColor("headings", generalConfigs?.colors?.apply, true)
  const textBodyColor = generalConfigs?.colors?.secondary.textColor

  // Extract typography values like in css.ts
  const fontSize = headings?.fontSize
  const fontWeight = headings?.fontWeight
  const fontCase = headings?.fontCase

  return `
    /* Section Title Base Styles */
    .resume-root [data-section-header] {
      color: ${headingsColor};
      font-size: ${fontSize}px;
      font-weight: ${fontWeight};
      text-transform: ${fontCase};
    }
    
    /* Section Title Variants */
    .section-title-plain {}
    .section-title-underline-short { 
      border-bottom: 4px solid ${headingsColor}; 
      max-width: fit-content; 
    }
    .section-title-underline-long { 
      border-bottom: 2px solid ${headingsColor}; 
      width: 100%; 
    }
    .section-title-pill { 
      border-radius: 9999px; 
      padding: 12px 16px; 
      color: ${headingsColor};
      position: relative;
      z-index: 1;
    }
    .section-title-pill::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: ${headingsColor};
      opacity: 0.15;
      border-radius: 9999px;
    }
    .section-title-border { 
      border: 1px solid ${headingsColor}; 
      padding: 8px; 
      border-radius: 4px; 
    }
    .section-title-vertical-border { 
      border-top: 1px solid ${headingsColor}; 
      border-bottom: 1px solid ${headingsColor}; 
      padding: 4px 0; 
    }
    
    /* Text Body Styles */
    .text-body {
      color: ${textBodyColor};
    }
  `
}
