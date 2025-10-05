import type { TConfigs } from "~/types/resume.types"

export function buildLanguagesCss(languagesConfigs: TConfigs["languages"]) {
  const cfg = languagesConfigs

  return `
    /* Languages Section Base Classes */
    .languages-section-inline {
      list-style: none;
      padding: 0;
      margin: 0;
      display: block;
    }

    .languages-section-grid {
      display: grid;
      grid-template-columns: repeat(${cfg.grids}, minmax(0, 1fr));
      gap: 12px;
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .languages-section-stacked {
      list-style: none;
      padding: 0;
      margin: 0;
      display: block;
    }

    .languages-item-inline {
      margin: 0;
      padding: 0;
    }

    .languages-item-stacked {
      margin: 0 0 8px 0;
      padding: 0;
    }

    .languages-group-title {
      font-weight: 700;
    }

    .languages-item-description {
      display: inline-block;
    }

    .languages-inline-content {
      display: block;
    }
  `
}
