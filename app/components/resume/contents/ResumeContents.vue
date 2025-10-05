<script setup lang="ts">
import type { TContent } from "~/types/resume.types"
import EducationSection from "./sections/education/EducationSection.vue"
import ExperienceSection from "./sections/experience/ExperienceSection.vue"
import LanguagesSection from "./sections/languages/LanguagesSection.vue"
import PersonalSection from "./sections/personal/PersonalSection.vue"
import ProjectsSection from "./sections/projects/ProjectsSection.vue"
import SkillsSection from "./sections/skills/SkillsSection.vue"
import SummarySection from "./sections/summary/SummarySection.vue"

const resumeStore = useResumeStore()
const { content } = storeToRefs(resumeStore)

const renderSection = (section: TContent[string]) => {
  switch (section.type) {
    case "personal": {
      return h(PersonalSection, { section })
    }
    case "summary": {
      return h(SummarySection, { section })
    }
    case "experience": {
      return h(ExperienceSection, { section })
    }
    case "education": {
      return h(EducationSection, { section })
    }
    case "projects": {
      return h(ProjectsSection, { section })
    }
    case "skills": {
      return h(SkillsSection, { section })
    }
    case "languages": {
      return h(LanguagesSection, { section })
    }
  }
}
</script>

<template>
  <div
    v-if="Object.keys(content).length > 0"
    class="flex flex-col gap-3 h-full hide-scrollbar bg-default overflow-y-auto rounded-xl border border-default/30 p-4"
  >
    <component :is="() => renderSection(section)" v-for="[key, section] in Object.entries(content)" :key="key" />
  </div>
</template>
