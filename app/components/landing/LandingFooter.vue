<template>
  <footer class="py-12 px-4 border-t border-default/30 bg-default/50">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        <div class="text-muted text-sm">© {{ new Date().getFullYear() }} Weave CV. All rights reserved.</div>
        <div class="flex gap-6 text-sm">
          <ULink to="/login" class="text-muted hover:text-primary transition-colors"> Sign In </ULink>
          <ULink to="/register" class="text-muted hover:text-primary transition-colors"> Sign Up </ULink>
        </div>
      </div>
    </div>
  </footer>
</template>
