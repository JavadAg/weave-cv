import type { TConfigs, TContent } from "~/types/resume.types"
import type {
  TEducationData,
  TExperienceData,
  TLanguageData,
  TPersonalData,
  TProjectData,
  TSkillData,
  TSummaryData
} from "~/utils/schemas/content.schema"

export const DEFAULT_CONFIGS: TConfigs = {
  general: {
    layout: {
      dateFormat: "DD.MM.YYYY",
      rtl: false,
      showSectionDividers: true,
      size: "A4",
      margins: { top: 38, right: 48, bottom: 38, left: 48 },
      /* border: {
        isEnabled: false,
        apply: "all",
        color: "hsl(0 0% 95%)",
        width: 1,
        style: "solid",
        sides: { top: true, right: true, bottom: true, left: true }
      }, */
      columns: "1",
      sectionGap: 16,
      personalPosition: "top",
      order: {
        twoCol: {
          left: ["summary", "experience", "languages"],
          right: ["education", "projects", "skills"]
        },
        oneCol: ["summary", "experience", "education", "projects", "skills", "languages"]
      }
    },
    headings: {
      fontSize: 24,
      fontWeight: "700",
      fontCase: "normal",
      variant: "plain"
    },
    links: {
      underline: true,
      icon: {
        visible: true,
        size: 16,
        color: "hsl(220 63% 52%)"
      }
    },
    typography: {
      fontFamily: "Lato",
      lineHeight: 1.5,
      letterSpacing: 0
    },
    colors: {
      apply: ["name", "dates", "headings"],
      primary: {
        textColor: "hsl(56 96% 51%)",
        bgColor: "hsl(0 88% 41%)",
        accentColor: "hsl(111 91% 51%)"
      },
      secondary: {
        textColor: "hsl(237 80% 40%)",
        bgColor: "hsl(288 43% 35%)",
        accentColor: "hsl(184 77% 61%)"
      }
    }
  },
  summary: {},
  personal: {
    variant: "stacked",
    main: {
      align: "center",
      variant: "inline",
      title: { fontSize: 36, fontWeight: "700", fontCase: "inherit", bottomSpace: 0 },
      subtitle: {
        fontSize: 24,
        fontWeight: "400",
        fontCase: "inherit",
        bottomSpace: 8
      }
    },
    details: {
      variant: "grid",
      separator: "pipe",
      fontSize: 12,
      fontWeight: "400",
      fontCase: "inherit",
      align: "center",
      icon: { align: "left", type: "filledSquare", size: 16 }
    }
  },
  experience: {
    variant: "dateFirst",
    separator: "pipe",
    role: { fontSize: 16, fontWeight: "700", fontCase: "inherit", fontStyle: "normal" },
    company: { fontSize: 16, fontWeight: "400", fontCase: "capitalize", fontStyle: "italic" },
    location: { fontSize: 14, fontWeight: "400", fontCase: "inherit", fontStyle: "normal" },
    date: { fontSize: 14, fontWeight: "400", fontCase: "inherit", fontStyle: "normal" },
    dateVariant: "stacked",
    titleVariant: "stacked",
    bullets: { bulletStyle: "disc", gap: 6 }
  },
  skills: { variant: "inline", separator: "pipe", grids: 1 },
  certifications: { variant: "inline", separator: "pipe", grids: 1 },
  projects: {
    titleVariant: "stacked",
    dateVariant: "stacked",
    separator: "pipe",
    title: { fontSize: 12, fontWeight: "400", fontCase: "inherit", fontStyle: "normal" },
    subtitle: { fontSize: 12, fontWeight: "400", fontCase: "inherit", fontStyle: "normal" },
    date: { fontSize: 12, fontWeight: "400", fontCase: "inherit", fontStyle: "normal" }
  },
  education: {
    separator: "pipe",
    titleVariant: "stacked",
    dateVariant: "stacked",
    degree: { fontSize: 12, fontWeight: "400", fontCase: "inherit", fontStyle: "normal" },
    school: { fontSize: 12, fontWeight: "400", fontCase: "inherit", fontStyle: "normal" },
    location: { fontSize: 12, fontWeight: "400", fontCase: "inherit", fontStyle: "normal" },
    date: { fontSize: 12, fontWeight: "400", fontCase: "inherit", fontStyle: "normal" }
  },
  languages: {
    variant: "inline",
    separator: "pipe",
    grids: 1,
    description: {
      fontSize: 14,
      fontWeight: "400",
      fontCase: "inherit",
      fontStyle: "normal"
    },
    title: {
      fontSize: 15,
      fontWeight: "700",
      fontCase: "inherit",
      fontStyle: "normal"
    },
    levelVariant: "dots"
  }
}

