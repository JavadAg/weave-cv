<script setup lang="ts">
interface Emits {
  (e: 'insert-template', value: string): void
}

const emit = defineEmits<Emits>()

// Template snippets for quick insertion
const templates = [
  {
    name: 'Header Section',
    icon: 'i-heroicons-user',
    template: `# {{name}}
## {{title}}
{{email}} | {{phone}} | {{location}}`
  },
  {
    name: 'Experience',
    icon: 'i-heroicons-briefcase',
    template: `## Experience

### {{job_title}} - {{company}}
**{{start_date}} - {{end_date}}**
- {{achievement_1}}
- {{achievement_2}}
- {{achievement_3}}`
  },
  {
    name: 'Education',
    icon: 'i-heroicons-academic-cap',
    template: `## Education

### {{degree}} in {{field}}
**{{university}}** - {{graduation_year}}
- GPA: {{gpa}}
- Relevant Coursework: {{coursework}}`
  },
  {
    name: 'Skills',
    icon: 'i-heroicons-cog-6-tooth',
    template: `## Skills

**Technical Skills:** {{technical_skills}}
**Languages:** {{languages}}
**Tools:** {{tools}}`
  },
  {
    name: 'Projects',
    icon: 'i-heroicons-code-bracket',
    template: `## Projects

### {{project_name}}
{{project_description}}
- **Technologies:** {{technologies}}
- **Link:** {{project_link}}`
  }
]

function insertTemplate(template: string) {
  emit('insert-template', template)
}
</script>

<template>
  <div class="space-y-3">
    <h4
      class="text-sm font-semibold text-ui-foreground flex items-center gap-2">
      <UIcon name="i-heroicons-document-duplicate" class="w-4 h-4" />
      Quick Templates
    </h4>
    <div class="space-y-2">
      <UButton
        v-for="template in templates"
        :key="template.name"
        variant="ghost"
        size="sm"
        class="w-full justify-start text-left"
        @click="insertTemplate(template.template)">
        <UIcon :name="template.icon" class="w-4 h-4 mr-2" />
        {{ template.name }}
      </UButton>
    </div>
  </div>
</template>
