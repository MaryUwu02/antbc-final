<template>
    <button
        type="button"
        @click="emit('open')"
        class="flex items-center justify-center
        w-11 aspect-square rounded-full
        shadow hover:opacity-90 transition"
        style="background-color: #140E0C; color: white;"
        aria-label="Crear nuevo grupo"
        >
        <i class="fa-solid fa-plus text-lg"></i>
    </button>
</template>

<script setup>
const emit = defineEmits(["open"]);
</script>