export const DEFAULT_TITLE = "New Resume"

export const DEFAULT_PERSONAL_DATA: TPersonalData = {
  title: { text: "Alex Smith", isVisible: true },
  subtitle: { text: "Full-Stack Developer", isVisible: true },
  details: [
    {
      value: "alex.smith@example.com",
      isVisible: true,
      label: "Email",
      icon: "mail",
      url: "mailto:alex.smith@example.com"
    },
    {
      value: "+1 555 123 4567",
      isVisible: true,
      label: "Phone",
      icon: "phone",
      url: "tel:+15551234567"
    },
    {
      value: "alex-smith",
      isVisible: true,
      label: "LinkedIn",
      icon: "linkedin",
      url: "https://linkedin.com/in/alex-smith"
    },
    {
      value: "alex-smith",
      isVisible: true,
      label: "GitHub",
      icon: "github",
      url: "https://github.com/alex-smith"
    }
  ]
}

export const DEFAULT_SUMMARY_DATA: TSummaryData = {
  text: "Experienced full-stack developer with a strong background in building responsive web applications using modern frameworks. Passionate about writing clean, maintainable code and collaborating with cross-functional teams to deliver impactful software solutions."
}

export const DEFAULT_EXPERIENCE_ITEM: Omit<TExperienceData, "id"> = {
  isVisible: true,
  url: "https://examplecompany.com",
  company: "Example Company",
  role: "Software Engineer",
  from: "2021-01-01",
  to: "2023-06-01",
  present: false,
  location: "Remote",
  description:
    "<ul><li><p>Developed and maintained web applications using React, TypeScript, and Node.js.</p></li><li><p>Collaborated with designers and backend developers to implement scalable APIs and UI components.</p></li><li><p>Improved page load performance by 30% through code optimization and caching strategies.</p></li></ul>"
}
export const DEFAULT_EXPERIENCE_DATA: TExperienceData[] = [
  {
    id: "experience-1",
    isVisible: true,
    url: "https://examplecompany.com",
    company: "Example Company",
    role: "Software Engineer",
    from: "2021-01-01",
    to: "2023-06-01",
    present: false,
    location: "Remote",
    description:
      "<ul><li><p>Developed and maintained web applications using React, TypeScript, and Node.js.</p></li><li><p>Collaborated with designers and backend developers to implement scalable APIs and UI components.</p></li><li><p>Improved page load performance by 30% through code optimization and caching strategies.</p></li></ul>"
  },
  {
    id: "experience-2",
    isVisible: true,
    url: "https://techsolutions.com",
    company: "Tech Solutions",
    role: "Frontend Developer",
    from: "2019-05-01",
    to: "2020-12-01",
    location: "New York, NY",
    description:
      "<ul><li><p>Developed and maintained web applications using React, TypeScript, and Node.js.</p></li><li><p>Collaborated with designers and backend developers to implement scalable APIs and UI components.</p></li><li><p>Improved page load performance by 30% through code optimization and caching strategies.</p></li></ul>"
  },
  {
    id: "experience-3",
    isVisible: true,
    url: "https://startup.io",
    company: "Startup.io",
    role: "Junior Developer",
    from: "2018-01-01",
    to: "2019-04-01",
    location: "San Francisco, CA",
    description:
      "<ul><li><p>Developed and maintained web applications using React, TypeScript, and Node.js.</p></li><li><p>Collaborated with designers and backend developers to implement scalable APIs and UI components.</p></li><li><p>Improved page load performance by 30% through code optimization and caching strategies.</p></li></ul>"
  }
]

