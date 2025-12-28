<script setup lang="ts">
import { computed, ref } from 'vue'
import { useToast } from 'primevue/usetoast'

import { useCreateInterview } from '../model/useCreateInterview'

const toast = useToast()
const { createInterview, isLoading } = useCreateInterview()

const company = ref<string>('')
const vacancyLink = ref<string>('')
const hrName = ref<string>('')
const contactTelegram = ref<string>('')
const contactWhatsApp = ref<string>('')
const contactPhone = ref<string>('')

const disabledSaveButton = computed(() => {
  return isLoading.value || !(company.value && vacancyLink.value && hrName.value)
})

const resetForm = () => {
  company.value = ''
  vacancyLink.value = ''
  hrName.value = ''
  contactTelegram.value = ''
  contactWhatsApp.value = ''
  contactPhone.value = ''
}

const submit = async () => {
  try {
    await createInterview({
      company: company.value,
      vacancyLink: vacancyLink.value,
      hrName: hrName.value,
      contactTelegram: contactTelegram.value,
      contactWhatsApp: contactWhatsApp.value,
      contactPhone: contactPhone.value,
    })

    toast.add({
      severity: 'success',
      summary: 'Готово',
      detail: 'Собеседование создано',
      life: 2500,
    })

    resetForm()
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Ошибка',
      detail: error instanceof Error ? error.message : 'Не удалось создать собеседование',
      life: 3500,
    })
  }
}
</script>

<template>
  <AppToast position="bottom-right" />

  <AppInputText class="input mb-3" placeholder="Компания" v-model="company" />
  <AppInputText v-model="vacancyLink" class="input mb-3" placeholder="Описание вакансии (ссылка)" />
  <AppInputText v-model="hrName" class="input mb-3" placeholder="Контакт (имя)" />
  <AppInputText v-model="contactTelegram" class="input mb-3" placeholder="Telegram username HR" />
  <AppInputText v-model="contactWhatsApp" class="input mb-3" placeholder="WhatsApp телефон HR" />
  <AppInputText v-model="contactPhone" class="input mb-3" placeholder="Телефон HR" />

  <AppButton
    @click="submit"
    label="Создать собеседование"
    :disabled="disabledSaveButton"
    :loading="isLoading"
  ></AppButton>
</template>

<style scoped>
.input {
  width: 100%;
}
</style>
