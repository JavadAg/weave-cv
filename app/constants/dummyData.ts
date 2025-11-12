import type { TAdvancedContent, TBasicContent, TCoreSections, TPersonalContent } from "~/utils/schemas/content.schema"

export const DUMMY_TITLE = "Untitled Resume"

export const DUMMY_PERSONAL_SECTION: TPersonalContent = {
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
      "<p>Dedicated software engineer with expertise in full-stack development and cloud architecture. Proven track record of delivering scalable solutions and leading technical teams in fast-paced environments. Passionate about creating innovative solutions that solve real-world problems.</p>"
  }
]

export const DUMMY_EXPERIENCE_DATA: TAdvancedContent[] = [
  {
    id: "experience-1",
    isHidden: false,
    subtitle: "Amazon",
    title: "Software Engineer",
    startDate: "2022-03-01",
    endDate: "2024-03-01",
    present: true,
    showDateDay: true,
    location: "Seattle, WA",
    description:
      "<ul><li><p>Led development of microservices architecture serving 100K+ daily users.</p></li><li><p>Mentored junior developers and established code review best practices.</p></li><li><p>Implemented CI/CD pipelines reducing deployment time by 60%.</p></li><li><p>Architected scalable solutions using AWS, Docker, and Kubernetes.</p></li></ul>"
  },
  {
    id: "experience-2",
    isHidden: false,
    subtitle: "Google",
    title: "Senior Software Engineer",
    startDate: "2020-07-01",
    endDate: "2022-02-01",
    present: false,
    showDateDay: true,
    location: "San Francisco, CA",
    description:
      "<ul><li><p>Developed RESTful APIs using Node.js and Express framework.</p></li><li><p>Built responsive frontend applications with React and TypeScript.</p></li><li><p>Collaborated with UX designers to implement pixel-perfect interfaces.</p></li><li><p>Optimized database queries improving response time by 40%.</p></li></ul>"
  }
]

export const DUMMY_EDUCATION_DATA: TAdvancedContent[] = [
  {
    id: "education-1",
    isHidden: false,
    subtitle: "Stanford University",
    title: "Master of Science in Computer Science",
    startDate: "2017-09-01",
    endDate: "2019-05-01",
    present: false,
    showDateDay: true,
    location: "Stanford, CA",
    description:
      "<ul><li><p>Specialized in distributed systems and machine learning applications</p></li><li><p>Graduated Magna Cum Laude with GPA 3.8/4.0</p></li><li><p>Relevant coursework: Advanced Algorithms, Cloud Computing, Distributed Systems</p></li></ul>"
  }
]

export const DUMMY_CERTIFICATE_DATA: TBasicContent[] = [
  {
    id: "certificate-1",
    isHidden: false,
    title: "Certificate Title",
    description:
      "<p>Professional certification in cloud architecture and deployment. Validated expertise in designing and deploying scalable systems on AWS.</p>",
    url: "https://aws.amazon.com/certification/"
  },
  {
    id: "certificate-2",
    isHidden: false,
    title: "Certificate Title",
    description:
      "<p>Advanced certification in Google Cloud Platform development. Demonstrates ability to build and deploy applications on GCP.</p>",
    url: "https://cloud.google.com/certification"
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
    showDateDay: true,
    location: "Online",
    url: "https://frontendmasters.com",
    description:
      "<ul><li><p>Mastered advanced React concepts including hooks, context, and performance optimization</p></li><li><p>Built complex applications using modern React ecosystem tools</p></li><li><p>Learned state management patterns with Redux and Zustand</p></li></ul>"
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
    showDateDay: true,
    location: "San Francisco, CA",
    url: "https://techindustryawards.com",
    description:
      "<p>Recognized for outstanding contribution to open-source projects and community building. Awarded for leading innovative solutions in distributed systems.</p>"
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
    present: false,
    showDateDay: true,
    location: "Remote",
    url: "https://cloudsync.enterprise.com",
    description:
      "<ul><li><p>Architected real-time data synchronization platform for enterprise clients.</p></li><li><p>Implemented advanced conflict resolution algorithms with 99.9% accuracy.</p></li><li><p>Scaled to handle 1M+ concurrent connections using Kubernetes.</p></li><li><p>Built with Node.js, PostgreSQL, Redis, and deployed on AWS.</p></li></ul>"
  }
]

export const DUMMY_LANGUAGE_DATA: TBasicContent[] = [
  {
    id: "language-1",
    isHidden: false,
    title: "English",
    description: "<p>Native proficiency. Fluent in both written and spoken communication.</p>"
  },
  {
    id: "language-2",
    isHidden: false,
    title: "French",
    description: "<p>Conversational. Can communicate effectively in professional and social settings.</p>"
  }
]

export const DUMMY_SKILL_DATA: TBasicContent[] = [
  {
    id: "skill-1",
    title: "Backend Technologies",
    isHidden: false,
    description:
      "<ul><li><p>Node.js</p></li><li><p>Python</p></li><li><p>Go</p></li><li><p>Java</p></li><li><p>PostgreSQL</p></li><li><p>Redis</p></li><li><p>GraphQL</p></li><li><p>REST APIs</p></li></ul>"
  },
  {
    id: "skill-2",
    title: "Frontend Frameworks",
    isHidden: false,
    description:
      "<ul><li><p>React</p></li><li><p>Vue.js</p></li><li><p>Angular</p></li><li><p>TypeScript</p></li><li><p>Next.js</p></li><li><p>Nuxt.js</p></li><li><p>Tailwind CSS</p></li><li><p>SCSS/SASS</p></li></ul>"
  },
  {
    id: "skill-3",
    title: "Cloud & DevOps",
    isHidden: false,
    description:
      "<ul><li><p>AWS (EC2, S3, Lambda, RDS)</p></li><li><p>Google Cloud Platform</p></li><li><p>Docker</p></li><li><p>Kubernetes</p></li><li><p>Terraform</p></li><li><p>Jenkins</p></li><li><p>GitHub Actions</p></li><li><p>CI/CD Pipelines</p></li></ul>"
  }
]

export const DUMMY_CORE_SECTIONS: TCoreSections = {
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
