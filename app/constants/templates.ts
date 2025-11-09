import type { TConfigs } from "~/utils/schemas/configs/configs.schema"

export interface Template {
  id: string
  name: string
  description: string
  screenshot: string
  configs: TConfigs
}

export const TEMPLATE_MODERN_PROFESSIONAL: Template = {
  id: "template-1",
  name: "Modern Professional",
  description: "A clean and modern design perfect for tech and creative roles",
  screenshot: "/images/templates/1.png",
  configs: {
    awards: {
      variant: "contentFirst",
      separator: "pipe",
      subTitleFirst: false,
      dateLocationVariant: "stacked",
      titleSubtitleVariant: "stacked"
    },
    skills: {
      grids: 4,
      variant: "inline",
      separator: "pipe",
      titleStyle: "colon"
    },
    courses: {
      variant: "contentFirst",
      separator: "pipe",
      subTitleFirst: false,
      dateLocationVariant: "stacked",
      titleSubtitleVariant: "stacked"
    },
    general: {
      links: {
        icon: {
          type: "arrow",
          color: "#C7CEDF",
          visible: true
        },
        color: "#87A1DA",
        underline: true
      },
      colors: {
        apply: ["name", "dates", "headings"],
        primary: {
          bgColor: "#949FC0",
          textColor: "#FFFFFF",
          accentColor: "#EBF3FF"
        },
        secondary: {
          bgColor: "#FFFFFF",
          textColor: "#373C42",
          accentColor: "#AAC3F8"
        }
      },
      layout: {
        rtl: false,
        size: "A4",
        order: {
          oneCol: [
            "summary",
            "experiences",
            "educations",
            "skills",
            "projects",
            "languages",
            "certificates",
            "courses",
            "awards"
          ],
          twoCol: {
            left: ["summary", "experiences", "languages", "certificates", "courses"],
            right: ["educations", "projects", "skills", "awards"]
          }
        },
        columns: "1",
        language: "en",
        dateFormat: "DD.MM.YYYY",
        sectionGap: 12,
        columnsWidth: {
          left: 50,
          right: 50
        },
        contentLayout: {
          title: {
            fontCase: "inherit",
            fontStyle: "normal",
            fontWeight: "bold",
            fontSizeMultiplier: 1
          },
          indent: 0,
          listType: "disc",
          subtitle: {
            fontCase: "inherit",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSizeMultiplier: 1
          },
          dateFirstWidth: {
            left: 30,
            right: 70
          },
          contentFirstWidth: {
            left: 70,
            right: 30
          }
        },
        verticalMargin: 12,
        horizontalMargin: 12,
        personalPosition: "top"
      },
      headings: {
        icon: {
          size: 16,
          custom: {},
          visible: true
        },
        variant: "vertical-border",
        fontCase: "inherit",
        fontWeight: "bold",
        fontSizeMultiplier: 1.2
      },
      typography: {
        fontSize: 11,
        fontFamily: "inter",
        lineHeight: 1.5,
        letterSpacing: 0
      }
    },
    summary: {
      grids: 1,
      variant: "inline",
      separator: "pipe",
      titleStyle: "colon"
    },
    personal: {
      main: {
        title: {
          fontSize: 28,
          fontWeight: "bold"
        },
        variant: "inline",
        subtitle: {
          fontSize: 20,
          fontWeight: "normal"
        },
        bottomSpace: 18
      },
      align: "center",
      details: {
        icon: {
          size: 14,
          type: "filledSquare",
          align: "left",
          visible: true
        },
        variant: "inline",
        separator: "pipe"
      },
      variant: "stacked",
      bottomSpace: 32
    },
    projects: {
      variant: "dateFirst",
      separator: "pipe",
      subTitleFirst: false,
      dateLocationVariant: "stacked",
      titleSubtitleVariant: "stacked"
    },
    languages: {
      grids: 1,
      variant: "stacked",
      separator: "pipe",
      titleStyle: "colon"
    },
    educations: {
      variant: "stacked",
      separator: "pipe",
      subTitleFirst: false,
      dateLocationVariant: "stacked",
      titleSubtitleVariant: "stacked"
    },
    experiences: {
      variant: "stacked",
      separator: "pipe",
      subTitleFirst: false,
      dateLocationVariant: "stacked",
      titleSubtitleVariant: "stacked"
    },
    certificates: {
      grids: 1,
      variant: "inline",
      separator: "pipe",
      titleStyle: "dash"
    }
  }
}

