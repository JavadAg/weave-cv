import type { TAdvancedContent, TBasicContent } from "~/utils/schemas/content.schema"

/* Used for adding new content to sections */

export const SUMMARY_ITEM: Omit<TBasicContent, "id"> = {
  isHidden: false,
  title: "Professional Summary",
  description:
    "Dedicated software engineer with expertise in full-stack development and cloud architecture. Proven track record of delivering scalable solutions and leading technical teams in fast-paced environments."
}

export const EXPERIENCE_ITEM: Omit<TAdvancedContent, "id"> = {
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

export const EDUCATION_ITEM: Omit<TAdvancedContent, "id"> = {
  isHidden: false,
  subtitle: "Stanford University",
  title: "Master of Science in Software Engineering",
  startDate: "2017-09-01",
  endDate: "2019-05-01",
  location: "Stanford, CA",
  description:
    "<ul><li><p>Specialized in distributed systems and machine learning applications</p></li><li><p>Graduated Magna Cum Laude with GPA 3.8/4.0</p></li></ul>"
}

export const COURSE_ITEM: Omit<TAdvancedContent, "id"> = {
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

export const AWARD_ITEM: Omit<TAdvancedContent, "id"> = {
  isHidden: false,
  title: "Excellence in Innovation",
  subtitle: "Tech Industry Awards",
  startDate: "2023-11-01",
  endDate: "2023-11-01",
  present: false,
  location: "San Francisco, CA",
  description: "Recognized for outstanding contribution to open-source projects and community building"
}

export const PROJECT_ITEM: Omit<TAdvancedContent, "id"> = {
  title: "CloudSync Platform",
  subtitle: "Enterprise Data Synchronization",
  isHidden: false,
  startDate: "2023-01-01",
  endDate: "2023-12-01",
  url: "https://cloudsync.enterprise.com",
  description:
    "<ul><li><p>Architected real-time data synchronization platform for enterprise clients.</p></li><li><p>Implemented advanced conflict resolution algorithms with 99.9% accuracy.</p></li><li><p>Scaled to handle 1M+ concurrent connections using Kubernetes.</p></li></ul>"
}

export const SKILL_ITEM: Omit<TBasicContent, "id"> = {
  isHidden: false,
  title: "Backend Technologies",
  description: "Node.js, Python, Go, PostgreSQL, Redis"
}

export const LANGUAGE_ITEM: Omit<TBasicContent, "id"> = {
  isHidden: false,
  title: "French",
  description: "Conversational"
}

export const CERTIFICATE_ITEM: Omit<TBasicContent, "id"> = {
  isHidden: false,
  title: "AWS Solutions Architect",
  description: "Professional certification in cloud architecture and deployment"
}

export const BASIC_SECTION_ITEM = {
  skills: SKILL_ITEM,
  summary: SUMMARY_ITEM,
  languages: LANGUAGE_ITEM,
  certificates: CERTIFICATE_ITEM
}

export const ADVANCED_SECTION_ITEM = {
  educations: EDUCATION_ITEM,
  experiences: EXPERIENCE_ITEM,
  projects: PROJECT_ITEM,
  awards: AWARD_ITEM,
  courses: COURSE_ITEM
}
