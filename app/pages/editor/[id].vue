<script setup lang="ts">
const { id } = useRoute().params
</script>

<template>
  <div>
    <h1>Editor</h1>
    <p>{{ id }}</p>
  </div>
</template>
