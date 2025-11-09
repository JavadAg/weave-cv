<template>
  <div
    class="flex flex-col gap-3 h-full hide-scrollbar bg-default overflow-y-auto rounded-xl border border-default/30 p-4"
  >
    <div v-for="i in 6" :key="i" class="animate-pulse" :style="{ animationDelay: `${i * 100}ms` }">
      <div class="bg-muted p-2 rounded-lg border border-muted/50 space-y-4">
        <div class="h-6 bg-accented rounded" :class="i === 1 ? 'w-40' : i === 2 ? 'w-44' : i === 3 ? 'w-36' : 'w-48'" />
      </div>
    </div>
  </div>
</template>
