<script setup lang="ts">
import { computed, ref, watch } from "vue"
import { VueDraggable, type SortableEvent } from "vue-draggable-plus"
import { useConfigsStore } from "~/stores/configs"
import { useResumeStore } from "~/stores/resume"

const { configs, updateOrder } = useConfigsStore()
const { content } = useResumeStore()

const isTwoColumnLayout = computed(() => {
  return configs.general.layout.columns === "2"
})

const allSections = computed(() => {
  return Object.values(content).filter((section) => section.isSectionVisible && section.id !== "personal")
})

const sections = computed(() => {
  const sectionOrder = configs.general.layout.order.oneCol || []

  if (sectionOrder.length === 0) {
    return allSections.value
  }

  return sectionOrder.map((id: string) => allSections.value.find((section) => section.id === id)).filter(Boolean)
})

const leftColumnSections = computed(() => {
  const leftSectionOrder = configs.general.layout.order.twoCol.left || []
  if (!isTwoColumnLayout.value) return []
  return leftSectionOrder.map((id: string) => allSections.value.find((section) => section.id === id)).filter(Boolean)
})

const rightColumnSections = computed(() => {
  const rightSectionOrder = configs.general.layout.order.twoCol.right || []
  if (!isTwoColumnLayout.value) return []
  return rightSectionOrder.map((id: string) => allSections.value.find((section) => section.id === id)).filter(Boolean)
})

type SectionType = NonNullable<ReturnType<typeof leftColumnSections.value.find>>
const leftColumnSectionsRef = ref<SectionType[]>([])
const rightColumnSectionsRef = ref<SectionType[]>([])
const singleColumnSectionsRef = ref<SectionType[]>([])

watch(
  leftColumnSections,
  (newSections) => {
    leftColumnSectionsRef.value = newSections.filter(Boolean) as SectionType[]
  },
  { immediate: true }
)

watch(
  rightColumnSections,
  (newSections) => {
    rightColumnSectionsRef.value = newSections.filter(Boolean) as SectionType[]
  },
  { immediate: true }
)

watch(
  sections,
  (newSections) => {
    singleColumnSectionsRef.value = newSections.filter(Boolean) as SectionType[]
  },
  { immediate: true }
)

const updateTwoColumnSections = (_event: SortableEvent) => {
  const rightOrder = rightColumnSectionsRef.value.map((section) => section.id)
  const leftOrder = leftColumnSectionsRef.value.map((section) => section.id)

  updateOrder("twoCol", { left: leftOrder, right: rightOrder })
}

const updateSingleColumnSections = (_event: SortableEvent) => {
  const singleOrder = singleColumnSectionsRef.value.map((section) => section.id)
  updateOrder("oneCol", singleOrder)
}
</script>

<template>
  <span class="text-sm font-medium">Sections Order</span>
  <div v-if="isTwoColumnLayout" class="gap-2 items-start justify-between grid grid-cols-2 mt-2">
    <VueDraggable
      ref="leftColumnRef"
      v-model="leftColumnSectionsRef"
      group="columns"
      :animation="150"
      class="flex flex-col justify-start items-start flex-1 gap-4 h-full bg-accented/30 rounded-lg p-2"
      @update="updateTwoColumnSections"
      @add="updateTwoColumnSections"
      @remove="updateTwoColumnSections"
    >
      <div
        v-for="section in leftColumnSectionsRef"
        :key="section?.id"
        class="flex items-center gap-2 w-full p-2 rounded-lg cursor-move bg-muted"
      >
        <UIcon name="i-lucide-grip-vertical" class="text-muted-foreground" />
        <span class="text-sm font-medium">{{ section?.title }}</span>
      </div>
    </VueDraggable>
    <VueDraggable
      ref="rightColumnRef"
      v-model="rightColumnSectionsRef"
      group="columns"
      :animation="150"
      class="flex flex-col justify-start items-start flex-1 h-full gap-4 bg-accented/30 rounded-lg p-2"
      @update="updateTwoColumnSections"
      @add="updateTwoColumnSections"
      @remove="updateTwoColumnSections"
    >
      <div
        v-for="section in rightColumnSectionsRef"
        :key="section?.id"
        class="flex items-center gap-2 w-full p-2 rounded-lg cursor-move bg-muted"
      >
        <UIcon name="i-lucide-grip-vertical" class="text-muted-foreground" />
        <span class="text-sm font-medium">{{ section?.title }}</span>
      </div>
    </VueDraggable>
  </div>
  <VueDraggable
    v-else
    ref="singleColumnRef"
    v-model="singleColumnSectionsRef"
    :animation="150"
    class="flex flex-col justify-start items-start flex-1 h-full gap-4 bg-accented/30 rounded-lg p-2"
    @update="updateSingleColumnSections"
  >
    <div
      v-for="section in singleColumnSectionsRef"
      :key="section?.id"
      class="flex items-center gap-2 w-full p-2 rounded-lg cursor-move bg-muted"
    >
      <UIcon name="i-lucide-grip-vertical" class="text-muted-foreground" />
      <span class="text-sm font-medium">{{ section?.title }}</span>
    </div>
  </VueDraggable>
</template>
