<script setup>
import RulesDialog from '@/components/RulesDialog.vue'
import Card from 'primevue/card'
import questions from '@/data/questions'
import ProgressBar from '@/components/ProgressBar.vue'

import { ref } from 'vue'

const actualQuestion = ref(0)

const totalTime = 15
const timeLeft = ref(totalTime)
const progress = ref(100)
let interval
const start = () => {
  interval = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value -= 1
      progress.value = (timeLeft.value / totalTime) * 100
    } else {
      clearInterval(interval)
    }
  }, 1000)
}
const restart = () => {
  clearInterval(interval)
  timeLeft.value = totalTime
  progress.value = 100
  start()
}

const checkAnswer = (answerIndex) => {
  console.log(answerIndex)
  if (answerIndex === questions[actualQuestion.value].answer) {
    console.log('Respuesta correcta')
  } else {
    console.log('Respuesta incorrecta')
  }
  actualQuestion.value++

  if (actualQuestion.value === questions.length) {
    console.log('Fin del examen')
  }
}
</script>

<template>
  <RulesDialog :onAccept="start" />
  <div class="flex flex-row items-center justify-center h-screen">
    <Card>
      <template #title>
        <ProgressBar :time="timeLeft" />
        {{ questions[actualQuestion].question }}
      </template>
      <template #content>
        <div class="flex flex-row gap-2">
          <div
            @click="checkAnswer(index)"
            class="bg-red-500 w-full :hover:bg-red-700 :hover:text-white p-2 rounded-md cursor-pointer"
            v-for="(options, index) in questions[actualQuestion].options"
            :key="index"
          >
            <p>{{ index + 1 }}</p>

            <p>{{ options }}</p>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="w-full flex justify-center flex-row items-center">
          <Button label="Aceptar" class="w-3/4" />
        </div>
      </template>
    </Card>
  </div>
</template>
