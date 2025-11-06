import type { TAdvancedContent, TBasicContent, TCoreSections, TPersonalContent } from "~/utils/schemas/content.schema"

export const DUMMY_TITLE = "Professional Resume"

export const DUMMY_SUMMARY_ITEM: Omit<TBasicContent, "id"> = {
  isHidden: false,
  title: "Professional Summary",
  description:
    "Dedicated software engineer with expertise in full-stack development and cloud architecture. Proven track record of delivering scalable solutions and leading technical teams in fast-paced environments."
}

export const DUMMY_EXPERIENCE_ITEM: Omit<TAdvancedContent, "id"> = {
  isHidden: false,
  url: "https://innovatecorp.com",
  subtitle: "InnovateCorp Solutions",
  title: "Senior Software Engineer",
  startDate: "2022-03-01",
  endDate: "2024-08-01",
  present: false,
  location: "Austin, TX",
  description:
    "<ul><li><p>Led development of microservices architecture serving 100K+ daily users.</p></li><li><p>Mentored junior developers and established code review best practices.</p></li><li><p>Implemented CI/CD pipelines reducing deployment time by 60%.</p></li></ul>"
}

export const DUMMY_EDUCATION_ITEM: Omit<TAdvancedContent, "id"> = {
  isHidden: false,
  subtitle: "Stanford University",
  title: "Master of Science in Software Engineering",
  startDate: "2017-09-01",
  endDate: "2019-05-01",
  location: "Stanford, CA",
  description:
    "<ul><li><p>Specialized in distributed systems and machine learning applications</p></li><li><p>Graduated Magna Cum Laude with GPA 3.8/4.0</p></li></ul>"
}

export const DUMMY_COURSE_ITEM: Omit<TAdvancedContent, "id"> = {
  isHidden: false,
  title: "Advanced React Patterns",
  subtitle: "Frontend Masters",
  startDate: "2023-06-01",
  endDate: "2023-08-01",
  present: false,
  location: "Online",
  description:
    "<ul><li><p>Mastered advanced React concepts including hooks, context, and performance optimization</p></li><li><p>Built complex applications using modern React ecosystem tools</p></li></ul>"
}

export const DUMMY_AWARD_ITEM: Omit<TAdvancedContent, "id"> = {
  isHidden: false,
  title: "Excellence in Innovation",
  subtitle: "Tech Industry Awards",
  startDate: "2023-11-01",
  endDate: "2023-11-01",
  present: false,
  location: "San Francisco, CA",
  description: "Recognized for outstanding contribution to open-source projects and community building"
}

export const DUMMY_PROJECT_ITEM: Omit<TAdvancedContent, "id"> = {
  title: "CloudSync Platform",
  subtitle: "Enterprise Data Synchronization",
  isHidden: false,
  startDate: "2023-01-01",
  endDate: "2023-12-01",
  url: "https://cloudsync.enterprise.com",
  description:
    "<ul><li><p>Architected real-time data synchronization platform for enterprise clients.</p></li><li><p>Implemented advanced conflict resolution algorithms with 99.9% accuracy.</p></li><li><p>Scaled to handle 1M+ concurrent connections using Kubernetes.</p></li></ul>"
}

export const DUMMY_SKILL_ITEM: Omit<TBasicContent, "id"> = {
  isHidden: false,
  title: "Backend Technologies",
  description: "Node.js, Python, Go, PostgreSQL, Redis"
}

export const DUMMY_LANGUAGE_ITEM: Omit<TBasicContent, "id"> = {
  isHidden: false,
  title: "French",
  description: "Conversational"
}

export const DUMMY_CERTIFICATE_ITEM: Omit<TBasicContent, "id"> = {
  isHidden: false,
  title: "AWS Solutions Architect",
  description: "Professional certification in cloud architecture and deployment"
}

export const DUMMY_BASIC_SECTION_ITEM = {
  skills: DUMMY_SKILL_ITEM,
  summary: DUMMY_SUMMARY_ITEM,
  languages: DUMMY_LANGUAGE_ITEM,
  certificates: DUMMY_CERTIFICATE_ITEM
}

export const DUMMY_ADVANCED_SECTION_ITEM = {
  educations: DUMMY_EDUCATION_ITEM,
  experiences: DUMMY_EXPERIENCE_ITEM,
  projects: DUMMY_PROJECT_ITEM,
  awards: DUMMY_AWARD_ITEM,
  courses: DUMMY_COURSE_ITEM
}

export const DUMMY_PERSONAL_CONTENT: TPersonalContent = {
  title: "Sarah Johnson",
  subtitle: "Senior Software Engineer",
  details: [
    {
      value: "sarah.johnson@email.com",
      isHidden: false,
      type: "email",
      url: "mailto:sarah.johnson@email.com"
    },
    {
      value: "+1 555 987 6543",
      isHidden: false,
      type: "phone",
      url: "tel:+15559876543"
    },
    {
      value: "sarah-johnson-dev",
      isHidden: false,
      type: "linkedin",
      url: "https://linkedin.com/in/sarah-johnson-dev"
    },
    {
      value: "sarah-johnson",
      isHidden: false,
      type: "github",
      url: "https://github.com/sarah-johnson"
    }
  ]
}

