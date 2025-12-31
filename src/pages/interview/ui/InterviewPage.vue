<script setup lang="ts">
import { InterviewForm } from '@/features/interview/edit'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const interviewId = computed(() => route.params.id as string)
</script>

<template>
  <InterviewForm :interviewId="interviewId" />
</template>

<style scoped></style>
