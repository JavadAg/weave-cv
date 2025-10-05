import type { TConfigs } from "~/types/resume.types"
import { accentColor } from "./sharedCss"

export function buildPersonalCss(personalConfigs: TConfigs["personal"], generalConfigs: TConfigs["general"]) {
  const cfg = personalConfigs
  const { main, details } = cfg

  const titleFontSize = main.title.fontSize
  const titleFontWeight = main.title.fontWeight
  const titleFontCase = main.title.fontCase
  const titleBottomSpace = main.title.bottomSpace

  const subtitleFontSize = main.subtitle.fontSize
  const subtitleFontWeight = main.subtitle.fontWeight
  const subtitleFontCase = main.subtitle.fontCase

  const detailsFontSize = details.fontSize
  const detailsFontWeight = details.fontWeight
  const detailsFontCase = details.fontCase

  const subtitleBottomSpace = main.subtitle.bottomSpace
  const mainAlign = main.align
  const detailsAlign = cfg.details.align

  const iconSize = cfg.details.icon.size

  const titleAndSubtitleColor = accentColor("name", generalConfigs?.colors?.apply, true)

  return `
    /* Personal Section Layout Classes */
    .personal-wrapper-inline { 
      display: flex; 
      justify-content: center; 
      align-items: center; 
      text-align: ${mainAlign};
      gap: ${subtitleBottomSpace}px;
    }
    .personal-wrapper-grid { 
      display: grid; 
      text-align: ${mainAlign};
      gap: ${subtitleBottomSpace}px;
    }
    
    .personal-title-inline { 
      display: inline-flex; 
      justify-content: center; 
      align-items: center; 
      gap: 8px; 
    }
    .personal-title-grid { 
      display: grid; 
    }

    /* Personal Title Styles */
    .resume-root [data-type="personal"] h1 {
      font-size: ${titleFontSize}px;
      font-weight: ${titleFontWeight};
      text-transform: ${titleFontCase};
      margin-bottom: ${titleBottomSpace}px;
      color: ${titleAndSubtitleColor};
    }

    /* Personal Subtitle Styles */
    .resume-root [data-type="personal"] .personal-subtitle {
      font-size: ${subtitleFontSize}px;
      font-weight: ${subtitleFontWeight};
      text-transform: ${subtitleFontCase};
      color: ${titleAndSubtitleColor};
    }

    /* Personal Details Styles */
    .resume-root [data-type="personal"] .personal-details {
      font-size: ${detailsFontSize}px;
      font-weight: ${detailsFontWeight};
      text-transform: ${detailsFontCase};
    }

    /* Personal Details Layout Variants */
    .personal-details-inline {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      text-align: ${detailsAlign};
    }
    .personal-details-stacked {
      display: grid;
      gap: 4px;
      text-align: ${detailsAlign};
    }
    .personal-details-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 4px;
      justify-items: start;
      text-align: ${detailsAlign};
    }

    /* Personal Detail Items */
    .personal-detail-item {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
    }

    /* Personal Detail Icons */
    .personal-detail-icon {
      font-size: ${iconSize}px;
    }
    .personal-detail-icon-left {
      margin-right: 4px;
    }
    .personal-detail-icon-right {
      margin-left: 4px;
    }
    .personal-detail-icon-center {
      margin: 0 4px;
    }
  `
}
