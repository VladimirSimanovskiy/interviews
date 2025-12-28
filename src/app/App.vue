<script setup lang="ts">
import { AppHeader } from '@/widgets'
import { onMounted } from 'vue'
import { startUserSession, useUserStore } from '@/entities/user'

const userStore = useUserStore()

onMounted(() => {
  startUserSession()
})
</script>

<template>
  <AppProgressSpinner v-if="!userStore.isSessionReady" />
  <div class="container" v-else>
    <AppConfirmDialog />
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
