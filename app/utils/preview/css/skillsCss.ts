import type { TConfigs } from "~/types/resume.types"

export function buildSkillsCss(skillsConfigs: TConfigs["skills"]) {
  const cfg = skillsConfigs

  return `
    /* Skills Section Base Classes */
    .skills-section-inline {
      list-style: none;
      padding: 0;
      margin: 0;
      display: block;
    }

    .skills-section-grid {
      display: grid;
      grid-template-columns: repeat(${cfg.grids}, minmax(0, 1fr));
      gap: 12px;
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .skills-section-stacked {
      list-style: none;
      padding: 0;
      margin: 0;
      display: block;
    }

    .skills-item-inline {
      margin: 0;
      padding: 0;
    }

    .skills-item-stacked {
      margin: 0 0 8px 0;
      padding: 0;
    }

    .skills-group-title {
      font-weight: 700;
    }

    .skills-items-container {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .skills-item-label {
      display: inline-block;
    }

    .skills-inline-content {
      display: block;
    }
  `
}
