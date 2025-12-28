import { ref } from 'vue'
import { InterviewApi } from '@/entities/interview'
import { useUserStore } from '@/entities/user'
import { useAppConfirm } from '@/shared/lib/confirm'

export function useDeleteInterview() {
  const userStore = useUserStore()
  const isLoading = ref(false)
  const { confirmAsync } = useAppConfirm()

  const deleteInterview = async (interviewId: string): Promise<boolean> => {
    const confirmed = await confirmAsync({
      message: 'Вы хотите удалить собеседование?',
      header: 'Удаление собеседования',
      acceptLabel: 'Удалить',
      rejectLabel: 'Отмена',
      acceptClass: 'p-button-danger',
      rejectClass: 'p-button-secondary p-button-outlined',
    })

    if (!confirmed) return false

    if (!userStore.userId) {
      throw new Error('Не удалось удалить собеседование: пользователь не авторизован')
    }

    isLoading.value = true
    try {
      await InterviewApi.remove(userStore.userId, interviewId)
      return true
    } finally {
      isLoading.value = false
    }
  }

  return { deleteInterview, isLoading }
}
