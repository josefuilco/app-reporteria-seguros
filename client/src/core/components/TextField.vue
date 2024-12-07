<script setup lang="ts">
interface Props {
    id: string
    name: string
    text_label: string
    placeholder?: string
}

defineProps<Props>()
</script>

<template>
    <div class="flex flex-col gap-1">
        <label :for=id class="font-bold text-base">{{ text_label }}</label>
        <input class="bg-white rounded-lg border-[1px] border-secondary p-[7px] focus:outline-none" type="text" :name=name :id=id :placeholder=placeholder />
    </div>
</template>