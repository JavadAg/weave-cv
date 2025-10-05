<script setup lang="ts">
import DetailItem from "./DetailItem.vue"

const { content } = useResumeStore()

const details = computed(() => (content.personal?.type === "personal" ? content.personal.data?.details : []) || [])
</script>

<template>
  <div class="space-y-2">
    <DetailItem v-for="(detail, index) in details" :key="index" :detail="detail" :index="index" />
  </div>
</template>