export const TEMPLATE_CLASSIC_EXECUTIVE: Template = {
  id: "template-2",
  name: "Classic Executive",
  description: "Traditional and authoritative layout ideal for corporate and executive positions",
  screenshot: "/images/templates/2.png",
  configs: {
    general: {
      layout: {
        language: "en",
        dateFormat: "MMMM DD, YYYY",
        rtl: false,
        size: "A4",
        verticalMargin: 15,
        horizontalMargin: 15,
        columns: "2",
        sectionGap: 14,
        columnsWidth: {
          left: 55,
          right: 45
        },
        personalPosition: "top",
        contentLayout: {
          listType: "disc",
          indent: 2,
          subtitle: {
            fontStyle: "normal",
            fontCase: "inherit",
            fontSizeMultiplier: 1,
            fontWeight: "normal"
          },
          title: {
            fontStyle: "normal",
            fontCase: "inherit",
            fontSizeMultiplier: 1.15,
            fontWeight: "bold"
          },
          contentFirstWidth: {
            left: 65,
            right: 35
          },
          dateFirstWidth: {
            left: 35,
            right: 65
          }
        },
        order: {
          twoCol: {
            left: ["summary", "experiences", "projects"],
            right: ["educations", "skills", "languages", "certificates", "awards", "courses"]
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
        fontSizeMultiplier: 1.3,
        fontWeight: "bold",
        fontCase: "uppercase",
        variant: "underline",
        icon: {
          visible: false,
          size: 16,
          custom: {}
        }
      },
      links: {
        underline: true,
        color: "#2C3E50",
        icon: {
          type: "chain",
          visible: false,
          color: "#2C3E50"
        }
      },
      typography: {
        fontFamily: "timesnewroman",
        lineHeight: 1.2,
        letterSpacing: 0.2,
        fontSize: 11
      },
      colors: {
        apply: ["headings"],
        primary: {
          textColor: "#FFFFFF",
          bgColor: "#2C3E50",
          accentColor: "#34495E"
        },
        secondary: {
          textColor: "#2C3E50",
          bgColor: "#FFFFFF",
          accentColor: "#34495E"
        }
      }
    },
    summary: { variant: "inline", grids: 1, separator: "none", titleStyle: "none" },
    awards: {
      variant: "dateFirst",
      separator: "comma",
      dateLocationVariant: "inline",
      titleSubtitleVariant: "inline",
      subTitleFirst: false
    },
    personal: {
      variant: "stacked",
      align: "left",
      bottomSpace: 24,
      main: {
        variant: "stacked",
        bottomSpace: 12,
        title: { fontSize: 28, fontWeight: "bold" },
        subtitle: {
          fontSize: 20,
          fontWeight: "normal"
        }
      },
      details: {
        variant: "inline",
        separator: "pipe",
        icon: { visible: false, align: "left", type: "simple", size: 14 }
      }
    },
    experiences: {
      variant: "dateFirst",
      separator: "comma",
      dateLocationVariant: "inline",
      titleSubtitleVariant: "inline",
      subTitleFirst: false
    },
    skills: { variant: "stacked", separator: "comma", grids: 2, titleStyle: "colon" },
    certificates: { variant: "inline", separator: "comma", grids: 1, titleStyle: "colon" },
    projects: {
      dateLocationVariant: "inline",
      titleSubtitleVariant: "inline",
      separator: "comma",
      variant: "dateFirst",
      subTitleFirst: false
    },
    educations: {
      variant: "dateFirst",
      separator: "comma",
      titleSubtitleVariant: "inline",
      dateLocationVariant: "inline",
      subTitleFirst: false
    },
    languages: {
      variant: "inline",
      separator: "comma",
      grids: 2,
      titleStyle: "colon"
    },
    courses: {
      variant: "dateFirst",
      separator: "comma",
      dateLocationVariant: "inline",
      titleSubtitleVariant: "inline",
      subTitleFirst: false
    }
  }
}

export const TEMPLATE_CREATIVE_PORTFOLIO: Template = {
  id: "template-3",
  name: "Creative Portfolio",
  description: "Eye-catching design for creative professionals and designers",
  screenshot: "/images/templates/3.png",
  configs: {
    awards: {
      variant: "contentFirst",
      separator: "pipe",
      subTitleFirst: true,
      dateLocationVariant: "stacked",
      titleSubtitleVariant: "stacked"
    },
    skills: {
      grids: 3,
      variant: "grid",
      separator: "dot",
      titleStyle: "bracket"
    },
    courses: {
      variant: "contentFirst",
      separator: "pipe",
      subTitleFirst: true,
      dateLocationVariant: "stacked",
      titleSubtitleVariant: "stacked"
    },
    general: {
      links: {
        icon: {
          type: "arrow",
          color: "#8B5CF6",
          visible: true
        },
        color: "#8B5CF6",
        underline: false
      },
      colors: {
        apply: ["dates", "headings", "name"],
        primary: {
          bgColor: "#8B5CF6",
          textColor: "#FFFFFF",
          accentColor: "#EBE7FA"
        },
        secondary: {
          bgColor: "#FFFFFF",
          textColor: "#1F2937",
          accentColor: "#8B5CF6"
        }
      },
      layout: {
        rtl: false,
        size: "A4",
        order: {
          oneCol: [
            "summary",
            "experiences",
            "projects",
            "educations",
            "skills",
            "languages",
            "awards",
            "certificates",
            "courses"
          ],
          twoCol: {
            left: ["summary", "experiences", "projects"],
            right: ["educations", "skills", "languages", "awards", "certificates", "courses"]
          }
        },
        columns: "2",
        language: "en",
        dateFormat: "MMM DD, YYYY",
        sectionGap: 13,
        columnsWidth: {
          left: 45,
          right: 55
        },
        contentLayout: {
          title: {
            fontCase: "capitalize",
            fontStyle: "normal",
            fontWeight: "bold",
            fontSizeMultiplier: 1.2
          },
          indent: 4,
          listType: "circle",
          subtitle: {
            fontCase: "inherit",
            fontStyle: "italic",
            fontWeight: "normal",
            fontSizeMultiplier: 1.05
          },
          dateFirstWidth: {
            left: 25,
            right: 75
          },
          contentFirstWidth: {
            left: 75,
            right: 25
          }
        },
        verticalMargin: 10,
        horizontalMargin: 10,
        personalPosition: "top"
      },
      headings: {
        icon: {
          size: 18,
          custom: {},
          visible: true
        },
        variant: "pill",
        fontCase: "uppercase",
        fontWeight: "bold",
        fontSizeMultiplier: 1.2
      },
      typography: {
        fontSize: 11,
        fontFamily: "lato",
        lineHeight: 1.5,
        letterSpacing: 0.4
      }
    },
    summary: {
      grids: 1,
      variant: "inline",
      separator: "pipe",
      titleStyle: "colon"
    },
    personal: {
      main: {
        title: {
          fontSize: 32,
          fontWeight: "bold"
        },
        variant: "stacked",
        subtitle: {
          fontSize: 22,
          fontWeight: "normal"
        },
        bottomSpace: 16
      },
      align: "center",
      details: {
        icon: {
          size: 18,
          type: "outlineRounded",
          align: "left",
          visible: true
        },
        variant: "inline",
        separator: "dot"
      },
      variant: "stacked",
      bottomSpace: 28
    },
    projects: {
      variant: "contentFirst",
      separator: "pipe",
      subTitleFirst: true,
      dateLocationVariant: "stacked",
      titleSubtitleVariant: "stacked"
    },
    languages: {
      grids: 3,
      variant: "inline",
      separator: "dot",
      titleStyle: "bracket"
    },
    educations: {
      variant: "contentFirst",
      separator: "pipe",
      subTitleFirst: true,
      dateLocationVariant: "stacked",
      titleSubtitleVariant: "stacked"
    },
    experiences: {
      variant: "contentFirst",
      separator: "pipe",
      subTitleFirst: true,
      dateLocationVariant: "stacked",
      titleSubtitleVariant: "stacked"
    },
    certificates: {
      grids: 1,
      variant: "inline",
      separator: "slash",
      titleStyle: "dash"
    }
  }
}

export const TEMPLATE_MINIMALIST: Template = {
  id: "template-4",
  name: "Minimalist",
  description: "Clean, simple design with unified colors - maximum readability and elegance",
  screenshot: "/images/templates/4.png",
  configs: {
    awards: {
      variant: "stacked",
      separator: "none",
      subTitleFirst: false,
      dateLocationVariant: "inline",
      titleSubtitleVariant: "inline"
    },
    skills: {
      grids: 4,
      variant: "inline",
      separator: "pipe",
      titleStyle: "colon"
    },
    courses: {
      variant: "stacked",
      separator: "none",
      subTitleFirst: false,
      dateLocationVariant: "inline",
      titleSubtitleVariant: "inline"
    },
    general: {
      links: {
        icon: {
          type: "arrow",
          color: "#000000",
          visible: false
        },
        color: "#000000",
        underline: false
      },
      colors: {
        apply: [],
        primary: {
          bgColor: "#FFFFFF",
          textColor: "#1F2937",
          accentColor: "#6B7280"
        },
        secondary: {
          bgColor: "#FFFFFF",
          textColor: "#1F2937",
          accentColor: "#6B7280"
        }
      },
      layout: {
        rtl: false,
        size: "A4",
        order: {
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
          ],
          twoCol: {
            left: ["summary", "experiences", "projects"],
            right: ["educations", "skills", "languages", "certificates"]
          }
        },
        columns: "1",
        language: "en",
        dateFormat: "YYYY-MM-DD",
        sectionGap: 9,
        columnsWidth: {
          left: 50,
          right: 50
        },
        contentLayout: {
          title: {
            fontCase: "inherit",
            fontStyle: "normal",
            fontWeight: "bold",
            fontSizeMultiplier: 1.1
          },
          indent: 0,
          listType: "none",
          subtitle: {
            fontCase: "inherit",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSizeMultiplier: 1
          },
          dateFirstWidth: {
            left: 30,
            right: 70
          },
          contentFirstWidth: {
            left: 70,
            right: 30
          }
        },
        verticalMargin: 15,
        horizontalMargin: 18,
        personalPosition: "top"
      },
      headings: {
        icon: {
          size: 16,
          custom: {},
          visible: false
        },
        variant: "plain",
        fontCase: "inherit",
        fontWeight: "bold",
        fontSizeMultiplier: 1.15
      },
      typography: {
        fontSize: 11,
        fontFamily: "helvetica",
        lineHeight: 1.5,
        letterSpacing: 0
      }
    },
    summary: {
      grids: 1,
      variant: "inline",
      separator: "none",
      titleStyle: "none"
    },
    personal: {
      main: {
        title: {
          fontSize: 24,
          fontWeight: "bold"
        },
        variant: "stacked",
        subtitle: {
          fontSize: 18,
          fontWeight: "normal"
        },
        bottomSpace: 20
      },
      align: "left",
      details: {
        icon: {
          size: 14,
          type: "simple",
          align: "left",
          visible: false
        },
        variant: "inline",
        separator: "pipe"
      },
      variant: "stacked",
      bottomSpace: 6
    },
    projects: {
      variant: "stacked",
      separator: "none",
      subTitleFirst: false,
      dateLocationVariant: "inline",
      titleSubtitleVariant: "inline"
    },
    languages: {
      grids: 4,
      variant: "inline",
      separator: "pipe",
      titleStyle: "colon"
    },
    educations: {
      variant: "stacked",
      separator: "none",
      subTitleFirst: false,
      dateLocationVariant: "inline",
      titleSubtitleVariant: "inline"
    },
    experiences: {
      variant: "stacked",
      separator: "none",
      subTitleFirst: false,
      dateLocationVariant: "inline",
      titleSubtitleVariant: "inline"
    },
    certificates: {
      grids: 1,
      variant: "inline",
      separator: "pipe",
      titleStyle: "colon"
    }
  }
}

export const TEMPLATE_BOLD_MODERN: Template = {
  id: "template-5",
  name: "Bold Modern",
  description: "Striking design with bold colors and modern layout for standout applications",
  screenshot: "/images/templates/5.png",
  configs: {
    awards: {
      variant: "dateFirst",
      separator: "dash",
      subTitleFirst: false,
      dateLocationVariant: "stacked",
      titleSubtitleVariant: "stacked"
    },
    skills: {
      grids: 2,
      variant: "grid",
      separator: "dot",
      titleStyle: "bracket"
    },
    courses: {
      variant: "dateFirst",
      separator: "dash",
      subTitleFirst: false,
      dateLocationVariant: "stacked",
      titleSubtitleVariant: "stacked"
    },
    general: {
      links: {
        icon: {
          type: "arrow",
          color: "#DC2626",
          visible: true
        },
        color: "#DC2626",
        underline: true
      },
      colors: {
        apply: ["name", "dates", "headings"],
        primary: {
          bgColor: "#DC2626",
          textColor: "#FFFFFF",
          accentColor: "#F4E69E"
        },
        secondary: {
          bgColor: "#F3F4F6",
          textColor: "#1F2937",
          accentColor: "#DC2626"
        }
      },
      layout: {
        rtl: false,
        size: "A4",
        order: {
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
          ],
          twoCol: {
            left: ["summary", "skills", "languages"],
            right: ["experiences", "educations", "projects", "certificates", "awards", "courses"]
          }
        },
        columns: "2",
        language: "en",
        dateFormat: "MM/DD/YYYY",
        sectionGap: 12,
        columnsWidth: {
          left: 40,
          right: 60
        },
        contentLayout: {
          title: {
            fontCase: "uppercase",
            fontStyle: "normal",
            fontWeight: "bold",
            fontSizeMultiplier: 1.25
          },
          indent: 6,
          listType: "square",
          subtitle: {
            fontCase: "uppercase",
            fontStyle: "normal",
            fontWeight: "bold",
            fontSizeMultiplier: 1
          },
          dateFirstWidth: {
            left: 35,
            right: 65
          },
          contentFirstWidth: {
            left: 65,
            right: 35
          }
        },
        verticalMargin: 8,
        horizontalMargin: 8,
        personalPosition: "top"
      },
      headings: {
        icon: {
          size: 18,
          custom: {},
          visible: true
        },
        variant: "border",
        fontCase: "uppercase",
        fontWeight: "bold",
        fontSizeMultiplier: 1.5
      },
      typography: {
        fontSize: 10,
        fontFamily: "firasans",
        lineHeight: 1.4,
        letterSpacing: 0.8
      }
    },
    summary: {
      grids: 1,
      variant: "inline",
      separator: "pipe",
      titleStyle: "colon"
    },
    personal: {
      main: {
        title: {
          fontSize: 32,
          fontWeight: "bold"
        },
        variant: "stacked",
        subtitle: {
          fontSize: 20,
          fontWeight: "bold"
        },
        bottomSpace: 12
      },
      align: "left",
      details: {
        icon: {
          size: 18,
          type: "filledRounded",
          align: "left",
          visible: true
        },
        variant: "inline",
        separator: "slash"
      },
      variant: "stacked",
      bottomSpace: 20
    },
    projects: {
      variant: "dateFirst",
      separator: "dash",
      subTitleFirst: false,
      dateLocationVariant: "stacked",
      titleSubtitleVariant: "stacked"
    },
    languages: {
      grids: 2,
      variant: "grid",
      separator: "slash",
      titleStyle: "bracket"
    },
    educations: {
      variant: "dateFirst",
      separator: "dash",
      subTitleFirst: false,
      dateLocationVariant: "stacked",
      titleSubtitleVariant: "stacked"
    },
    experiences: {
      variant: "dateFirst",
      separator: "dash",
      subTitleFirst: false,
      dateLocationVariant: "stacked",
      titleSubtitleVariant: "stacked"
    },
    certificates: {
      grids: 1,
      variant: "inline",
      separator: "slash",
      titleStyle: "dash"
    }
  }
}

