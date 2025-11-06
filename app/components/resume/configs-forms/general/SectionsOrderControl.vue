<script setup lang="ts">
import { computed, ref, watch } from "vue"
import { VueDraggable, type SortableEvent } from "vue-draggable-plus"
import { useConfigsStore } from "~/stores/configs.store"
import { useResumeStore } from "~/stores/resume.store"
import ConfigWrapper from "../wrapper/ConfigWrapper.vue"

const { configs, updateOrder } = useConfigsStore()
const { core } = useResumeStore()

const isTwoColumnLayout = computed(() => {
  return configs.general.layout.columns === "2"
})

const sections = computed(() => {
  const sectionOrder = configs.general.layout.order.oneCol || []

  if (sectionOrder.length === 0) {
    return Object.entries(core).filter(([_, section]) => section.isSectionVisible)
  }

  return sectionOrder
    .map((sectionType: string) => {
      // Find the section with this type that is visible
      const sectionEntry = Object.entries(core).find(
        ([_, section]) => section.type === sectionType && section.isSectionVisible
      )
      return sectionEntry || null
    })
    .filter(Boolean) as [string, (typeof core)[string]][]
})

const leftColumnSections = computed(() => {
  const leftSectionOrder = configs.general.layout.order.twoCol.left || []
  if (!isTwoColumnLayout.value) return []

  return leftSectionOrder
    .map((sectionType: string) => {
      const sectionEntry = Object.entries(core).find(
        ([_, section]) => section.type === sectionType && section.isSectionVisible
      )
      return sectionEntry || null
    })
    .filter(Boolean) as [string, (typeof core)[string]][]
})

const rightColumnSections = computed(() => {
  const rightSectionOrder = configs.general.layout.order.twoCol.right || []
  if (!isTwoColumnLayout.value) return []

  return rightSectionOrder
    .map((sectionType: string) => {
      // Find the section with this type that is visible
      const sectionEntry = Object.entries(core).find(
        ([_, section]) => section.type === sectionType && section.isSectionVisible
      )
      return sectionEntry || null
    })
    .filter(Boolean) as [string, (typeof core)[string]][]
})

type SectionEntry = [string, (typeof core)[string]]
const leftColumnSectionsRef = ref<SectionEntry[]>([])
const rightColumnSectionsRef = ref<SectionEntry[]>([])
const singleColumnSectionsRef = ref<SectionEntry[]>([])

watch(
  leftColumnSections,
  (newSections) => {
    leftColumnSectionsRef.value = newSections.filter(Boolean) as SectionEntry[]
  },
  { immediate: true }
)

watch(
  rightColumnSections,
  (newSections) => {
    rightColumnSectionsRef.value = newSections.filter(Boolean) as SectionEntry[]
  },
  { immediate: true }
)

watch(
  sections,
  (newSections) => {
    singleColumnSectionsRef.value = newSections.filter(Boolean) as SectionEntry[]
  },
  { immediate: true }
)

const updateTwoColumnSections = (_event: SortableEvent) => {
  const rightOrder = rightColumnSectionsRef.value.map(([_, section]) => section.type)
  const leftOrder = leftColumnSectionsRef.value.map(([_, section]) => section.type)

  updateOrder("twoCol", { left: leftOrder, right: rightOrder })
}

const updateSingleColumnSections = (_event: SortableEvent) => {
  const singleOrder = singleColumnSectionsRef.value.map(([_, section]) => section.type)
  updateOrder("oneCol", singleOrder)
}
</script>

<template>
  <ConfigWrapper title="Sections Order">
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
          v-for="[key, section] in leftColumnSectionsRef"
          :key="key"
          class="flex items-center gap-2 w-full p-2 rounded-lg cursor-move bg-muted"
        >
          <UIcon name="i-lucide-grip-vertical" class="text-muted-foreground" />
          <span class="text-sm font-medium">{{ section.title }}</span>
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
          v-for="[key, section] in rightColumnSectionsRef"
          :key="key"
          class="flex items-center gap-2 w-full p-2 rounded-lg cursor-move bg-muted"
        >
          <UIcon name="i-lucide-grip-vertical" class="text-muted-foreground" />
          <span class="text-sm font-medium">{{ section.title }}</span>
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
        v-for="[key, section] in singleColumnSectionsRef"
        :key="key"
        class="flex items-center gap-2 w-full p-2 rounded-lg cursor-move bg-muted"
      >
        <UIcon name="i-lucide-grip-vertical" class="text-muted-foreground" />
        <span class="text-sm font-medium">{{ section.title }}</span>
      </div>
    </VueDraggable>
  </ConfigWrapper>
</template>
