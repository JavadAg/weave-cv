<script setup lang="ts">
import CreateResumeButton from "~/components/dashboard/CreateResumeButton.vue"
import EmptyState from "~/components/dashboard/EmptyState.vue"
import LoadingSkeleton from "~/components/dashboard/LoadingSkeleton.vue"
import ResumeGrid from "~/components/dashboard/ResumeGrid.vue"
import type { TResume } from "~/types/resume.types"

useHead({
  title: "My Resumes - Weave CV",
  meta: [
    {
      name: "description",
      content:
        "Manage and edit your resumes. Create new resumes, update existing ones, and organize your professional documents."
    },
    {
      property: "og:title",
      content: "My Resumes - Weave CV"
    },
    {
      property: "og:description",
      content:
        "Manage and edit your resumes. Create new resumes, update existing ones, and organize your professional documents."
    },
    {
      property: "og:url",
      content: "/dashboard"
    },
    {
      name: "robots",
      content: "noindex, nofollow"
    }
  ]
})

const { data, pending, error, refresh } = useFetch<TResume[]>("/api/resumes", {
  method: "GET",
  lazy: true
})

const handleRefresh = async () => {
  await refresh()
}

const handleResumeCreated = async () => {
  await refresh()
}
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold text-default">My Resumes</h1>
        <p class="text-muted mt-2">Manage and edit your resumes</p>
      </div>
      <CreateResumeButton @created="handleResumeCreated" />
    </div>
    <UAlert
      v-if="error"
      color="error"
      variant="soft"
      title="Something went wrong while fetching your resumes"
      description="Please try again later"
    />
    <LoadingSkeleton v-if="pending" />
    <EmptyState v-else-if="data?.length === 0" />
    <ResumeGrid v-else-if="data && data.length > 0" :resumes="data" @refresh="handleRefresh" />
  </div>
</template>