export const TEMPLATE_ACADEMIC_TRADITIONAL: Template = {
  id: "template-6",
  name: "Academic Traditional",
  description: "Classic, formal design perfect for academic and research positions",
  screenshot: "/images/templates/6.png",
  configs: {
    general: {
      layout: {
        language: "en",
        dateFormat: "YYYY-MM-DD",
        rtl: false,
        size: "A4",
        verticalMargin: 20,
        horizontalMargin: 20,
        columns: "1",
        sectionGap: 16,
        columnsWidth: {
          left: 50,
          right: 50
        },
        personalPosition: "top",
        contentLayout: {
          listType: "disc",
          indent: 3,
          subtitle: {
            fontStyle: "italic",
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
            left: 75,
            right: 25
          },
          dateFirstWidth: {
            left: 25,
            right: 75
          }
        },
        order: {
          twoCol: {
            left: ["summary", "experiences", "projects"],
            right: ["educations", "skills", "languages", "certificates", "awards", "courses"]
          },
          oneCol: [
            "summary",
            "educations",
            "experiences",
            "projects",
            "certificates",
            "courses",
            "awards",
            "skills",
            "languages"
          ]
        }
      },
      headings: {
        fontSizeMultiplier: 1.25,
        fontWeight: "bold",
        fontCase: "inherit",
        variant: "underline-full",
        icon: {
          visible: false,
          size: 16,
          custom: {}
        }
      },
      links: {
        underline: true,
        color: "#1A5490",
        icon: {
          type: "chain",
          visible: false,
          color: "#1A5490"
        }
      },
      typography: {
        fontFamily: "garamond",
        lineHeight: 1.4,
        letterSpacing: 0,
        fontSize: 11
      },
      colors: {
        apply: ["headings"],
        primary: {
          textColor: "#FFFFFF",
          bgColor: "#1A5490",
          accentColor: "#2E7D32"
        },
        secondary: {
          textColor: "#212121",
          bgColor: "#FFFFFF",
          accentColor: "#1A5490"
        }
      }
    },
    summary: { variant: "inline", grids: 1, separator: "none", titleStyle: "none" },
    awards: {
      variant: "dateFirst",
      separator: "comma",
      dateLocationVariant: "inline",
      titleSubtitleVariant: "inline",
      subTitleFirst: false
    },
    personal: {
      variant: "stacked",
      align: "center",
      bottomSpace: 28,
      main: {
        variant: "stacked",
        bottomSpace: 14,
        title: { fontSize: 26, fontWeight: "bold" },
        subtitle: {
          fontSize: 19,
          fontWeight: "normal"
        }
      },
      details: {
        variant: "inline",
        separator: "comma",
        icon: { visible: false, align: "left", type: "simple", size: 14 }
      }
    },
    experiences: {
      variant: "dateFirst",
      separator: "comma",
      dateLocationVariant: "inline",
      titleSubtitleVariant: "inline",
      subTitleFirst: false
    },
    skills: { variant: "inline", separator: "comma", grids: 3, titleStyle: "colon" },
    certificates: { variant: "inline", separator: "comma", grids: 1, titleStyle: "colon" },
    projects: {
      dateLocationVariant: "inline",
      titleSubtitleVariant: "inline",
      separator: "comma",
      variant: "dateFirst",
      subTitleFirst: false
    },
    educations: {
      variant: "dateFirst",
      separator: "comma",
      titleSubtitleVariant: "inline",
      dateLocationVariant: "inline",
      subTitleFirst: false
    },
    languages: {
      variant: "inline",
      separator: "comma",
      grids: 3,
      titleStyle: "colon"
    },
    courses: {
      variant: "dateFirst",
      separator: "comma",
      dateLocationVariant: "inline",
      titleSubtitleVariant: "inline",
      subTitleFirst: false
    }
  }
}

