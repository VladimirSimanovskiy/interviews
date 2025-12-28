<script setup lang="ts">
import type { IInterview } from '@/entities/interview'
import { RemoveInterviewButton } from '@/features/interview/remove'

defineProps<{
  interviews: IInterview[]
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'remove', interviewId: string): void
}>()
</script>

<template>
  <AppDataTable :value="interviews" :loading="loading">
    <AppColumn field="company" header="Компания"></AppColumn>
    <AppColumn field="hrName" header="Имя HR"></AppColumn>
    <AppColumn field="vacancyLink" header="Вакансия">
      <template #body="slotProps">
        <a :href="slotProps.data.vacancyLink" target="_blank">Ссылка на вакансию</a>
      </template>
    </AppColumn>
    <AppColumn header="Контакты">
      <template #body="slotProps">
        <div class="contacts">
          <a
            v-if="slotProps.data.contactTelegram"
            :href="`https://t.me/${slotProps.data.contactTelegram}`"
            target="_blank"
            class="contacts__telegram"
          >
            <span class="contacts__icon pi pi-telegram"></span>
          </a>
          <a
            v-if="slotProps.data.contactWhatsApp"
            :href="`https://wa.me/${slotProps.data.contactWhatsApp}`"
            target="_blank"
            class="contacts__whatsapp"
          >
            <span class="contacts__icon pi pi-whatsapp"></span>
          </a>
          <a
            v-if="slotProps.data.contactPhone"
            :href="`https://tel:${slotProps.data.contactPhone}`"
            target="_blank"
            class="contacts__phone"
          >
            <span class="contacts__icon pi pi-phone"></span>
          </a>
        </div>
      </template>
    </AppColumn>
    <AppColumn header="Пройденные этапы">
      <template #body="slotProps">
        <span v-if="!slotProps.data.stages">Не заполнено</span>
        <div v-else class="interview-stages">
          <AppBadge
            v-for="(stage, i) in slotProps.data.stages"
            :key="i"
            :value="i + 1"
            rounded
            v-tooltip.top="stage.name"
          />
        </div>
      </template>
    </AppColumn>
    <AppColumn header="Зарплатная вилка">
      <template #body="slotProps">
        <span v-if="!slotProps.data.salaryFrom">Не заполнено</span>
        <span v-else>{{ slotProps.data.salaryFrom }} - {{ slotProps.data.salaryTo }}</span>
      </template>
    </AppColumn>
    <AppColumn header="Результат">
      <template #body="slotProps">
        <span v-if="!slotProps.data.result">Не заполнено</span>
        <template v-else>
          <AppBadge
            :severity="slotProps.data.result === 'Offer' ? 'success' : 'danger'"
            :value="slotProps.data.result === 'Offer' ? 'Оффер' : 'Отказ'"
          />
        </template>
      </template>
    </AppColumn>
    <AppColumn>
      <template #body="slotProps">
        <div class="flex gap-2">
          <router-link :to="`/interview/${slotProps.data.id}`">
            <AppButton icon="pi pi-pencil" severity="info" />
          </router-link>
          <RemoveInterviewButton
            :interviewId="slotProps.data.id"
            @deleted="emit('remove', slotProps.data.id)"
          />
        </div>
      </template>
    </AppColumn>
  </AppDataTable>
</template>

<style scoped>
.contacts {
  display: flex;
  align-items: center;
  gap: 20px;
}
.contacts__telegram {
  color: #0088cc;
}
.contacts__whatsapp {
  color: #25d366;
}
.contacts__phone {
  color: #371777;
}
.contacts__icon {
  font-size: 20px;
}
.interview-stages {
  display: flex;
  gap: 5px;
}
</style>
