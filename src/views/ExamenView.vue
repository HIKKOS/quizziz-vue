<script setup>
import RulesDialog from '@/components/RulesDialog.vue'
import Card from 'primevue/card'
import ProgressBar from '@/components/ProgressBar.vue'
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import Skeleton from 'primevue/skeleton'
onMounted(() => {
  getData()
})
let questions = ref(null)
const data = ref(null)
const getData = async () => {
  const port = '7169'
  const server = `localhost:${port}`
  const url = `https://${server}/api/Quizz/questions`
  const response = await axios.get(url)
  console.log(response)
  data.value = response.data.resultado
  questions.value = data.value
  console.log({
    actualQuestion: actualQuestion.value,
    questionsL: questions.value.length,
    questions: questions.value
  })
}
const answerStatusEnum = {
  CORRECT: 'correct',
  INCORRECT: 'incorrect',
  UNANSWERED: 'unanswered'
}
const actualQuestion = ref(0)

const correctAnswers = ref(0)
const totalTime = 15
const timeLeft = ref(totalTime)
const progress = ref(100)
const testFinished = computed(() => !(actualQuestion.value < questions.value.length))
const correctPercentage = computed(() => {
  const value = (correctAnswers.value / questions.value.length) * 100
  return value.toFixed(0)
})
const answerStatus = ref(answerStatusEnum.UNANSWERED)

let interval
const start = () => {
  const cb = () => {
    if (timeLeft.value > 0) {
      timeLeft.value -= 1
      progress.value = (timeLeft.value / totalTime) * 100
    } else {
      nextQuestion()
    }
  }
  interval = setInterval(cb, 1000)
}

const nextQuestion = () => {
  actualQuestion.value++
  console.log({
    actualQuestion: actualQuestion.value,
    questions: questions.value.length
  })
  if (!(actualQuestion.value < questions.value.length)) {
    clearInterval(interval)
    return
  }

  restartCounter()
}
const restartCounter = () => {
  timeLeft.value = totalTime
  progress.value = 100
  clearInterval(interval)
  start()
}
const restarTest = () => {
  actualQuestion.value = 0
  correctAnswers.value = 0
  restartCounter()
}
const colorCorrectButton = (button) => {
  button.classList.add('bg-emerald-500')
  const i = document.createElement('i')
  i.classList.add('pi')
  i.classList.add('pi-check')
  button.appendChild(i)
}
const checkAnswer = (answerIndex) => {
  const buttons = document.querySelectorAll('.answer')
  const correctAnswerIndex = questions.value[actualQuestion.value].answer
  if (answerIndex !== correctAnswerIndex) {
    const button = buttons[answerIndex]
    button.classList.add('bg-red-600')
    const i = document.createElement('i')
    i.classList.add('pi')
    i.classList.add('pi-times')
    button.appendChild(i)
    answerStatus.value = answerStatusEnum.INCORRECT
  }
  colorCorrectButton(buttons[correctAnswerIndex])
  answerStatus.value = answerStatusEnum.CORRECT

  const correct = questions.value[actualQuestion.value].answer === answerIndex
  if (correct) {
    correctAnswers.value++
  }
  answerStatus.value = answerStatusEnum.UNANSWERED
  setTimeout(() => {
    nextQuestion()
    buttons.forEach((button) => {
      button.classList.remove('bg-emerald-500')
      button.classList.remove('bg-red-600')
      button.classList.add('bg-gray-700')
      button.innerHTML = button.innerHTML.split('<i')[0]
    })
  }, 1000)
  return correct
}
const resultMessage = computed(() => {
  if (correctAnswers.value >= 8) {
    return 'Felicidades! 🎉, conseguiste ' + correctAnswers.value + 'de 10 respuestas correctas'
  }
  if (correctAnswers.value >= 5) {
    return 'Que Bien 😎, conseguiste ' + correctAnswers.value + 'de 10 respuestas'
  }
  if (correctAnswers.value >= 1) {
    return 'Hay que estudiar 😅, conseguiste ' + correctAnswers.value + 'de 10 respuestas'
  }
  return 'Lo siento 😔 conseguiste 0 de 10 respuestas'
})
</script>

<template>
  <RulesDialog :ready="questions" :onAccept="start" />
  <div class="flex flex-row items-center justify-center h-screen">
    <Skeleton v-if="!questions" width="10rem" height="4rem" borderRadius="16px"></Skeleton>
    <Card v-else-if="!testFinished" class="w-1/3">
      <template #title>
        <h2>Pregunta {{ actualQuestion + 1 }} de {{ questions.length }}</h2>
        <div class="w-full flex flex-row justify-between items-center">
          <ProgressBar :needTransition="true" :value="progress" />
        </div>
        {{ questions[actualQuestion].question }}
      </template>
      <template #content>
        <div class="flex flex-col gap-2">
          <div
            @click="() => answerStatus == answerStatusEnum.UNANSWERED && checkAnswer(index)"
            class="text-start justify-start w-full :hover:text-white p-2 rounded-md cursor-pointer"
            v-for="(options, index) in questions[actualQuestion].options"
            :key="index"
          >
            <div
              class="hover:border-white border border-gray-500 flex flex-row items-center p-3 rounded-md w-full answer bg-gray-700 justify-between"
            >
              <p class="p-1 text-start w-full font-bold">{{ index + 1 }} .- {{ options }}</p>
            </div>
          </div>
        </div>
      </template>
    </Card>
    <!-- Resultados -->
    <Card class="w-1/3" v-else>
      <template #title>
        <h2 class="text-4xl font-bold">Resultados</h2>
      </template>

      <template #content>
        <div class="flex flex-col gap-2 justify-center">
          <p class="font-semibold text-2xl">Porcentaje de aciertos:</p>
          <ProgressBar
            :height="20"
            v-if="correctPercentage != 0"
            :showValue="true"
            :value="correctPercentage"
          />
          <p class="text-2xl text-red-600" v-else>Sin Respuestas correctas :c</p>
          <Divider />
        </div>
      </template>
      <template #footer>
        <div class="mb-8 flex flex-col gap-2 justify-center">
          <p class="text-center font-semibold text-2xl">{{ resultMessage }}</p>
        </div>
        <div class="flex flex-row justify-center items-center w-full">
          <Button icon="pi pi-refresh" class="w-1/4" label="Reiniciar" @click="restarTest" />
        </div>
      </template>
    </Card>
  </div>
</template>