export const TEMPLATE_TECH_STARTUP: Template = {
  id: "template-7",
  name: "Tech Startup",
  description: "Vibrant and dynamic design with personal info on the left sidebar - perfect for tech startups",
  screenshot: "/images/templates/7.png",
  configs: {
    awards: {
      variant: "dateFirst",
      separator: "dash",
      subTitleFirst: false,
      dateLocationVariant: "inline",
      titleSubtitleVariant: "inline"
    },
    skills: {
      grids: 2,
      variant: "grid",
      separator: "dot",
      titleStyle: "bracket"
    },
    courses: {
      variant: "dateFirst",
      separator: "dash",
      subTitleFirst: false,
      dateLocationVariant: "inline",
      titleSubtitleVariant: "inline"
    },
    general: {
      links: {
        icon: {
          type: "arrow",
          color: "#10B981",
          visible: true
        },
        color: "#10B981",
        underline: false
      },
      colors: {
        apply: ["dates", "headings"],
        primary: {
          bgColor: "#10B981",
          textColor: "#FFFFFF",
          accentColor: "#F7F7F7"
        },
        secondary: {
          bgColor: "#F9FAFB",
          textColor: "#111827",
          accentColor: "#10B981"
        }
      },
      layout: {
        rtl: false,
        size: "A4",
        order: {
          oneCol: [
            "summary",
            "experiences",
            "projects",
            "educations",
            "skills",
            "languages",
            "certificates",
            "courses",
            "awards"
          ],
          twoCol: {
            left: ["skills", "languages", "certificates"],
            right: ["summary", "experiences", "projects", "educations", "awards", "courses"]
          }
        },
        columns: "2",
        language: "en",
        dateFormat: "MMM DD, YYYY",
        sectionGap: 14,
        columnsWidth: {
          left: 35,
          right: 65
        },
        contentLayout: {
          title: {
            fontCase: "inherit",
            fontStyle: "normal",
            fontWeight: "bold",
            fontSizeMultiplier: 1.15
          },
          indent: 3,
          listType: "circle",
          subtitle: {
            fontCase: "inherit",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSizeMultiplier: 1
          },
          dateFirstWidth: {
            left: 28,
            right: 72
          },
          contentFirstWidth: {
            left: 72,
            right: 28
          }
        },
        verticalMargin: 10,
        horizontalMargin: 10,
        personalPosition: "left"
      },
      headings: {
        icon: {
          size: 14,
          custom: {},
          visible: true
        },
        variant: "pill",
        fontCase: "uppercase",
        fontWeight: "bold",
        fontSizeMultiplier: 1.35
      },
      typography: {
        fontSize: 10,
        fontFamily: "opensans",
        lineHeight: 1.6,
        letterSpacing: 0.3
      }
    },
    summary: {
      grids: 1,
      variant: "inline",
      separator: "none",
      titleStyle: "none"
    },
    personal: {
      main: {
        title: {
          fontSize: 24,
          fontWeight: "bold"
        },
        variant: "stacked",
        subtitle: {
          fontSize: 16,
          fontWeight: "normal"
        },
        bottomSpace: 10
      },
      align: "left",
      details: {
        icon: {
          size: 12,
          type: "outlineRounded",
          align: "left",
          visible: true
        },
        variant: "stacked",
        separator: "slash"
      },
      variant: "stacked",
      bottomSpace: 22
    },
    projects: {
      variant: "dateFirst",
      separator: "dash",
      subTitleFirst: false,
      dateLocationVariant: "inline",
      titleSubtitleVariant: "inline"
    },
    languages: {
      grids: 2,
      variant: "grid",
      separator: "dot",
      titleStyle: "bracket"
    },
    educations: {
      variant: "dateFirst",
      separator: "dash",
      subTitleFirst: false,
      dateLocationVariant: "inline",
      titleSubtitleVariant: "inline"
    },
    experiences: {
      variant: "dateFirst",
      separator: "dash",
      subTitleFirst: false,
      dateLocationVariant: "inline",
      titleSubtitleVariant: "inline"
    },
    certificates: {
      grids: 1,
      variant: "inline",
      separator: "slash",
      titleStyle: "colon"
    }
  }
}

