<script setup lang="ts">
import { DEFAULT_PROJECT_ITEM } from "~/constants/default"
import type { TProjectData } from "~/utils/schemas/content.schema"
import ProjectsItem from "./ProjectsItem.vue"

interface Props {
  id: string
  projects: TProjectData[]
}

const props = defineProps<Props>()

const { updateContent } = useResumeStore()

const handleAddProject = () => {
  const newProject: TProjectData = { id: `project-${Date.now()}`, ...DEFAULT_PROJECT_ITEM }

  updateContent(`${props.id}.data`, [...props.projects, newProject])
}

const handleDeleteProject = (id: string) => {
  updateContent(
    `${props.id}.data`,
    props.projects.filter((project) => project.id !== id)
  )
}
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="flex flex-col gap-2">
      <ProjectsItem
        v-for="project in props.projects"
        :id="id"
        :key="project.id"
        :project="project"
        class="relative group"
        @delete="handleDeleteProject(project.id)"
      />
    </div>
    <UButton variant="subtle" class="w-full flex justify-center items-center" type="button" @click="handleAddProject">
      + Add Project
    </UButton>
  </div>
</template>
