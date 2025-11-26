<template>
    <div class="flex gap-4 mb-6">
        <button
        class="px-6 py-2 rounded-full font-semibold text-white bg-yellow-500 hover:bg-yellow-600 transition"
        >
        Compartir
        </button>

        <button
        class="px-6 py-2 rounded-full font-semibold text-white bg-green-600"
        @click="$router.push('/new-file')"
        >
        Crear archivo
        </button>


    </div>
</template>

<script setup>
</script>