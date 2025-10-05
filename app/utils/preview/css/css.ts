import type { TConfigs } from "~/types/resume.types"
import { buildEducationCss } from "./educationCss"
import { buildExperienceCss } from "./experienceCss"
import { buildLanguagesCss } from "./languagesCss"
import { buildPersonalCss } from "./personalCss"
import { buildProjectsCss } from "./projectsCss"
import { buildSharedCss } from "./sharedCss"
import { buildSkillsCss } from "./skillsCss"

function svgToDataUrl(svg: string) {
  const cleaned = svg.trim().replaceAll(/\s+/g, " ")
  const encoded = encodeURIComponent(cleaned)
    .replaceAll("'", "%27")
    .replaceAll('"', "%22")
    .replaceAll("(", "%28")
    .replaceAll(")", "%29")
  return `url("data:image/svg+xml;utf8,${encoded}")`
}

const DEFAULT_EXTERNAL_SVG = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
     <path fill='black'
       d='M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3zM5 5h6v2H7v10h10v-4h2v6H5z'/>
   </svg>`

export function buildGlobalCss(configs: TConfigs) {
  const t = configs.general
  const links = t.links
  const isUnderline = links.underline
  const isIcon = links.icon.visible
  const iconSize = links.icon.size
  const iconColor = links.icon.color
  const iconSvg = String(links.icon.linkIconSvg ?? DEFAULT_EXTERNAL_SVG)
  const iconUrl = svgToDataUrl(iconSvg)

  const lineHeight = t.typography?.lineHeight
  const letterSpacing = t.typography?.letterSpacing

  const fontFamily = t.typography?.fontFamily

  const primaryTextColor = t.colors?.primary.textColor
  const secondaryTextColor = t.colors?.secondary.textColor

  const primaryBgColor = t.colors?.primary.bgColor
  const secondaryBgColor = t.colors?.secondary.bgColor

  const primaryAccentColor = t.colors?.primary.accentColor
  const secondaryAccentColor = t.colors?.secondary.accentColor

  return `
  .resume-root {
    font-family: ${fontFamily};
    --icon-size: ${iconSize}px;
    --icon-color: ${iconColor};
    --icon-external: ${iconUrl};
    line-height: ${lineHeight};
    letter-spacing: ${letterSpacing}px;
    --primary-text-color: ${primaryTextColor};
    --secondary-text-color: ${secondaryTextColor};
    --primary-bg-color: ${primaryBgColor};
    --secondary-bg-color: ${secondaryBgColor};
    --primary-accent-color: ${primaryAccentColor};
    --secondary-accent-color: ${secondaryAccentColor};
  }
  .resume-root a[data-styled="true"] {
    text-decoration: ${isUnderline ? "underline" : "none"};
    text-underline-offset: 2px;
  }
    
  .resume-root a[data-link-icon="true"][href^="http"]::after {
    content: "";
    display: ${isIcon ? "inline-block" : "none"};
    width: var(--icon-size);
    height: var(--icon-size);
    margin-top: 4px;
    margin-left: .1em;
    background: var(--icon-color);
    -webkit-mask-image: var(--icon-external);
            mask-image: var(--icon-external);
    -webkit-mask-repeat: no-repeat;
            mask-repeat: no-repeat;
    -webkit-mask-position: center;
            mask-position: center;
    -webkit-mask-size: contain;
            mask-size: contain;
    vertical-align: text-bottom;
  }

  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  ${buildSharedCss(configs.general)}
  ${buildPersonalCss(configs.personal, configs.general)}
  ${buildExperienceCss(configs.experience)}
  ${buildEducationCss(configs.education)}
  ${buildProjectsCss(configs.projects)}
  ${buildSkillsCss(configs.skills)}
  ${buildLanguagesCss(configs.languages)}
  `
}
