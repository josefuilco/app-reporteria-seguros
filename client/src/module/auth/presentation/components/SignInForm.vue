<script setup lang="ts">
import PasswordField from '@/module/shared/presentation/components/PasswordField.vue';
import SubmitButton from '@/module/shared/presentation/components/SubmitButton.vue';
import TextField from '@/module/shared/presentation/components/TextField.vue';

</script>

<template>
    <form class="flex flex-col gap-4">
        <TextField id="txt-username" name="username" text_label="Nombre de Usuario" placeholder="Ingresa tu nombre de usuario" />
        <PasswordField id="txt-password" name="password" text_label="Contraseña" placeholder="Ingresa tu contraseña" />
        <SubmitButton color="bg-primary" content="Iniciar Sesión" />
    </form>
</template>