export const DUMMY_SUMMARY_DATA: TBasicContent[] = [
  {
    id: "summary-1",
    isHidden: false,
    title: "Professional Summary",
    description:
      "<p>Dedicated software engineer with expertise in full-stack development and cloud architecture. Proven track record of delivering scalable solutions and leading technical teams in fast-paced environments.</p>"
  }
]

export const DUMMY_EXPERIENCE_DATA: TAdvancedContent[] = [
  {
    id: "experience-1",
    isHidden: false,
    url: "https://innovatecorp.com",
    subtitle: "InnovateCorp Solutions",
    title: "Senior Software Engineer",
    startDate: "2022-03-01",
    endDate: "2024-08-01",
    present: false,
    location: "Austin, TX",
    description:
      "<ul><li><p><b>Led</b> development of microservices architecture serving 100K+ daily users.</p></li><li><p>Mentored junior developers and established code review best practices.</p></li><li><p>Implemented CI/CD pipelines reducing deployment time by 60%.</p></li></ul>"
  },
  {
    id: "experience-2",
    isHidden: false,
    url: "https://techventures.com",
    subtitle: "TechVentures Inc",
    title: "Full-Stack Developer",
    startDate: "2020-07-01",
    endDate: "2022-02-01",
    location: "Seattle, WA",
    description:
      "<ul><li><p>Developed RESTful APIs using Node.js and Express framework.</p></li><li><p>Built responsive frontend applications with React and TypeScript.</p></li><li><p>Collaborated with UX designers to implement pixel-perfect interfaces.</p></li></ul>"
  },
  {
    id: "experience-3",
    isHidden: false,
    url: "https://startupaccelerator.io",
    subtitle: "Startup Accelerator",
    title: "Junior Developer",
    startDate: "2019-06-01",
    endDate: "2020-06-01",
    location: "Denver, CO",
    description:
      "<ul><li><p>Contributed to early-stage product development using modern web technologies.</p></li><li><p>Participated in agile development processes and sprint planning.</p></li><li><p>Gained experience with cloud platforms and DevOps practices.</p></li></ul>"
  }
]

export const DUMMY_EDUCATION_DATA: TAdvancedContent[] = [
  {
    id: "education-1",
    isHidden: false,
    subtitle: "Stanford University",
    title: "Master of Science in Software Engineering",
    startDate: "2017-09-01",
    endDate: "2019-05-01",
    location: "Stanford, CA",
    description:
      "<ul><li><p>Specialized in distributed systems and machine learning applications</p></li><li><p>Graduated Magna Cum Laude with GPA 3.8/4.0</p></li></ul>"
  },
  {
    id: "education-2",
    isHidden: false,
    subtitle: "University of California",
    title: "Bachelor of Science in Computer Science",
    startDate: "2013-09-01",
    endDate: "2017-06-01",
    location: "Berkeley, CA",
    description:
      "<ul><li><p>Focus on algorithms, data structures, and software engineering principles</p></li><li><p>Completed senior capstone project on distributed computing</p></li></ul>"
  }
]

export const DUMMY_CERTIFICATE_DATA: TBasicContent[] = [
  {
    id: "certificate-1",
    isHidden: false,
    title: "AWS Solutions Architect",
    description: "Professional certification in cloud architecture and deployment"
  },
  {
    id: "certificate-2",
    isHidden: false,
    title: "Google Cloud Professional Developer",
    description: "Advanced certification in Google Cloud Platform development"
  }
]

export const DUMMY_COURSE_DATA: TAdvancedContent[] = [
  {
    id: "course-1",
    isHidden: false,
    title: "Advanced React Patterns",
    subtitle: "Frontend Masters",
    startDate: "2023-06-01",
    endDate: "2023-08-01",
    present: false,
    location: "Online",
    description:
      "<ul><li><p>Mastered advanced React concepts including hooks, context, and performance optimization</p></li><li><p>Built complex applications using modern React ecosystem tools</p></li></ul>"
  },
  {
    id: "course-2",
    isHidden: false,
    title: "System Design Fundamentals",
    subtitle: "Educative.io",
    startDate: "2023-03-01",
    endDate: "2023-05-01",
    present: false,
    location: "Online",
    description:
      "<ul><li><p>Learned scalable system architecture patterns and best practices</p></li><li><p>Designed distributed systems handling millions of requests</p></li></ul>"
  }
]

