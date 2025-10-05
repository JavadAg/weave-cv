<script setup lang="ts">
import { DEFAULT_LANGUAGE_ITEM } from "~/constants/default"
import type { TLanguageData } from "~/utils/schemas/content.schema"
import LanguagesItem from "./LanguagesItem.vue"

interface Props {
  id: string
  languages: TLanguageData[]
}

const props = defineProps<Props>()

const { updateContent } = useResumeStore()

const handleAddLanguage = () => {
  const newLanguage: TLanguageData = {
    id: `language-${Date.now()}`,
    ...DEFAULT_LANGUAGE_ITEM
  }

  updateContent(`${props.id}.data`, [...props.languages, newLanguage])
}

const handleDeleteLanguage = (id: string) => {
  updateContent(
    `${props.id}.data`,
    props.languages.filter((language) => language.id !== id)
  )
}
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="flex flex-col gap-2">
      <LanguagesItem
        v-for="language in props.languages"
        :id="id"
        :key="language.id"
        :language="language"
        class="relative group"
        @delete="handleDeleteLanguage(language.id)"
      />
    </div>
    <UButton variant="subtle" class="w-full flex justify-center items-center" type="button" @click="handleAddLanguage">
      + Add Language
    </UButton>
  </div>
</template>
