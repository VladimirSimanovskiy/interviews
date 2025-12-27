<script setup lang="ts">
import { AppHeader } from '@/widgets'
import { onMounted, ref } from 'vue'
import { onAuthStateChanged } from 'firebase/auth'
import { useUserStore } from '@/entities/user'
import { auth } from '@/shared/api/firebase'

const userStore = useUserStore()
const isLoading = ref<boolean>(true)

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      userStore.userId = user.uid
    } else {
      userStore.userId = ''
    }
    isLoading.value = false
  })
})
</script>

<template>
  <AppProgressSpinner v-if="isLoading" />
  <div class="container" v-else>
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