export const DUMMY_AWARD_DATA: TAdvancedContent[] = [
  {
    id: "award-1",
    isHidden: false,
    title: "Excellence in Innovation",
    subtitle: "Tech Industry Awards",
    startDate: "2023-11-01",
    endDate: "2023-11-01",
    present: false,
    location: "San Francisco, CA",
    description: "Recognized for outstanding contribution to open-source projects and community building"
  },
  {
    id: "award-2",
    isHidden: false,
    title: "Best Technical Presentation",
    subtitle: "Developer Conference 2023",
    startDate: "2023-09-01",
    endDate: "2023-09-01",
    present: false,
    location: "Chicago, IL",
    description: "Awarded for innovative approach to microservices architecture and implementation"
  }
]

export const DUMMY_PROJECT_DATA: TAdvancedContent[] = [
  {
    id: "project-1",
    title: "CloudSync Platform",
    subtitle: "Enterprise Data Synchronization",
    isHidden: false,
    startDate: "2023-01-01",
    endDate: "2023-12-01",
    url: "https://cloudsync.enterprise.com",
    description:
      "<ul><li><p>Architected real-time data synchronization platform for enterprise clients.</p></li><li><p>Implemented advanced conflict resolution algorithms with 99.9% accuracy.</p></li><li><p>Scaled to handle 1M+ concurrent connections using Kubernetes.</p></li></ul>"
  },
  {
    id: "project-2",
    title: "DevTools Suite",
    subtitle: "Developer Productivity Platform",
    isHidden: false,
    startDate: "2022-06-01",
    endDate: "2023-02-01",
    url: "https://devtools.suite.com",
    description:
      "<ul><li><p>Created comprehensive toolkit for streamlining development workflows.</p></li><li><p>Integrated with popular IDEs and version control systems.</p></li><li><p>Reduced development setup time by 70% for new team members.</p></li></ul>"
  }
]

export const DUMMY_LANGUAGE_DATA: TBasicContent[] = [
  { id: "language-1", isHidden: false, title: "English", description: "Native" },
  { id: "language-2", isHidden: false, title: "French", description: "Conversational" },
  { id: "language-3", isHidden: false, title: "Spanish", description: "Basic" }
]

export const DUMMY_SKILL_DATA: TBasicContent[] = [
  {
    id: "skill-1",
    title: "Backend Technologies",
    isHidden: false,
    description:
      "<ul><li><p>Node.js</p></li><li><p>Python</p></li><li><p>Go</p></li><li><p>PostgreSQL</p></li><li><p>Redis</p></li></ul>"
  },
  {
    id: "skill-2",
    title: "Frontend Frameworks",
    isHidden: false,
    description:
      "<ul><li><p>React</p></li><li><p>Vue.js</p></li><li><p>Angular</p></li><li><p>TypeScript</p></li><li><p>Next.js</p></li></ul>"
  },
  {
    id: "skill-3",
    title: "Cloud & DevOps",
    isHidden: false,
    description:
      "<ul><li><p>AWS</p></li><li><p>Docker</p></li><li><p>Kubernetes</p></li><li><p>Terraform</p></li><li><p>Jenkins</p></li></ul>"
  },
  {
    id: "skill-4",
    title: "Data & Analytics",
    isHidden: false,
    description:
      "<ul><li><p>SQL</p></li><li><p>MongoDB</p></li><li><p>Elasticsearch</p></li><li><p>Apache Kafka</p></li></ul>"
  }
]

export const DUMMY_CORE_SECTIONS_DATA: TCoreSections = {
  summary: {
    title: "Summary",
    isTitleVisible: true,
    isSectionVisible: true,
    type: "summary",
    contents: DUMMY_SUMMARY_DATA
  },
  experiences: {
    title: "Experience",
    isTitleVisible: true,
    isSectionVisible: true,
    type: "experiences",
    contents: DUMMY_EXPERIENCE_DATA
  },
  awards: {
    title: "Awards",
    isTitleVisible: true,
    isSectionVisible: true,
    type: "awards",
    contents: DUMMY_AWARD_DATA
  },
  courses: {
    title: "Courses",
    isTitleVisible: true,
    isSectionVisible: true,
    type: "courses",
    contents: DUMMY_COURSE_DATA
  },
  educations: {
    title: "Education",
    isTitleVisible: true,
    isSectionVisible: true,
    type: "educations",
    contents: DUMMY_EDUCATION_DATA
  },
  projects: {
    title: "Projects",
    isTitleVisible: true,
    isSectionVisible: true,
    type: "projects",
    contents: DUMMY_PROJECT_DATA
  },
  languages: {
    type: "languages",
    isTitleVisible: true,
    isSectionVisible: true,
    title: "Languages",
    contents: DUMMY_LANGUAGE_DATA
  },
  certificates: {
    type: "certificates",
    isTitleVisible: true,
    isSectionVisible: true,
    title: "Certificates",
    contents: DUMMY_CERTIFICATE_DATA
  },
  skills: {
    isTitleVisible: true,
    isSectionVisible: true,
    type: "skills",
    title: "Skills",
    contents: DUMMY_SKILL_DATA
  }
}
