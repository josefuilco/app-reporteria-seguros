<script setup lang="ts">
import { computed } from 'vue';

type Color = 'bg-complementary-1' | 'bg-complementary-3' | 'bg-primary'

interface Props {
    color: Color
    content: string
}

const props = defineProps<Props>()

const HOVER_COLOR = [
    "hover:bg-hv-complementary-1",
    "hover:bg-hv-complementary-3",
    "hover:bg-hv-primary"
]

const hvColor = computed(
    () => props.color === 'bg-complementary-1'
    ? HOVER_COLOR[0]
    : props.color === 'bg-complementary-3'
    ? HOVER_COLOR[1]
    : HOVER_COLOR[2]
)
</script>

<template>
    <button :class="`font-bold rounded-lg py-[7.5px] ${ color } text-white ${ hvColor } transition-colors duration-300`" type="submit">
        {{ content }}
    </button>
</template>