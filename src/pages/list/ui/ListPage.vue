<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { InterviewApi, type IInterview } from '@/entities/interview'
import { useUserStore } from '@/entities/user'
import { InterviewsTable } from '@/widgets'

const userStore = useUserStore()

const interviews = ref<IInterview[]>([])
const isLoading = ref<boolean>(false)

const loadInterviews = async () => {
  if (!userStore.userId) return

  isLoading.value = true
  try {
    interviews.value = await InterviewApi.getAll(userStore.userId, {
      orderBy: [{ field: 'createdAt', direction: 'desc' }],
    })
  } finally {
    isLoading.value = false
  }
}

onMounted(loadInterviews)
</script>

<template>
  <AppMessage v-if="!isLoading && !interviews.length" severity="info" icon="pi pi-info-circle">
    У вас пока нет собеседований
  </AppMessage>
  <InterviewsTable v-else :interviews="interviews" :loading="isLoading" @remove="loadInterviews" />
</template>