export const TEMPLATE_ELEGANT_PROFESSIONAL: Template = {
  id: "template-8",
  name: "Elegant Professional",
  description: "Sophisticated design with personal info on the right sidebar - ideal for executives",
  screenshot: "/images/templates/8.png",
  configs: {
    general: {
      layout: {
        language: "en",
        dateFormat: "MMMM DD, YYYY",
        rtl: false,
        size: "A4",
        verticalMargin: 16,
        horizontalMargin: 16,
        columns: "2",
        sectionGap: 16,
        columnsWidth: {
          left: 60,
          right: 40
        },
        personalPosition: "right",
        contentLayout: {
          listType: "disc",
          indent: 4,
          subtitle: {
            fontStyle: "italic",
            fontCase: "inherit",
            fontSizeMultiplier: 1,
            fontWeight: "normal"
          },
          title: {
            fontStyle: "normal",
            fontCase: "inherit",
            fontSizeMultiplier: 1.12,
            fontWeight: "bold"
          },
          contentFirstWidth: {
            left: 68,
            right: 32
          },
          dateFirstWidth: {
            left: 32,
            right: 68
          }
        },
        order: {
          twoCol: {
            left: ["summary", "experiences", "projects"],
            right: ["educations", "skills", "languages", "certificates", "awards", "courses"]
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
        fontSizeMultiplier: 1.28,
        fontWeight: "bold",
        fontCase: "uppercase",
        variant: "underline-full",
        icon: {
          visible: false,
          size: 16,
          custom: {}
        }
      },
      links: {
        underline: true,
        color: "#7C3AED",
        icon: {
          type: "chain",
          visible: false,
          color: "#7C3AED"
        }
      },
      typography: {
        fontFamily: "georgia",
        lineHeight: 1.5,
        letterSpacing: 0.1,
        fontSize: 11
      },
      colors: {
        apply: ["headings"],
        primary: {
          textColor: "#FFFFFF",
          bgColor: "#7C3AED",
          accentColor: "#A78BFA"
        },
        secondary: {
          textColor: "#1F2937",
          bgColor: "#FFFFFF",
          accentColor: "#7C3AED"
        }
      }
    },
    summary: { variant: "inline", grids: 1, separator: "none", titleStyle: "none" },
    awards: {
      variant: "dateFirst",
      separator: "comma",
      dateLocationVariant: "inline",
      titleSubtitleVariant: "inline",
      subTitleFirst: false
    },
    personal: {
      variant: "stacked",
      align: "left",
      bottomSpace: 30,
      main: {
        variant: "stacked",
        bottomSpace: 14,
        title: { fontSize: 26, fontWeight: "bold" },
        subtitle: {
          fontSize: 18,
          fontWeight: "normal"
        }
      },
      details: {
        variant: "stacked",
        separator: "pipe",
        icon: { visible: false, align: "left", type: "simple", size: 14 }
      }
    },
    experiences: {
      variant: "dateFirst",
      separator: "comma",
      dateLocationVariant: "inline",
      titleSubtitleVariant: "inline",
      subTitleFirst: false
    },
    skills: { variant: "inline", separator: "comma", grids: 3, titleStyle: "colon" },
    certificates: { variant: "inline", separator: "comma", grids: 1, titleStyle: "colon" },
    projects: {
      dateLocationVariant: "inline",
      titleSubtitleVariant: "inline",
      separator: "comma",
      variant: "dateFirst",
      subTitleFirst: false
    },
    educations: {
      variant: "dateFirst",
      separator: "comma",
      titleSubtitleVariant: "inline",
      dateLocationVariant: "inline",
      subTitleFirst: false
    },
    languages: {
      variant: "inline",
      separator: "comma",
      grids: 3,
      titleStyle: "colon"
    },
    courses: {
      variant: "dateFirst",
      separator: "comma",
      dateLocationVariant: "inline",
      titleSubtitleVariant: "inline",
      subTitleFirst: false
    }
  }
}

export const TEMPLATE_COMPACT_DENSE: Template = {
  id: "template-9",
  name: "Compact Dense",
  description: "Information-dense layout with unified color scheme - maximizing content efficiently",
  screenshot: "/images/templates/9.png",
  configs: {
    general: {
      layout: {
        language: "en",
        dateFormat: "YYYY-MM-DD",
        rtl: false,
        size: "A4",
        verticalMargin: 10,
        horizontalMargin: 12,
        columns: "2",
        sectionGap: 10,
        columnsWidth: {
          left: 48,
          right: 52
        },
        personalPosition: "top",
        contentLayout: {
          listType: "square",
          indent: 2,
          subtitle: {
            fontStyle: "normal",
            fontCase: "inherit",
            fontSizeMultiplier: 1,
            fontWeight: "normal"
          },
          title: {
            fontStyle: "normal",
            fontCase: "inherit",
            fontSizeMultiplier: 1.08,
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
            left: ["summary", "experiences", "projects", "awards"],
            right: ["educations", "skills", "languages", "certificates", "courses"]
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
        fontSizeMultiplier: 1.18,
        fontWeight: "bold",
        fontCase: "uppercase",
        variant: "border",
        icon: {
          visible: true,
          size: 12,
          custom: {}
        }
      },
      links: {
        underline: false,
        color: "#059669",
        icon: {
          type: "arrow",
          visible: true,
          color: "#059669"
        }
      },
      typography: {
        fontFamily: "calibri",
        lineHeight: 1.3,
        letterSpacing: 0,
        fontSize: 9
      },
      colors: {
        apply: ["name", "dates", "headings"],
        primary: {
          textColor: "#1F2937",
          bgColor: "#F3F4F6",
          accentColor: "#059669"
        },
        secondary: {
          textColor: "#1F2937",
          bgColor: "#F3F4F6",
          accentColor: "#059669"
        }
      }
    },
    summary: { variant: "inline", grids: 1, separator: "pipe", titleStyle: "colon" },
    awards: {
      variant: "dateFirst",
      separator: "pipe",
      dateLocationVariant: "inline",
      titleSubtitleVariant: "inline",
      subTitleFirst: false
    },
    personal: {
      variant: "stacked",
      align: "left",
      bottomSpace: 16,
      main: {
        variant: "inline",
        bottomSpace: 8,
        title: { fontSize: 22, fontWeight: "bold" },
        subtitle: {
          fontSize: 16,
          fontWeight: "normal"
        }
      },
      details: {
        variant: "inline",
        separator: "pipe",
        icon: { visible: true, align: "left", type: "filledSquare", size: 10 }
      }
    },
    experiences: {
      variant: "dateFirst",
      separator: "pipe",
      dateLocationVariant: "inline",
      titleSubtitleVariant: "inline",
      subTitleFirst: false
    },
    skills: { variant: "grid", separator: "pipe", grids: 3, titleStyle: "colon" },
    certificates: { variant: "inline", separator: "pipe", grids: 1, titleStyle: "dash" },
    projects: {
      dateLocationVariant: "inline",
      titleSubtitleVariant: "inline",
      separator: "pipe",
      variant: "dateFirst",
      subTitleFirst: false
    },
    educations: {
      variant: "dateFirst",
      separator: "pipe",
      titleSubtitleVariant: "inline",
      dateLocationVariant: "inline",
      subTitleFirst: false
    },
    languages: {
      variant: "grid",
      separator: "pipe",
      grids: 3,
      titleStyle: "colon"
    },
    courses: {
      variant: "dateFirst",
      separator: "pipe",
      dateLocationVariant: "inline",
      titleSubtitleVariant: "inline",
      subTitleFirst: false
    }
  }
}

export const TEMPLATE_COLORFUL_CREATIVE: Template = {
  id: "template-10",
  name: "Colorful Creative",
  description: "Bright and vibrant design perfect for creative industries and artistic roles",
  screenshot: "/images/templates/10.png",
  configs: {
    awards: {
      variant: "contentFirst",
      separator: "dot",
      subTitleFirst: true,
      dateLocationVariant: "stacked",
      titleSubtitleVariant: "stacked"
    },
    skills: {
      grids: 2,
      variant: "grid",
      separator: "dot",
      titleStyle: "bracket"
    },
    courses: {
      variant: "contentFirst",
      separator: "dot",
      subTitleFirst: true,
      dateLocationVariant: "stacked",
      titleSubtitleVariant: "stacked"
    },
    general: {
      links: {
        icon: {
          type: "arrow",
          color: "#EC4899",
          visible: true
        },
        color: "#EC4899",
        underline: false
      },
      colors: {
        apply: ["name", "dates", "headings"],
        primary: {
          bgColor: "#EC4899",
          textColor: "#FFFFFF",
          accentColor: "#EDEDED"
        },
        secondary: {
          bgColor: "#FEF3C7",
          textColor: "#1F2937",
          accentColor: "#EC4899"
        }
      },
      layout: {
        rtl: false,
        size: "A4",
        order: {
          oneCol: [
            "summary",
            "experiences",
            "projects",
            "educations",
            "skills",
            "languages",
            "certificates",
            "courses",
            "awards"
          ],
          twoCol: {
            left: ["summary", "skills", "languages", "certificates"],
            right: ["experiences", "projects", "educations", "awards", "courses"]
          }
        },
        columns: "2",
        language: "en",
        dateFormat: "MMM DD, YYYY",
        sectionGap: 12,
        columnsWidth: {
          left: 35,
          right: 65
        },
        contentLayout: {
          title: {
            fontCase: "capitalize",
            fontStyle: "normal",
            fontWeight: "bold",
            fontSizeMultiplier: 1.25
          },
          indent: 5,
          listType: "circle",
          subtitle: {
            fontCase: "capitalize",
            fontStyle: "italic",
            fontWeight: "normal",
            fontSizeMultiplier: 1.05
          },
          dateFirstWidth: {
            left: 22,
            right: 78
          },
          contentFirstWidth: {
            left: 78,
            right: 22
          }
        },
        verticalMargin: 8,
        horizontalMargin: 8,
        personalPosition: "top"
      },
      headings: {
        icon: {
          size: 16,
          custom: {},
          visible: true
        },
        variant: "pill",
        fontCase: "uppercase",
        fontWeight: "bold",
        fontSizeMultiplier: 1.45
      },
      typography: {
        fontSize: 10,
        fontFamily: "titilliumweb",
        lineHeight: 1.5,
        letterSpacing: 0.4
      }
    },
    summary: {
      grids: 1,
      variant: "inline",
      separator: "dot",
      titleStyle: "bracket"
    },
    personal: {
      main: {
        title: {
          fontSize: 34,
          fontWeight: "bold"
        },
        variant: "stacked",
        subtitle: {
          fontSize: 24,
          fontWeight: "normal"
        },
        bottomSpace: 12
      },
      align: "center",
      details: {
        icon: {
          size: 16,
          type: "outlineRounded",
          align: "left",
          visible: true
        },
        variant: "inline",
        separator: "dot"
      },
      variant: "stacked",
      bottomSpace: 24
    },
    projects: {
      variant: "contentFirst",
      separator: "dot",
      subTitleFirst: true,
      dateLocationVariant: "stacked",
      titleSubtitleVariant: "stacked"
    },
    languages: {
      grids: 2,
      variant: "grid",
      separator: "dot",
      titleStyle: "bracket"
    },
    educations: {
      variant: "contentFirst",
      separator: "dot",
      subTitleFirst: true,
      dateLocationVariant: "stacked",
      titleSubtitleVariant: "stacked"
    },
    experiences: {
      variant: "contentFirst",
      separator: "dot",
      subTitleFirst: true,
      dateLocationVariant: "stacked",
      titleSubtitleVariant: "stacked"
    },
    certificates: {
      grids: 1,
      variant: "inline",
      separator: "slash",
      titleStyle: "bracket"
    }
  }
}

export const TEMPLATES: Template[] = [
  TEMPLATE_MODERN_PROFESSIONAL,
  TEMPLATE_CLASSIC_EXECUTIVE,
  TEMPLATE_CREATIVE_PORTFOLIO,
  TEMPLATE_MINIMALIST,
  TEMPLATE_BOLD_MODERN,
  TEMPLATE_ACADEMIC_TRADITIONAL,
  TEMPLATE_TECH_STARTUP,
  TEMPLATE_ELEGANT_PROFESSIONAL,
  TEMPLATE_COMPACT_DENSE,
  TEMPLATE_COLORFUL_CREATIVE
]

export function getTemplateById(id: string): Template | undefined {
  return TEMPLATES.find((template) => template.id === id)
}
