<script setup lang="ts">
import GoogleSignIn from "~/components/auth/GoogleSignIn.vue"

useHead({
  title: "Sign In - Weave CV",
  meta: [
    {
      name: "description",
      content: "Sign in to your Weave CV account to access and manage your resumes."
    },
    {
      property: "og:title",
      content: "Sign In - Weave CV"
    },
    {
      property: "og:description",
      content: "Sign in to your Weave CV account to access and manage your resumes."
    },
    {
      property: "og:url",
      content: "/login"
    },
    {
      name: "robots",
      content: "noindex, nofollow"
    }
  ]
})

const supabase = useSupabaseClient()

const formState = reactive({
  email: "",
  password: ""
})

const loading = ref(false)
const error = ref("")

const signInWithPassword = async () => {
  if (!formState.email) {
    error.value = "Please enter your email address"
    return
  }
  if (!formState.password) {
    error.value = "Please enter your password"
    return
  }

  loading.value = true
  error.value = ""

  try {
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: formState.email,
      password: formState.password
    })

    if (signInError) {
      error.value = signInError.message
    } else {
      await navigateTo("/confirm")
    }
  } catch {
    error.value = "An unexpected error occurred"
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex items-center justify-center">
    <div class="relative w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-toned mb-2">Welcome Back</h1>
        <p class="text-muted">Sign in to your account to continue</p>
      </div>
      <UCard class="bg-default/70 shadow-2xl">
        <UForm :state="formState" class="space-y-3" @submit="signInWithPassword">
          <UAlert v-if="error" color="error" variant="soft" title="Error" :description="error" />

          <UFormField label="Email Address" name="email" required>
            <UInput
              v-model="formState.email"
              type="email"
              placeholder="Enter your email address"
              size="lg"
              class="w-full"
              :disabled="loading"
            />
          </UFormField>

          <UFormField label="Password" name="password" required>
            <UInput
              v-model="formState.password"
              type="password"
              placeholder="Enter your password"
              size="lg"
              class="w-full"
              :disabled="loading"
            />
          </UFormField>
          <UButton
            type="submit"
            color="primary"
            size="lg"
            cursor="pointer"
            block
            :loading="loading"
            :disabled="!formState.email || !formState.password"
          >
            {{ loading ? "Signing in..." : "Sign In" }}
          </UButton>
          <div
            class="relative flex justify-center after:z-[-1] items-center after:content-[''] after:absolute after:top-1/2 after:inset-0 after:border-t after:border-muted"
          >
            <span class="px-2 relative flex justify-center text-sm bg-default text-muted">Or continue with</span>
          </div>
          <GoogleSignIn />
        </UForm>
      </UCard>

      <p class="text-center mt-8 text-sm text-muted">
        Don't have an account?
        <ULink class="font-medium text-primary" to="/register"> Sign up for free </ULink>
      </p>
    </div>
  </div>
</template>
