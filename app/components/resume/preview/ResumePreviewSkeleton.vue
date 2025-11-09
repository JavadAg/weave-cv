<script setup lang="ts">
import { PAPER_SIZES } from "~/constants/papers"

const pageStyles = computed(() => {
  const paperSize = PAPER_SIZES.A4
  return {
    width: `${paperSize.w}mm`,
    minWidth: `${paperSize.w}mm`,
    height: `${paperSize.h}mm`,
    minHeight: `${paperSize.h}mm`
  }
})
</script>

<template>
  <div class="resumePage bg-default shadow-lg rounded-sm border border-muted" :style="pageStyles">
    <div class="p-8 space-y-6 animate-pulse">
      <div class="space-y-3 border-b border-accented pb-4">
        <div class="h-9 bg-accented rounded w-2/3"></div>
        <div class="h-4 bg-accented rounded w-1/2"></div>
        <div class="flex gap-4 mt-3">
          <div class="h-3.5 bg-accented rounded w-28"></div>
          <div class="h-3.5 bg-accented rounded w-28"></div>
          <div class="h-3.5 bg-accented rounded w-28"></div>
        </div>
      </div>

      <div class="space-y-3">
        <div class="h-6 bg-elevated rounded w-1/4 border-b-2 border-accented"></div>
        <div class="space-y-2 pl-2">
          <div class="h-4 bg-accented rounded w-full"></div>
          <div class="h-4 bg-accented rounded w-5/6"></div>
          <div class="h-4 bg-accented rounded w-4/6"></div>
        </div>
      </div>

      <div class="space-y-4">
        <div class="h-6 bg-elevated rounded w-1/3 border-b-2 border-accented"></div>
        <div class="space-y-4 pl-2">
          <div class="space-y-2">
            <div class="flex justify-between items-start">
              <div class="h-5 bg-accented rounded w-1/3"></div>
              <div class="h-3.5 bg-accented rounded w-24"></div>
            </div>
            <div class="h-3.5 bg-accented rounded w-1/4"></div>
            <div class="space-y-1.5">
              <div class="h-3 bg-accented rounded w-full"></div>
              <div class="h-3 bg-accented rounded w-5/6"></div>
              <div class="h-3 bg-accented rounded w-4/6"></div>
            </div>
          </div>
          <div class="space-y-2">
            <div class="flex justify-between items-start">
              <div class="h-5 bg-accented rounded w-1/3"></div>
              <div class="h-3.5 bg-accented rounded w-24"></div>
            </div>
            <div class="h-3.5 bg-accented rounded w-1/4"></div>
            <div class="space-y-1.5">
              <div class="h-3 bg-accented rounded w-full"></div>
              <div class="h-3 bg-accented rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-3">
        <div class="h-6 bg-elevated rounded w-1/4 border-b-2 border-accented"></div>
        <div class="space-y-2 pl-2">
          <div class="flex flex-wrap gap-3">
            <div class="h-7 bg-accented rounded-full w-20"></div>
            <div class="h-7 bg-accented rounded-full w-20"></div>
            <div class="h-7 bg-accented rounded-full w-20"></div>
            <div class="h-7 bg-accented rounded-full w-20"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
