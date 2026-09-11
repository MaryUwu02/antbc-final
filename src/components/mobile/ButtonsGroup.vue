<template>
    <div class="flex gap-4">
        <button
            class="px-6 py-2 rounded-full font-semibold text-white bg-yellow-500 hover:bg-yellow-600 transition"
            @click="$emit('invite')"
        >
            Invitar
        </button>

        <button
            class="px-6 py-2 rounded-full font-semibold text-white bg-green-600"
            @click="$emit('new-file')"
        >
        Crear archivo
        </button>

        <button
            class="px-6 py-2 rounded-full font-semibold text-white bg-red-600"
            @click="$emit('leave')"
        >
        Abandonar
        </button>
    </div>
</template>

<script setup>
defineEmits(['invite', 'new-file', 'leave'])
</script>