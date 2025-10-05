import type { TConfigs } from "~/types/resume.types"

export function buildProjectsCss(projectsConfigs: TConfigs["projects"]) {
  const cfg = projectsConfigs

  // Extract field styles
  const titleFontSize = cfg.title.fontSize
  const titleFontWeight = cfg.title.fontWeight
  const titleFontCase = cfg.title.fontCase
  const titleFontStyle = cfg.title.fontStyle

  const subtitleFontSize = cfg.subtitle.fontSize
  const subtitleFontWeight = cfg.subtitle.fontWeight
  const subtitleFontCase = cfg.subtitle.fontCase
  const subtitleFontStyle = cfg.subtitle.fontStyle

  const dateFontSize = cfg.date.fontSize
  const dateFontWeight = cfg.date.fontWeight
  const dateFontCase = cfg.date.fontCase
  const dateFontStyle = cfg.date.fontStyle

  return `
    /* Projects Section Base Classes */
    .projects-section {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .projects-item {
      margin-bottom: 12px;
    }

    .projects-item-header-split {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 16px;
    }

    .projects-item-header-left {
      flex: 1;
      min-width: 0;
    }

    .projects-item-header-right {
      flex: 0 0 auto;
      text-align: right;
    }

    .projects-description {
      margin-top: 6px;
      color: inherit;
    }

    .projects-stack {
      margin-top: 6px;
      opacity: 0.9;
    }

    .projects-item-bullets {
      list-style: disc;
      margin: 6px 0 0 18px;
      padding: 0;
    }

    .projects-bullet-item {
      margin-bottom: 4px;
    }

    /* Projects Field Styles */
    .projects-title {
      font-size: ${titleFontSize}px;
      font-weight: ${titleFontWeight};
      text-transform: ${titleFontCase};
      font-style: ${titleFontStyle};
    }

    .projects-subtitle {
      font-size: ${subtitleFontSize}px;
      font-weight: ${subtitleFontWeight};
      text-transform: ${subtitleFontCase};
      font-style: ${subtitleFontStyle};
    }

    .projects-date {
      font-size: ${dateFontSize}px;
      font-weight: ${dateFontWeight};
      text-transform: ${dateFontCase};
      font-style: ${dateFontStyle};
    }
  `
}
