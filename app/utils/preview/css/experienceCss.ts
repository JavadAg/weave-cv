import type { TConfigs } from "~/types/resume.types"

export function buildExperienceCss(experienceConfigs: TConfigs["experience"]) {
  const cfg = experienceConfigs

  // Extract field styles
  const roleFontSize = cfg.role.fontSize
  const roleFontWeight = cfg.role.fontWeight
  const roleFontCase = cfg.role.fontCase
  const roleFontStyle = cfg.role.fontStyle

  const companyFontSize = cfg.company.fontSize
  const companyFontWeight = cfg.company.fontWeight
  const companyFontCase = cfg.company.fontCase
  const companyFontStyle = cfg.company.fontStyle

  const dateFontSize = cfg.date.fontSize
  const dateFontWeight = cfg.date.fontWeight
  const dateFontCase = cfg.date.fontCase
  const dateFontStyle = cfg.date.fontStyle

  const locationFontSize = cfg.location.fontSize
  const locationFontWeight = cfg.location.fontWeight
  const locationFontCase = cfg.location.fontCase
  const locationFontStyle = cfg.location.fontStyle

  // Bullet configuration
  const bulletStyle = cfg.bullets.bulletStyle
  const bulletGap = cfg.bullets.gap

  return `
    /* Experience Section Base Classes */
    .experience-item {
      margin-bottom: 12px;
    }

    /* Experience Layout Variants */
    .experience-content-first {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 16px;
    }
    .experience-content-first-content {
      flex: 1;
    }
    .experience-content-first-dates {
      flex: 0 0 auto;
      text-align: right;
    }

    .experience-date-first {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 16px;
    }
    .experience-date-first-content {
      flex: 1;
    }
    .experience-date-first-dates {
      flex: 0 0 auto;
    }

    .experience-stacked-header {
      margin-bottom: 12px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 16px;
    }

    /* Experience Field Styles */
    .experience-title-inline {
      display: inline-flex;
      gap: 4px;
    }
    
    .experience-title-stacked {
      display: flex;
      flex-direction: column;
    }
    
    .experience-role {
      font-size: ${roleFontSize}px;
      font-weight: ${roleFontWeight};
      text-transform: ${roleFontCase};
      font-style: ${roleFontStyle};
    }

    .experience-company {
      font-size: ${companyFontSize}px;
      font-weight: ${companyFontWeight};
      text-transform: ${companyFontCase};
      font-style: ${companyFontStyle};
    }

    .experience-date {
      font-size: ${dateFontSize}px;
      font-weight: ${dateFontWeight};
      text-transform: ${dateFontCase};
      font-style: ${dateFontStyle};
    }

    .experience-location {
      font-size: ${locationFontSize}px;
      font-weight: ${locationFontWeight};
      text-transform: ${locationFontCase};
      font-style: ${locationFontStyle};
    }

    /* Experience Bullets */
    .experience-bullets {
      list-style-type: ${bulletStyle};
      margin-left: ${bulletGap}px;
      padding-left: ${bulletGap}px;
    }

    .experience-bullet-item {
      margin-bottom: 4px;
    }

    .experience-bullet-dash {
      list-style-type: none;
    }
    .experience-bullet-dash .experience-bullet-item::before {
      content: "– ";
      margin-right: 4px;
    }
  `
}
