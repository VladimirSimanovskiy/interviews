<script setup lang="ts">
import { AppButton } from '@/shared/ui'
import { useDeleteInterview } from '../model/useDeleteInterview'

const { deleteInterview, isLoading } = useDeleteInterview()

const { interviewId } = defineProps<{
  interviewId: string
}>()

const emit = defineEmits<{
  (e: 'deleted', interviewId: string): void
}>()

const handleDelete = async () => {
  if (!interviewId) return
  const removed = await deleteInterview(interviewId)
  if (removed) emit('deleted', interviewId)
}
</script>

<template>
  <AppButton icon="pi pi-trash" severity="danger" @click="handleDelete" :loading="isLoading" />
</template>
