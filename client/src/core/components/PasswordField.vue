<script setup lang="ts">
import { computed, ref } from 'vue';
import HiddenIcon from '../icons/HiddenIcon.vue';
import ShowIcon from '../icons/ShowIcon.vue';

//#region Props
interface Props {
    id: string
    name: string
    text_label: string
    placeholder?: string
}

defineProps<Props>()
//#endregion

const STATE = {
    hidden: "password",
    shown: "text"
}

const isShown = ref(false);

const type = computed(
    () => isShown.value ? STATE.shown : STATE.hidden
)

function handleClick() {
    isShown.value = !isShown.value;
}
</script>

<template>
    <div class="flex flex-col gap-1 relative">
        <label :for=id class="font-bold text-base">{{ text_label }}</label>
        <input class="bg-white rounded-lg border-[1px] border-secondary p-[7px] focus:outline-none" :type=type :name=name :id=id :placeholder=placeholder />
        <div class="absolute right-0 bottom-0 p-[7px]" @click="handleClick">
            <ShowIcon v-if="isShown" />
            <HiddenIcon v-if="!isShown" />
        </div>
    </div>
</template>