export const DEFAULT_EDUCATION_ITEM: Omit<TEducationData, "id"> = {
  isVisible: true,
  school: "University of Technology",
  degree: "B.Sc. in Computer Science",
  from: "2015-09-01",
  to: "2019-06-01",
  location: "Boston, MA"
}
export const DEFAULT_EDUCATION_DATA: TEducationData[] = [
  {
    id: "education-1",
    isVisible: true,
    school: "University of Technology",
    degree: "B.Sc. in Computer Science",
    from: "2015-09-01",
    to: "2019-06-01",
    location: "Boston, MA"
  },
  {
    id: "education-2",
    isVisible: true,
    school: "Online Learning Platform",
    present: true,
    degree: "Certificate in Cloud Computing",
    from: "2024-01-01",
    to: "2025-01-01",
    location: "Online"
  }
]

export const DEFAULT_PROJECT_ITEM: Omit<TProjectData, "id"> = {
  title: "TaskMaster",
  subtitle: "Team Productivity Web App",
  isVisible: true,
  from: "2022-02-01",
  to: "2022-10-01",
  url: "https://taskmaster.app",
  description:
    "<ul><li><p>Implemented drag-and-drop task organization and real-time sync with WebSockets.</p></li><li><p>Designed a responsive UI with accessibility in mind.</p></li><li><p>Deployed using Docker and AWS ECS.</p></li></ul>"
}
export const DEFAULT_PROJECT_DATA: TProjectData[] = [
  {
    id: "project-1",
    title: "TaskMaster",
    subtitle: "Team Productivity Web App",
    isVisible: true,
    from: "2022-02-01",
    to: "2022-10-01",
    url: "https://taskmaster.app",
    description:
      "<ul><li><p>Implemented drag-and-drop task organization and real-time sync with WebSockets.</p></li><li><p>Designed a responsive UI with accessibility in mind.</p></li><li><p>Deployed using Docker and AWS ECS.</p></li></ul>"
  }
]

export const DEFAULT_LANGUAGE_ITEM: Omit<TLanguageData, "id"> = {
  isVisible: true,
  title: "English",
  description: "Fluent"
}
export const DEFAULT_LANGUAGE_DATA: TLanguageData[] = [
  { id: "language-1", isVisible: true, title: "English", description: "Fluent" },
  { id: "language-2", isVisible: true, title: "Spanish", description: "Intermediate" }
]

export const DEFAULT_SKILL_ITEM: Omit<TSkillData, "id"> = {
  isVisible: true,
  title: "Programming Languages",
  description: "JavaScript, TypeScript, Python"
}
export const DEFAULT_SKILL_DATA: TSkillData[] = [
  {
    id: "skill-1",
    title: "Programming Languages",
    isVisible: true,
    description: "JavaScript, TypeScript, Python"
  },
  {
    id: "skill-2",
    title: "Frameworks & Libraries",
    isVisible: true,
    description: "React, Node.js, Next.js"
  },
  {
    id: "skill-3",
    title: "Tools & Platforms",
    isVisible: true,
    description: "Git, Docker, AWS"
  }
]

export const DEFAULT_CONTENT: TContent = {
  personal: {
    id: "personal",
    title: "Personal",
    isTitleVisible: true,
    isSectionVisible: true,
    type: "personal",
    data: DEFAULT_PERSONAL_DATA
  },
  summary: {
    id: "summary",
    title: "Summary",
    isTitleVisible: true,
    isSectionVisible: true,
    type: "summary",
    data: DEFAULT_SUMMARY_DATA
  },
  experience: {
    id: "experience",
    title: "Experience",
    isTitleVisible: true,
    isSectionVisible: true,
    type: "experience",
    data: DEFAULT_EXPERIENCE_DATA
  },
  education: {
    id: "education",
    title: "Education",
    isTitleVisible: true,
    isSectionVisible: true,
    type: "education",
    data: DEFAULT_EDUCATION_DATA
  },
  projects: {
    id: "projects",
    title: "Projects",
    isTitleVisible: true,
    isSectionVisible: true,
    type: "projects",
    data: DEFAULT_PROJECT_DATA
  },
  languages: {
    type: "languages",
    id: "languages",
    isTitleVisible: true,
    isSectionVisible: true,
    title: "Languages",
    data: DEFAULT_LANGUAGE_DATA
  },
  skills: {
    id: "skills",
    isTitleVisible: true,
    isSectionVisible: true,
    type: "skills",
    title: "Skills",
    data: DEFAULT_SKILL_DATA
  }
}
