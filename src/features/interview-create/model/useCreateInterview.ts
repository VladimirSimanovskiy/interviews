import { ref } from 'vue'
import { InterviewApi, type IInterviewData } from '@/entities/interview'
import { useUserStore } from '@/entities/user'

export function useCreateInterview() {
  const userStore = useUserStore()
  const isLoading = ref(false)

  const createInterview = async (data: IInterviewData) => {
    if (!userStore.userId) {
      throw new Error('Не удалось создать собеседование: пользователь не авторизован')
    }

    isLoading.value = true
    try {
      await InterviewApi.create(userStore.userId, data)
    } finally {
      isLoading.value = false
    }
  }

  return { createInterview, isLoading }
}
