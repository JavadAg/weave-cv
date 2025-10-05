<script setup lang="ts">
interface Emits {
  (e: "update:css", value: string): void
}

const emit = defineEmits<Emits>()

// CSS templates
const cssTemplates = [
  {
    name: "Modern Clean",
    icon: "i-heroicons-paint-brush",
    css: `:host {
  padding: 24px;
  font-family: 'Inter', sans-serif;
  line-height: 1.6;
  color: #1f2937;
}

.resume-root h1 {
  font-size: 28px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 8px;
}

.resume-root h2 {
  font-size: 20px;
  font-weight: 600;
  color: #374151;
  margin-top: 24px;
  margin-bottom: 12px;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 4px;
}

.resume-root h3 {
  font-size: 16px;
  font-weight: 600;
  color: #4b5563;
  margin-top: 16px;
  margin-bottom: 8px;
}

.resume-root ul {
  margin: 8px 0;
  padding-left: 20px;
}

.resume-root li {
  margin: 4px 0;
}`
  },
  {
    name: "Professional",
    icon: "i-heroicons-building-office",
    css: `:host {
  padding: 32px;
  font-family: 'Georgia', serif;
  line-height: 1.7;
  color: #2d3748;
  max-width: 800px;
  margin: 0 auto;
}

.resume-root h1 {
  font-size: 32px;
  font-weight: 400;
  color: #1a202c;
  text-align: center;
  margin-bottom: 16px;
  letter-spacing: 1px;
}

.resume-root h2 {
  font-size: 18px;
  font-weight: 600;
  color: #2d3748;
  margin-top: 32px;
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-bottom: 1px solid #cbd5e0;
  padding-bottom: 8px;
}

.resume-root h3 {
  font-size: 16px;
  font-weight: 600;
  color: #4a5568;
  margin-top: 20px;
  margin-bottom: 8px;
}

.resume-root ul {
  margin: 12px 0;
  padding-left: 24px;
}

.resume-root li {
  margin: 6px 0;
}`
  },
  {
    name: "Minimal",
    icon: "i-heroicons-minus",
    css: `:host {
  padding: 20px;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.5;
  color: #333;
}

.resume-root h1 {
  font-size: 24px;
  font-weight: 300;
  color: #000;
  margin-bottom: 4px;
}

.resume-root h2 {
  font-size: 16px;
  font-weight: 500;
  color: #666;
  margin-top: 20px;
  margin-bottom: 8px;
  text-transform: lowercase;
}

.resume-root h3 {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-top: 12px;
  margin-bottom: 4px;
}

.resume-root ul {
  margin: 6px 0;
  padding-left: 16px;
}

.resume-root li {
  margin: 2px 0;
  font-size: 14px;
}`
  }
]

function applyCssTemplate(css: string) {
  emit("update:css", css)
}
</script>

<template>
  <div class="space-y-3">
    <h4 class="text-sm font-semibold text-ui-foreground flex items-center gap-2">
      <UIcon name="i-heroicons-paint-brush" class="w-4 h-4" />
      CSS Styles
    </h4>
    <div class="space-y-2">
      <UButton
        v-for="template in cssTemplates"
        :key="template.name"
        variant="ghost"
        size="sm"
        class="w-full justify-start text-left"
        @click="applyCssTemplate(template.css)"
      >
        <UIcon :name="template.icon" class="w-4 h-4 mr-2" />
        {{ template.name }}
      </UButton>
    </div>
  </div>
</template>
