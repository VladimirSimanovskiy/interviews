<script setup lang="ts">
import AppHeader from '@/shared/ui/AppHeader.vue'
</script>

<template>
  <div class="container">
    <AppHeader />
    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1280px;
  margin: auto;
  padding: 20px;
}
</style>
