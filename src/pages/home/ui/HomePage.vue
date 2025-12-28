<script setup lang="ts">
import { CreateInterviewForm } from '@/features/interview-create'
</script>

<template>
  <div class="content-interview">
    <AppCard>
      <template #title>Новое собеседование</template>
      <template #content>
        <CreateInterviewForm />
      </template>
    </AppCard>
  </div>
</template>

<style scoped>
.content-interview {
  max-width: 600px;
  margin: auto;
}
</style>
