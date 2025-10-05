<script setup lang="ts">
import type { SectionByType } from "~/types/resume.types"

interface Props {
  id: string
  education: SectionByType<"education">["data"][number]
}

const props = defineProps<Props>()

const { updateContent } = useResumeStore()

const handleAddBullet = () => {
  const newBullets = [...props.education.bullets, "New bullet point"]
  updateContent(`${props.id}.data.${props.education.id}.bullets`, newBullets)
}

const handleUpdateBullet = (index: number, value: string) => {
  const updatedBullets = [...props.education.bullets]
  updatedBullets[index] = value
  updateContent(`${props.id}.data.${props.education.id}.bullets`, updatedBullets)
}

const handleDeleteBullet = (index: number) => {
  const updatedBullets = props.education.bullets.filter((_, i) => i !== index)
  updateContent(`${props.id}.data.${props.education.id}.bullets`, updatedBullets)
}
</script>

<template>
  <div class="space-y-3">
    <div class="flex items-center justify-between">
      <span class="text-sm font-medium">Education Details</span>
      <UButton size="sm" @click="handleAddBullet">+ Add Detail</UButton>
    </div>

    <div class="space-y-2">
      <div
        v-for="(bullet, index) in education.bullets"
        :key="index"
        class="flex items-center gap-2 p-2 bg-accented/20 rounded-md"
      >
        <UInput
          :model-value="bullet"
          placeholder="Education detail"
          class="flex-1"
          @update:model-value="(value) => handleUpdateBullet(index, value)"
        />

        <UButton variant="subtle" size="sm" leading-icon="i-lucide-trash" @click="handleDeleteBullet(index)" />
      </div>
    </div>
  </div>
</template>
