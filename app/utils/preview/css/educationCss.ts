import type { TConfigs } from "~/types/resume.types"

export function buildEducationCss(educationConfigs: TConfigs["education"]) {
  const cfg = educationConfigs

  // Extract field styles
  const degreeFontSize = cfg.degree.fontSize
  const degreeFontWeight = cfg.degree.fontWeight
  const degreeFontCase = cfg.degree.fontCase
  const degreeFontStyle = cfg.degree.fontStyle

  const schoolFontSize = cfg.school.fontSize
  const schoolFontWeight = cfg.school.fontWeight
  const schoolFontCase = cfg.school.fontCase
  const schoolFontStyle = cfg.school.fontStyle

  const dateFontSize = cfg.date.fontSize
  const dateFontWeight = cfg.date.fontWeight
  const dateFontCase = cfg.date.fontCase
  const dateFontStyle = cfg.date.fontStyle

  const locationFontSize = cfg.location.fontSize
  const locationFontWeight = cfg.location.fontWeight
  const locationFontCase = cfg.location.fontCase
  const locationFontStyle = cfg.location.fontStyle

  return `
    /* Education Section Base Classes */
    .education-section {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .education-item {
      margin-bottom: 12px;
    }

    .education-item-content {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 8px;
    }

    .education-item-left {
      flex: 1;
    }

    .education-item-right {
      text-align: right;
    }

    .education-description {
      margin-top: 4px;
    }

    /* Education Field Styles */
    .education-degree {
      font-size: ${degreeFontSize}px;
      font-weight: ${degreeFontWeight};
      text-transform: ${degreeFontCase};
      font-style: ${degreeFontStyle};
    }

    .education-school {
      font-size: ${schoolFontSize}px;
      font-weight: ${schoolFontWeight};
      text-transform: ${schoolFontCase};
      font-style: ${schoolFontStyle};
    }

    .education-date {
      font-size: ${dateFontSize}px;
      font-weight: ${dateFontWeight};
      text-transform: ${dateFontCase};
      font-style: ${dateFontStyle};
    }

    .education-location {
      font-size: ${locationFontSize}px;
      font-weight: ${locationFontWeight};
      text-transform: ${locationFontCase};
      font-style: ${locationFontStyle};
    }
  `
}
