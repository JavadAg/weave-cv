<script setup lang="ts">
import EmptyState from "~/components/dashboard/EmptyState.vue"
import LoadingSkeleton from "~/components/dashboard/LoadingSkeleton.vue"
import ResumeGrid from "~/components/dashboard/ResumeGrid.vue"

const { data, error, pending } = useFetch("/api/resumes", {
  method: "GET",
  lazy: true
})

const handleEdit = (id: string) => {
  navigateTo(`/editor/${id}`)
}
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold text-default">My Resumes</h1>
        <p class="text-muted mt-2">Manage and edit your resumes</p>
      </div>
      <UButton color="primary" size="lg" icon="i-lucide-plus" @click="() => {}"> Create New Resume </UButton>
    </div>

    <UAlert v-if="error" color="error" variant="soft" :title="error.message" @close="clearError" />
    <LoadingSkeleton v-if="pending" />
    <EmptyState v-else-if="data?.length === 0" @create="() => {}" />
    <ResumeGrid v-else :resumes="data || []" @edit="handleEdit" @delete="() => {}" />
  </div>
</template>
