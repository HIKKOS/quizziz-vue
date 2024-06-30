<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="flex flex-col h-screen w-screen justify-center items-center">
    <h1 class="text-center">¡Bienvenido!</h1>
    <RouterLink to="/examen" class="btn btn-primary">
      <Button> Iniciar examen <i class="pi pi-play"></i> </Button>
    </RouterLink>
  </main>
</template>
