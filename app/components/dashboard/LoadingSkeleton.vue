<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div v-for="i in 6" :key="i" class="animate-pulse">
      <div class="bg-accented rounded-lg p-6 h-48">
        <div class="h-4 bg-muted rounded w-3/4 mb-4"></div>
        <div class="h-3 bg-muted rounded w-1/2 mb-2"></div>
        <div class="h-3 bg-muted rounded w-2/3"></div>
      </div>
    </div>
  </div>
</template>
