<script setup lang="ts">
import type { TPersonalContent } from "~/utils/schemas/content.schema"
import SectionFormWrapper from "../SectionFormWrapper.vue"
import AddDetailForm from "./AddDetailForm.vue"
import DetailList from "./DetailList.vue"
import PersonalTitle from "./PersonalTitle.vue"

interface Props {
  section: TPersonalContent
}
const props = defineProps<Props>()
</script>
<template>
  <SectionFormWrapper
    :section-id="'personal'"
    :title="'Personal Information'"
    :is-title-editable="false"
    :is-section-hideable="false"
  >
    <PersonalTitle :title="props.section.title" :subtitle="props.section.subtitle" />
    <div class="space-y-1 mt-4">
      <AddDetailForm />
      <DetailList />
    </div>
  </SectionFormWrapper>
</template>
