import type { TConfigs } from "~/utils/schemas/configs/configs.schema"

export const DEFAULT_CONFIGS: TConfigs = {
  general: {
    layout: {
      language: "en",
      dateFormat: "DD.MM.YYYY",
      rtl: false,
      size: "A4",
      verticalMargin: 12,
      horizontalMargin: 12,
      columns: "1",
      sectionGap: 12,
      columnsWidth: {
        left: 50,
        right: 50
      },
      personalPosition: "top",
      contentLayout: {
        listType: "disc",
        indent: 0,
        subtitle: {
          fontStyle: "normal",
          fontCase: "inherit",
          fontSizeMultiplier: 1,
          fontWeight: "normal"
        },
        title: {
          fontStyle: "normal",
          fontCase: "inherit",
          fontSizeMultiplier: 1.1,
          fontWeight: "bold"
        },
        contentFirstWidth: {
          left: 70,
          right: 30
        },
        dateFirstWidth: {
          left: 30,
          right: 70
        }
      },
      order: {
        twoCol: {
          left: ["summary", "experiences", "languages", "certificates", "courses"],
          right: ["educations", "projects", "skills", "awards"]
        },
        oneCol: [
          "summary",
          "experiences",
          "educations",
          "projects",
          "skills",
          "languages",
          "certificates",
          "courses",
          "awards"
        ]
      }
    },
    headings: {
      fontSizeMultiplier: 1.2,
      fontWeight: "bold",
      fontCase: "inherit",
      variant: "vertical-border",
      icon: {
        visible: true,
        size: 16,
        custom: {}
      }
    },
    links: {
      underline: true,
      color: "#9C9B82",
      icon: {
        type: "arrow",
        visible: true,
        color: "#9C9B82"
      }
    },
    typography: {
      fontFamily: "sourcesanspro",
      lineHeight: 1.1,
      letterSpacing: 0,
      fontSize: 12
    },
    colors: {
      apply: ["name", "dates", "headings"],
      primary: {
        textColor: "#E3E3E3",
        bgColor: "#283247",
        accentColor: "#B6BD6C"
      },
      secondary: {
        textColor: "#070707",
        bgColor: "#F7F7F7",
        accentColor: "#9C9B82"
      }
    }
  },
  summary: { variant: "inline", grids: 1, separator: "pipe", titleStyle: "colon" },
  awards: {
    variant: "contentFirst",
    separator: "pipe",
    dateLocationVariant: "stacked",
    titleSubtitleVariant: "stacked",
    subTitleFirst: false
  },
  personal: {
    variant: "stacked",
    align: "center",
    bottomSpace: 32,
    main: {
      variant: "inline",
      bottomSpace: 18,
      title: { fontSize: 26, fontWeight: "bold" },
      subtitle: {
        fontSize: 24,
        fontWeight: "normal"
      }
    },
    details: {
      variant: "inline",
      separator: "pipe",
      icon: { visible: true, align: "left", type: "filledSquare", size: 16 }
    }
  },
  experiences: {
    variant: "stacked",
    separator: "pipe",
    dateLocationVariant: "stacked",
    titleSubtitleVariant: "stacked",
    subTitleFirst: false
  },
  skills: { variant: "inline", separator: "pipe", grids: 4, titleStyle: "colon" },
  certificates: { variant: "inline", separator: "pipe", grids: 1, titleStyle: "dash" },
  projects: {
    dateLocationVariant: "stacked",
    titleSubtitleVariant: "stacked",
    separator: "pipe",
    variant: "dateFirst",
    subTitleFirst: false
  },
  educations: {
    variant: "stacked",
    separator: "pipe",
    titleSubtitleVariant: "stacked",
    dateLocationVariant: "stacked",
    subTitleFirst: false
  },
  languages: {
    variant: "stacked",
    separator: "pipe",
    grids: 1,
    titleStyle: "colon"
  },
  courses: {
    variant: "contentFirst",
    separator: "pipe",
    dateLocationVariant: "stacked",
    titleSubtitleVariant: "stacked",
    subTitleFirst: false
  }
}
