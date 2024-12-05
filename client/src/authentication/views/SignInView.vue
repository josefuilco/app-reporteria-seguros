<script setup lang="ts">
import SignInForm from '../components/SignInForm.vue';

</script>

<template>
    <div class="flex flex-col gap-4 w-[350px] m-auto">
        <img class="size-20" src="/favicon.png" alt="Logo de la empresa F. REYES Y CIA">
        <h1 class="text-3xl font-bold">Bienvenido! 👋</h1>
        <p class="mb-4">Ingrese al programa de seguros con su cuenta.</p>
        <SignInForm/>
    </div>
</template>