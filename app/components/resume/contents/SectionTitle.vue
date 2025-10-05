<script setup lang="ts">
import Delete from "./Delete.vue"
import InlineEditor from "./InlineEditor.vue"
import Visibility from "./Visibility.vue"

interface Props {
  id: string
  sectionTitle: string
  isTitleEditable: boolean
  isSectionHideable: boolean
  isSectionVisible: boolean
  isTitleVisible: boolean
}

const props = defineProps<Props>()

const { updateContent, setContent, content } = useResumeStore()

const handleUpdate = (path: string, value: unknown) => {
  updateContent(path, value)
}

const handleDelete = () => {
  const { [props.id]: deleted, ...newContent } = content
  setContent(newContent)
}
</script>

<template>
  <div class="flex items-center justify-between gap-2 border-b border-muted pb-2 mb-3">
    <div class="flex items-center gap-2">
      <div v-if="props.isTitleEditable" class="flex items-center gap-2">
        <InlineEditor
          class="text-sm font-medium"
          :is-visible="props.isTitleVisible"
          :value="props.sectionTitle"
          :on-update="(value) => handleUpdate(`${props.id}.title`, value)"
        />
        <Visibility
          :is-visible="props.isTitleVisible"
          :on-toggle="() => updateContent(`${props.id}.isTitleVisible`, !props.isTitleVisible)"
        />
      </div>
      <span v-else class="text-sm font-medium">{{ props.sectionTitle }}</span>
    </div>
    <div v-if="props.isSectionHideable" class="flex items-center gap-2">
      <Visibility
        :is-visible="props.isSectionVisible"
        :on-toggle="() => updateContent(`${props.id}.isSectionVisible`, !props.isSectionVisible)"
      />
      <Delete :on-delete="() => handleDelete()" />
    </div>
  </div>
</template>
