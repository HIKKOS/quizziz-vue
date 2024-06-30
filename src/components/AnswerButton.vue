<template>
  <div
    @click="props.onClick(index)"
    class="text-start justify-start w-full :hover:text-white p-2 rounded-md cursor-pointer"
    :key="index"
  >
    <div class="p-3 rounded-md w-full answer hover:bg-slate-600">
      <p class="p-1 text-start w-full font-bold">{{ index + 1 }} .- {{ options }}</p>
    </div>
  </div>
</template>
<script setup>
const props = defineProps(['onClick'])
</script>
