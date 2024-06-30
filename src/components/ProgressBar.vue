<template>
  <div
    class="rounded-lg h-3 progress-bar bg-[#34d399] duration-1000 ease-linear"
    :style="{ backgroundColor: red, height: 10, width: props.value + '%' }"
  >
    <p>{{ props.value }}</p>
  </div>
</template>

<script setup>
const props = defineProps(['value'])
/* import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps(['time'])
const totalTime = props.time
const timeLeft = ref(totalTime)
const progress = ref(100)

let interval

onMounted(() => {
  interval = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value -= 1
      progress.value = (timeLeft.value / totalTime) * 100
    } else {
      clearInterval(interval)
    }
  }, 1000)
})

onUnmounted(() => {
  clearInterval(interval)
}) */
</script>
