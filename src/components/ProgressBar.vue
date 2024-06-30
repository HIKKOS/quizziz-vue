<template>
  <div :class="divClass" :style="{ width: props.value + '%' }">
    <p v-if="showValue" class="font-bold text-center text-lg">{{ value }}%</p>
  </div>
</template>

<script setup>
const props = defineProps(['value', 'needTransition', 'showValue'])

const needTransition = props.needTransition
const showValue = props.showValue && props.value
let divClass = 'flex flex-row items-center justify-center rounded-lg h-10  bg-[#34d399]  '
if (needTransition) divClass += ' ease-linear duration-1000 '
</script>
