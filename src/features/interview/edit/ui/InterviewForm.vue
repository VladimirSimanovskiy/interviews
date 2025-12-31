<script setup lang="ts">
import type { IInterview, IInterviewData } from '@/entities/interview'
import { AppDatePicker } from '@/shared/ui'
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/entities/user'
import { InterviewApi } from '@/entities/interview'

const interview = ref<IInterview | null>(null)
const isLoading = ref(true)
const userStore = useUserStore()

const { interviewId } = defineProps<{
  interviewId: string
}>()

const loadInterview = async () => {
  if (!userStore.userId) return
  isLoading.value = true
  try {
    interview.value = await InterviewApi.getById(userStore.userId, interviewId)
  } finally {
    isLoading.value = false
  }
}

const saveInterview = async () => {
  await InterviewApi.update(userStore.userId, interviewId, interview.value as IInterviewData)
  loadInterview()
}

const addStage = () => {
  if (!interview.value?.stages) {
    interview.value!.stages = []
  }
  interview.value!.stages.push({
    name: '',
    date: null,
    description: '',
  })
}

const removeStage = (index: number) => {
  if (!interview.value?.stages) return
  interview.value!.stages.splice(index, 1)
}

onMounted(loadInterview)
</script>

<template>
  <div class="content-interview" v-if="interview?.id && !isLoading">
    <AppCard>
      <template #title>Собеседование в компанию {{ interview.company }}</template>
      <template #content>
        <div class="flex flex-column gap-2">
          <label for="company">Компания</label>
          <AppInputText class="input mb-3" id="company" v-model="interview.company" />
        </div>
        <div class="flex flex-column gap-2">
          <label for="vacancyLink">Описание вакансии (ссылка)</label>
          <AppInputText class="input mb-3" id="vacancyLink" v-model="interview.vacancyLink" />
        </div>
        <div class="flex flex-column gap-2">
          <label for="hrName">Контакт (имя)</label>
          <AppInputText class="input mb-3" id="hrName" v-model="interview.hrName" />
        </div>
        <div class="flex flex-column gap-2">
          <label for="contactTelegram">Telegram username HR</label>
          <AppInputText
            class="input mb-3"
            id="contactTelegram"
            v-model="interview.contactTelegram"
          />
        </div>
        <div class="flex flex-column gap-2">
          <label for="contactWhatsApp">WhatsApp HR</label>
          <AppInputText
            class="input mb-3"
            id="contactWhatsApp"
            v-model="interview.contactWhatsApp"
          />
        </div>
        <div class="flex flex-column gap-2">
          <label for="contactPhone">Телефон HR</label>
          <AppInputText class="input mb-3" id="contactPhone" v-model="interview.contactPhone" />
        </div>
        <div class="flex flex-wrap gap-3 p-fluid mb-3">
          <div class="flex-auto">
            <AppInputNumber
              inputId="salaryFrom"
              placeholder="Зарплатная вилка от"
              v-model="interview.salaryFrom"
            />
          </div>
          <div class="flex-auto">
            <AppInputNumber
              inputId="salaryTo"
              placeholder="Зарплатная вилка до"
              v-model="interview.salaryTo"
            />
          </div>
        </div>

        <AppButton
          label="Добавить этап"
          severity="info"
          icon="pi pi-plus"
          class="mb-3"
          @click="addStage"
        />
        <template v-if="interview.stages">
          <div v-for="(stage, index) in interview.stages" :key="index" class="interview-stage">
            <div class="flex flex-column gap-2">
              <label :for="`stage-name-${index}`">Название этапа</label>
              <AppInputText class="input mb-3" :id="`stage-name-${index}`" v-model="stage.name" />
            </div>
            <div class="flex flex-column gap-2">
              <label :for="`stage-date-${index}`">Дата прохождения этапа</label>
              <AppDatePicker
                class="input mb-3"
                :id="`stage-date-${index}`"
                dateFormat="dd.mm.yy"
                v-model="stage.date"
              />
            </div>
            <div class="flex flex-column gap-2">
              <label :for="`stage-description-${index}`">Комментарий</label>
              <AppTextarea
                :id="`stage-description-${index}`"
                class="input mb-3"
                rows="5"
                v-model="stage.description"
              />
            </div>
            <AppButton severity="danger" label="Удалить этап" @click="removeStage(index)" />
          </div>
        </template>

        <div class="flex flex-wrap gap-3 mb-3">
          <div class="flex align-items-center">
            <AppRadio
              inputId="interviewResult1"
              name="result"
              value="Refusal"
              v-model="interview.result"
            />
            <label for="interviewResult1" class="ml-2">Отказ</label>
          </div>
          <div class="flex align-items-center">
            <AppRadio
              inputId="interviewResult2"
              name="result"
              value="Offer"
              v-model="interview.result"
            />
            <label for="interviewResult2" class="ml-2">Оффер</label>
          </div>
        </div>
        <AppButton label="Сохранить" icon="pi pi-save" @click="saveInterview" />
      </template>
    </AppCard>
  </div>
</template>

<style scoped>
.content-interview {
  max-width: 600px;
  margin: auto;
}
.input {
  width: 100%;
}
.interview-stage {
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 10px;
  margin-bottom: 10px;
}
</style>
