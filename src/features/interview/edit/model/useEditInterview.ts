import { ref } from 'vue'
import { InterviewApi, type IInterviewData } from '@/entities/interview'
import { useUserStore } from '@/entities/user'

export function useEditInterview() {
  const isLoading = ref(false)
  const userStore = useUserStore()

  const editInterview = async (interviewId: string, data: IInterviewData) => {
    if (!userStore.userId) {
      throw new Error('Не удалось редактировать собеседование: пользователь не авторизован')
    }
    isLoading.value = true
    try {
      await InterviewApi.update(userStore.userId, interviewId, data)
    } finally {
      isLoading.value = false
    }
  }

  return { editInterview, isLoading }
}
