<script setup lang="ts">
const supabase = useSupabaseClient()

const formState = reactive({
  email: '',
  password: '',
  confirmPassword: ''
})

const loading = ref(false)
const error = ref('')

const signUpWithPassword = async () => {
  if (!formState.email) {
    error.value = 'Please enter your email address'
    return
  }
  if (!formState.password) {
    error.value = 'Please enter your password'
    return
  }
  if (!formState.confirmPassword) {
    error.value = 'Please confirm your password'
    return
  }
  if (formState.password !== formState.confirmPassword) {
    error.value = 'Passwords do not match'
    return
  }

  loading.value = true
  error.value = ''

  try {
    const { error: signUpError } = await supabase.auth.signUp({
      email: formState.email,
      password: formState.password
    })

    if (signUpError) {
      error.value = signUpError.message
    } else {
      await navigateTo('/confirm')
    }
  } catch {
    error.value = 'An unexpected error occurred'
  } finally {
    loading.value = false
  }
}

const signUpWithGoogle = async () => {
  const { error: googleError } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/dashboard`
    }
  })

  if (googleError) {
    error.value = googleError.message
    console.error('Google sign-up error:', googleError.message)
  }
}
</script>

<template>
  <div class="flex items-center justify-center">
    <div class="relative w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-toned mb-2">Create Account</h1>
        <p class="text-muted">Sign up to get started with your account</p>
      </div>
      <UCard class="bg-default/70 shadow-2xl">
        <UForm
          :state="formState"
          class="space-y-3"
          @submit="signUpWithPassword"
        >
          <UAlert
            v-if="error"
            color="error"
            variant="soft"
            title="Error"
            :description="error"
          />

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
              placeholder="Create a password"
              size="lg"
              class="w-full"
              :disabled="loading"
            />
          </UFormField>

          <UFormField label="Confirm Password" name="confirmPassword" required>
            <UInput
              v-model="formState.confirmPassword"
              type="password"
              placeholder="Confirm your password"
              size="lg"
              class="w-full"
              :disabled="loading"
            />
          </UFormField>
          <UButton
            type="submit"
            color="primary"
            size="lg"
            block
            class="cursor-pointer"
            :loading="loading"
            :disabled="
              !formState.email ||
              !formState.password ||
              !formState.confirmPassword
            "
          >
            {{ loading ? 'Creating account...' : 'Create Account' }}
          </UButton>
          <div
            class="relative flex justify-center after:z-[-1] items-center after:content-[''] after:absolute after:top-1/2 after:inset-0 after:border-t after:border-muted"
          >
            <span
              class="px-2 relative flex justify-center text-sm bg-default text-muted"
              >Or continue with</span
            >
          </div>
          <UButton
            color="neutral"
            variant="outline"
            size="lg"
            block
            @click="signUpWithGoogle"
          >
            <span
              class="text-xs size-5 bg-gradient-to-r from-blue-500 to-red-500 rounded-sm flex items-center justify-center font-bold text-inverted"
              >G</span
            >
            Continue with Google
          </UButton>
        </UForm>
      </UCard>

      <p class="text-center mt-8 text-sm text-muted">
        Already have an account?
        <ULink class="font-medium text-primary" to="/login">
          Sign in here
        </ULink>
      </p>
    </div>
  </div>
</template>
