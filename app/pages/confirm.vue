<script setup lang="ts">
useHead({
  title: "Confirming Account - Weave CV",
  meta: [
    {
      name: "description",
      content: "Confirming your account. Please wait while we verify your email address."
    },
    {
      property: "og:title",
      content: "Confirming Account - Weave CV"
    },
    {
      property: "og:description",
      content: "Confirming your account. Please wait while we verify your email address."
    },
    {
      property: "og:url",
      content: "/confirm"
    },
    {
      name: "robots",
      content: "noindex, nofollow"
    }
  ]
})

const user = useSupabaseUser()

watch(
  user,
  () => {
    if (user.value) {
      return navigateTo("/dashboard")
    }
  },
  { immediate: true }
)
</script>

<template>
  <div>Waiting for login...</div>
</template>
