<script setup>
import { ref } from 'vue'
const isModalVisible = ref(true)
const props = defineProps(['onAccept', 'ready'])
</script>

<template>
  <Dialog :closable="false" class="w-1/4 p-2" modal v-model:visible="isModalVisible">
    <template #container="{ closeCallback }">
      <div class="container flex flex-col p-4">
        <h2 class="font-bold text-2xl text-center">Reglas</h2>
        <p class="font-normal text-lg">1. No se puede salir del examen.</p>
        <p class="font-normal text-lg">2. No se puede regresar a preguntas anteriores.</p>
        <p class="font-normal text-lg">3. No se puede pausar el examen.</p>

        <Button
          :disabled="!ready"
          class="mt-2"
          @click="
            () => {
              props.onAccept()
              closeCallback()
            }
          "
        >
          <i class="pi pi-check"></i> Entendido
        </Button>
      </div>
    </template>
  </Dialog>
</template>
