<script setup lang="ts">
import { InterviewApi, type IInterview } from '@/entities/interview'
import { AppChart } from '@/shared/ui'
import { useUserStore } from '@/entities/user'
import { getChartTextColor, getStatisticChartPalette } from '@/shared/config/theme/chartPalette'
import { ref, onMounted } from 'vue'

const userId = useUserStore().userId
const chartData = ref()
const chartOptions = ref()
const interviews = ref<IInterview[]>([])

const setChartData = () => {
  const data: [number, number, number] = [0, 0, 0]

  interviews.value.forEach((interview) => {
    if (interview.result === 'Offer') {
      data[0]++
    } else if (interview.result === 'Refusal') {
      data[1]++
    } else {
      data[2]++
    }
  })

  const { backgroundColor, hoverBackgroundColor } = getStatisticChartPalette()

  return {
    labels: ['Оффер', 'Отказ', 'В ожидании'],
    datasets: [
      {
        data,
        backgroundColor,
        hoverBackgroundColor,
      },
    ],
  }
}

const setChartOptions = () => {
  const textColor = getChartTextColor()

  return {
    plugins: {
      legend: {
        labels: {
          cutout: '60%',
          color: textColor,
        },
      },
    },
  }
}

onMounted(async () => {
  interviews.value = await InterviewApi.getAll(userId, {
    orderBy: [{ field: 'createdAt', direction: 'desc' }],
  })
  chartData.value = setChartData()
  chartOptions.value = setChartOptions()
})
</script>

<template>
  <AppChart
    v-if="chartData"
    type="doughnut"
    :data="chartData"
    :options="chartOptions"
    class="w-full md:w-30rem"
  />
</template>
