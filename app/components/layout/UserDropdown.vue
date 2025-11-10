<script setup lang="ts">
const user = useSupabaseUser()
const supabase = useSupabaseClient()
const router = useRouter()
const route = useRoute()
const toast = useToast()

const userEmail = computed(() => user.value?.email || "")
const userInitials = computed(() => {
  if (!userEmail.value) return "U"
  const emailPart = userEmail.value.split("@")[0]
  if (!emailPart) return "U"
  return emailPart
    .split(/[.\-_]/)
    .map((p) => p[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
})

const userAvatar = computed(() => user.value?.user_metadata?.avatar_url || null)

const isDashboard = computed(() => route.path === "/dashboard")

const handleLogout = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error

    toast.add({
      title: "Logged out",
      description: "You have been successfully logged out",
      color: "success"
    })

    await router.push("/")
  } catch (error) {
    console.error("Logout error:", error)
    toast.add({
      title: "Error",
      description: "Failed to log out. Please try again.",
      color: "error"
    })
  }
}

const menuItems = computed(() => {
  const items: MenuItem[] = []

  if (!isDashboard.value) {
    items.push({
      label: "Dashboard",
      icon: "i-lucide-layout-dashboard",
      onSelect: () => router.push("/dashboard")
    })
  }

  items.push({
    label: "Logout",
    icon: "i-lucide-log-out",
    onSelect: handleLogout
  })

  return [items]
})
</script>

<template>
  <UDropdownMenu v-if="user" :items="menuItems" :popper="{ placement: 'bottom-end' }">
    <UButton color="neutral" variant="ghost" size="sm" class="gap-2">
      <UAvatar v-if="userAvatar" :src="userAvatar" :alt="userEmail" size="xs" class="ring-2 ring-default/20" />
      <UAvatar v-else :alt="userEmail" size="xs" class="ring-2 ring-default/20 bg-primary text-primary-foreground">
        {{ userInitials }}
      </UAvatar>
      <span class="hidden sm:inline text-sm font-medium text-default">{{ userEmail }}</span>
      <UIcon name="i-lucide-chevron-down" class="w-4 h-4 text-muted" />
    </UButton>
  </UDropdownMenu>
</template>
