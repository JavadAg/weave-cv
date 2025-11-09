import type { TConfigs } from "~/utils/schemas/configs/configs.schema"

export interface Template {
  id: string
  name: string
  description: string
  configs: TConfigs
}

export const TEMPLATE_MODERN_PROFESSIONAL: Template = {
  id: "template-1",
  name: "Modern Professional",
  description: "A clean and modern design perfect for tech and creative roles",
  configs: {
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
        color: "#2563EB",
        icon: {
          type: "arrow",
          visible: true,
          color: "#2563EB"
        }
      },
      typography: {
        fontFamily: "inter",
        lineHeight: 1.5,
        letterSpacing: 0,
        fontSize: 11
      },
      colors: {
        apply: ["name", "dates", "headings"],
        primary: {
          textColor: "#FFFFFF",
          bgColor: "#1E40AF",
          accentColor: "#3B82F6"
        },
        secondary: {
          textColor: "#1F2937",
          bgColor: "#FFFFFF",
          accentColor: "#2563EB"
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
        title: { fontSize: 28, fontWeight: "bold" },
        subtitle: {
          fontSize: 20,
          fontWeight: "normal"
        }
      },
      details: {
        variant: "inline",
        separator: "pipe",
        icon: { visible: true, align: "left", type: "filledSquare", size: 14 }
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
}

export const TEMPLATE_CLASSIC_EXECUTIVE: Template = {
  id: "template-2",
  name: "Classic Executive",
  description: "Traditional and authoritative layout ideal for corporate and executive positions",
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
  configs: {
    general: {
      layout: {
        language: "en",
        dateFormat: "MMM DD, YYYY",
        rtl: false,
        size: "A4",
        verticalMargin: 10,
        horizontalMargin: 10,
        columns: "2",
        sectionGap: 16,
        columnsWidth: {
          left: 45,
          right: 55
        },
        personalPosition: "top",
        contentLayout: {
          listType: "circle",
          indent: 4,
          subtitle: {
            fontStyle: "italic",
            fontCase: "inherit",
            fontSizeMultiplier: 1.05,
            fontWeight: "normal"
          },
          title: {
            fontStyle: "normal",
            fontCase: "capitalize",
            fontSizeMultiplier: 1.2,
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
            right: ["educations", "skills", "languages", "awards", "certificates", "courses"]
          },
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
          ]
        }
      },
      headings: {
        fontSizeMultiplier: 1.4,
        fontWeight: "bold",
        fontCase: "uppercase",
        variant: "pill",
        icon: {
          visible: true,
          size: 18,
          custom: {}
        }
      },
      links: {
        underline: false,
        color: "#8B5CF6",
        icon: {
          type: "arrow",
          visible: true,
          color: "#8B5CF6"
        }
      },
      typography: {
        fontFamily: "lato",
        lineHeight: 1.5,
        letterSpacing: 0.4,
        fontSize: 11
      },
      colors: {
        apply: ["name", "dates", "headings"],
        primary: {
          textColor: "#FFFFFF",
          bgColor: "#8B5CF6",
          accentColor: "#A78BFA"
        },
        secondary: {
          textColor: "#1F2937",
          bgColor: "#FFFFFF",
          accentColor: "#8B5CF6"
        }
      }
    },
    summary: { variant: "inline", grids: 1, separator: "pipe", titleStyle: "colon" },
    awards: {
      variant: "contentFirst",
      separator: "pipe",
      dateLocationVariant: "stacked",
      titleSubtitleVariant: "stacked",
      subTitleFirst: true
    },
    personal: {
      variant: "stacked",
      align: "center",
      bottomSpace: 28,
      main: {
        variant: "stacked",
        bottomSpace: 16,
        title: { fontSize: 32, fontWeight: "bold" },
        subtitle: {
          fontSize: 22,
          fontWeight: "normal"
        }
      },
      details: {
        variant: "inline",
        separator: "dot",
        icon: { visible: true, align: "left", type: "outlineRounded", size: 18 }
      }
    },
    experiences: {
      variant: "contentFirst",
      separator: "pipe",
      dateLocationVariant: "stacked",
      titleSubtitleVariant: "stacked",
      subTitleFirst: true
    },
    skills: { variant: "grid", separator: "dot", grids: 3, titleStyle: "bracket" },
    certificates: { variant: "inline", separator: "slash", grids: 1, titleStyle: "dash" },
    projects: {
      dateLocationVariant: "stacked",
      titleSubtitleVariant: "stacked",
      separator: "pipe",
      variant: "contentFirst",
      subTitleFirst: true
    },
    educations: {
      variant: "contentFirst",
      separator: "pipe",
      titleSubtitleVariant: "stacked",
      dateLocationVariant: "stacked",
      subTitleFirst: true
    },
    languages: {
      variant: "inline",
      separator: "dot",
      grids: 3,
      titleStyle: "bracket"
    },
    courses: {
      variant: "contentFirst",
      separator: "pipe",
      dateLocationVariant: "stacked",
      titleSubtitleVariant: "stacked",
      subTitleFirst: true
    }
  }
}

export const TEMPLATE_MINIMALIST: Template = {
  id: "template-4",
  name: "Minimalist",
  description: "Clean, simple design with unified colors - maximum readability and elegance",
  configs: {
    general: {
      layout: {
        language: "en",
        dateFormat: "YYYY-MM-DD",
        rtl: false,
        size: "A4",
        verticalMargin: 18,
        horizontalMargin: 18,
        columns: "1",
        sectionGap: 18,
        columnsWidth: {
          left: 50,
          right: 50
        },
        personalPosition: "top",
        contentLayout: {
          listType: "none",
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
            left: ["summary", "experiences", "projects"],
            right: ["educations", "skills", "languages", "certificates"]
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
        fontSizeMultiplier: 1.15,
        fontWeight: "bold",
        fontCase: "inherit",
        variant: "plain",
        icon: {
          visible: false,
          size: 16,
          custom: {}
        }
      },
      links: {
        underline: false,
        color: "#000000",
        icon: {
          type: "arrow",
          visible: false,
          color: "#000000"
        }
      },
      typography: {
        fontFamily: "helvetica",
        lineHeight: 1.5,
        letterSpacing: 0,
        fontSize: 11
      },
      colors: {
        apply: [],
        primary: {
          textColor: "#1F2937",
          bgColor: "#FFFFFF",
          accentColor: "#6B7280"
        },
        secondary: {
          textColor: "#1F2937",
          bgColor: "#FFFFFF",
          accentColor: "#6B7280"
        }
      }
    },
    summary: { variant: "inline", grids: 1, separator: "none", titleStyle: "none" },
    awards: {
      variant: "stacked",
      separator: "none",
      dateLocationVariant: "inline",
      titleSubtitleVariant: "inline",
      subTitleFirst: false
    },
    personal: {
      variant: "stacked",
      align: "left",
      bottomSpace: 36,
      main: {
        variant: "stacked",
        bottomSpace: 20,
        title: { fontSize: 24, fontWeight: "bold" },
        subtitle: {
          fontSize: 18,
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
      variant: "stacked",
      separator: "none",
      dateLocationVariant: "inline",
      titleSubtitleVariant: "inline",
      subTitleFirst: false
    },
    skills: { variant: "inline", separator: "pipe", grids: 4, titleStyle: "colon" },
    certificates: { variant: "inline", separator: "pipe", grids: 1, titleStyle: "colon" },
    projects: {
      dateLocationVariant: "inline",
      titleSubtitleVariant: "inline",
      separator: "none",
      variant: "stacked",
      subTitleFirst: false
    },
    educations: {
      variant: "stacked",
      separator: "none",
      titleSubtitleVariant: "inline",
      dateLocationVariant: "inline",
      subTitleFirst: false
    },
    languages: {
      variant: "inline",
      separator: "pipe",
      grids: 4,
      titleStyle: "colon"
    },
    courses: {
      variant: "stacked",
      separator: "none",
      dateLocationVariant: "inline",
      titleSubtitleVariant: "inline",
      subTitleFirst: false
    }
  }
}

export const TEMPLATE_BOLD_MODERN: Template = {
  id: "template-5",
  name: "Bold Modern",
  description: "Striking design with bold colors and modern layout for standout applications",
  configs: {
    general: {
      layout: {
        language: "en",
        dateFormat: "MM/DD/YYYY",
        rtl: false,
        size: "A4",
        verticalMargin: 8,
        horizontalMargin: 8,
        columns: "2",
        sectionGap: 12,
        columnsWidth: {
          left: 40,
          right: 60
        },
        personalPosition: "top",
        contentLayout: {
          listType: "square",
          indent: 6,
          subtitle: {
            fontStyle: "normal",
            fontCase: "uppercase",
            fontSizeMultiplier: 1,
            fontWeight: "bold"
          },
          title: {
            fontStyle: "normal",
            fontCase: "uppercase",
            fontSizeMultiplier: 1.25,
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
            left: ["summary", "skills", "languages"],
            right: ["experiences", "educations", "projects", "certificates", "awards", "courses"]
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
        fontSizeMultiplier: 1.5,
        fontWeight: "bold",
        fontCase: "uppercase",
        variant: "border",
        icon: {
          visible: true,
          size: 18,
          custom: {}
        }
      },
      links: {
        underline: true,
        color: "#DC2626",
        icon: {
          type: "arrow",
          visible: true,
          color: "#DC2626"
        }
      },
      typography: {
        fontFamily: "firasans",
        lineHeight: 1.4,
        letterSpacing: 0.8,
        fontSize: 10
      },
      colors: {
        apply: ["name", "dates", "headings"],
        primary: {
          textColor: "#FFFFFF",
          bgColor: "#DC2626",
          accentColor: "#EF4444"
        },
        secondary: {
          textColor: "#1F2937",
          bgColor: "#F3F4F6",
          accentColor: "#DC2626"
        }
      }
    },
    summary: { variant: "inline", grids: 1, separator: "pipe", titleStyle: "colon" },
    awards: {
      variant: "dateFirst",
      separator: "dash",
      dateLocationVariant: "stacked",
      titleSubtitleVariant: "stacked",
      subTitleFirst: false
    },
    personal: {
      variant: "stacked",
      align: "left",
      bottomSpace: 20,
      main: {
        variant: "stacked",
        bottomSpace: 12,
        title: { fontSize: 32, fontWeight: "bold" },
        subtitle: {
          fontSize: 20,
          fontWeight: "bold"
        }
      },
      details: {
        variant: "inline",
        separator: "slash",
        icon: { visible: true, align: "left", type: "filledRounded", size: 18 }
      }
    },
    experiences: {
      variant: "dateFirst",
      separator: "dash",
      dateLocationVariant: "stacked",
      titleSubtitleVariant: "stacked",
      subTitleFirst: false
    },
    skills: { variant: "grid", separator: "dot", grids: 2, titleStyle: "bracket" },
    certificates: { variant: "inline", separator: "slash", grids: 1, titleStyle: "dash" },
    projects: {
      dateLocationVariant: "stacked",
      titleSubtitleVariant: "stacked",
      separator: "dash",
      variant: "dateFirst",
      subTitleFirst: false
    },
    educations: {
      variant: "dateFirst",
      separator: "dash",
      titleSubtitleVariant: "stacked",
      dateLocationVariant: "stacked",
      subTitleFirst: false
    },
    languages: {
      variant: "grid",
      separator: "slash",
      grids: 2,
      titleStyle: "bracket"
    },
    courses: {
      variant: "dateFirst",
      separator: "dash",
      dateLocationVariant: "stacked",
      titleSubtitleVariant: "stacked",
      subTitleFirst: false
    }
  }
}

export const TEMPLATE_ACADEMIC_TRADITIONAL: Template = {
  id: "template-6",
  name: "Academic Traditional",
  description: "Classic, formal design perfect for academic and research positions",
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
  configs: {
    general: {
      layout: {
        language: "en",
        dateFormat: "MMM DD, YYYY",
        rtl: false,
        size: "A4",
        verticalMargin: 10,
        horizontalMargin: 10,
        columns: "2",
        sectionGap: 14,
        columnsWidth: {
          left: 35,
          right: 65
        },
        personalPosition: "left",
        contentLayout: {
          listType: "circle",
          indent: 3,
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
            left: 72,
            right: 28
          },
          dateFirstWidth: {
            left: 28,
            right: 72
          }
        },
        order: {
          twoCol: {
            left: ["skills", "languages", "certificates"],
            right: ["summary", "experiences", "projects", "educations", "awards", "courses"]
          },
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
          ]
        }
      },
      headings: {
        fontSizeMultiplier: 1.35,
        fontWeight: "bold",
        fontCase: "uppercase",
        variant: "pill",
        icon: {
          visible: true,
          size: 14,
          custom: {}
        }
      },
      links: {
        underline: false,
        color: "#10B981",
        icon: {
          type: "arrow",
          visible: true,
          color: "#10B981"
        }
      },
      typography: {
        fontFamily: "opensans",
        lineHeight: 1.6,
        letterSpacing: 0.3,
        fontSize: 10
      },
      colors: {
        apply: ["name", "dates", "headings"],
        primary: {
          textColor: "#FFFFFF",
          bgColor: "#10B981",
          accentColor: "#34D399"
        },
        secondary: {
          textColor: "#111827",
          bgColor: "#F9FAFB",
          accentColor: "#10B981"
        }
      }
    },
    summary: { variant: "inline", grids: 1, separator: "none", titleStyle: "none" },
    awards: {
      variant: "dateFirst",
      separator: "dash",
      dateLocationVariant: "inline",
      titleSubtitleVariant: "inline",
      subTitleFirst: false
    },
    personal: {
      variant: "stacked",
      align: "left",
      bottomSpace: 22,
      main: {
        variant: "stacked",
        bottomSpace: 10,
        title: { fontSize: 24, fontWeight: "bold" },
        subtitle: {
          fontSize: 16,
          fontWeight: "normal"
        }
      },
      details: {
        variant: "stacked",
        separator: "slash",
        icon: { visible: true, align: "left", type: "outlineRounded", size: 12 }
      }
    },
    experiences: {
      variant: "dateFirst",
      separator: "dash",
      dateLocationVariant: "inline",
      titleSubtitleVariant: "inline",
      subTitleFirst: false
    },
    skills: { variant: "grid", separator: "dot", grids: 2, titleStyle: "bracket" },
    certificates: { variant: "inline", separator: "slash", grids: 1, titleStyle: "colon" },
    projects: {
      dateLocationVariant: "inline",
      titleSubtitleVariant: "inline",
      separator: "dash",
      variant: "dateFirst",
      subTitleFirst: false
    },
    educations: {
      variant: "dateFirst",
      separator: "dash",
      titleSubtitleVariant: "inline",
      dateLocationVariant: "inline",
      subTitleFirst: false
    },
    languages: {
      variant: "grid",
      separator: "dot",
      grids: 2,
      titleStyle: "bracket"
    },
    courses: {
      variant: "dateFirst",
      separator: "dash",
      dateLocationVariant: "inline",
      titleSubtitleVariant: "inline",
      subTitleFirst: false
    }
  }
}

export const TEMPLATE_ELEGANT_PROFESSIONAL: Template = {
  id: "template-8",
  name: "Elegant Professional",
  description: "Sophisticated design with personal info on the right sidebar - ideal for executives",
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
  configs: {
    general: {
      layout: {
        language: "en",
        dateFormat: "MMM DD, YYYY",
        rtl: false,
        size: "A4",
        verticalMargin: 8,
        horizontalMargin: 8,
        columns: "2",
        sectionGap: 12,
        columnsWidth: {
          left: 35,
          right: 65
        },
        personalPosition: "top",
        contentLayout: {
          listType: "circle",
          indent: 5,
          subtitle: {
            fontStyle: "italic",
            fontCase: "capitalize",
            fontSizeMultiplier: 1.05,
            fontWeight: "normal"
          },
          title: {
            fontStyle: "normal",
            fontCase: "capitalize",
            fontSizeMultiplier: 1.25,
            fontWeight: "bold"
          },
          contentFirstWidth: {
            left: 78,
            right: 22
          },
          dateFirstWidth: {
            left: 22,
            right: 78
          }
        },
        order: {
          twoCol: {
            left: ["summary", "skills", "languages", "certificates"],
            right: ["experiences", "projects", "educations", "awards", "courses"]
          },
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
          ]
        }
      },
      headings: {
        fontSizeMultiplier: 1.45,
        fontWeight: "bold",
        fontCase: "uppercase",
        variant: "pill",
        icon: {
          visible: true,
          size: 16,
          custom: {}
        }
      },
      links: {
        underline: false,
        color: "#EC4899",
        icon: {
          type: "arrow",
          visible: true,
          color: "#EC4899"
        }
      },
      typography: {
        fontFamily: "titilliumweb",
        lineHeight: 1.5,
        letterSpacing: 0.4,
        fontSize: 10
      },
      colors: {
        apply: ["name", "dates", "headings"],
        primary: {
          textColor: "#FFFFFF",
          bgColor: "#EC4899",
          accentColor: "#F472B6"
        },
        secondary: {
          textColor: "#1F2937",
          bgColor: "#FEF3C7",
          accentColor: "#EC4899"
        }
      }
    },
    summary: { variant: "inline", grids: 1, separator: "dot", titleStyle: "bracket" },
    awards: {
      variant: "contentFirst",
      separator: "dot",
      dateLocationVariant: "stacked",
      titleSubtitleVariant: "stacked",
      subTitleFirst: true
    },
    personal: {
      variant: "stacked",
      align: "center",
      bottomSpace: 24,
      main: {
        variant: "stacked",
        bottomSpace: 12,
        title: { fontSize: 34, fontWeight: "bold" },
        subtitle: {
          fontSize: 24,
          fontWeight: "normal"
        }
      },
      details: {
        variant: "inline",
        separator: "dot",
        icon: { visible: true, align: "left", type: "outlineRounded", size: 16 }
      }
    },
    experiences: {
      variant: "contentFirst",
      separator: "dot",
      dateLocationVariant: "stacked",
      titleSubtitleVariant: "stacked",
      subTitleFirst: true
    },
    skills: { variant: "grid", separator: "dot", grids: 2, titleStyle: "bracket" },
    certificates: { variant: "inline", separator: "slash", grids: 1, titleStyle: "bracket" },
    projects: {
      dateLocationVariant: "stacked",
      titleSubtitleVariant: "stacked",
      separator: "dot",
      variant: "contentFirst",
      subTitleFirst: true
    },
    educations: {
      variant: "contentFirst",
      separator: "dot",
      titleSubtitleVariant: "stacked",
      dateLocationVariant: "stacked",
      subTitleFirst: true
    },
    languages: {
      variant: "grid",
      separator: "dot",
      grids: 2,
      titleStyle: "bracket"
    },
    courses: {
      variant: "contentFirst",
      separator: "dot",
      dateLocationVariant: "stacked",
      titleSubtitleVariant: "stacked",
      subTitleFirst: true
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
