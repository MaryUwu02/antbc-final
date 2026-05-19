<template>
    <div class="flex gap-4">
        <button
            class="px-6 py-2 rounded-full font-semibold text-gray-800 bg-gray-200 hover:bg-gray-300 transition"
        >
            Todos
        </button>

        <button
            class="px-6 py-2 rounded-full font-semibold text-gray-800 bg-gray-200 hover:bg-gray-300 transition"
        >
            Favoritos
        </button>

        <router-link
            :to="`/followupmembers`"
            class="px-6 py-2 rounded-full font-semibold text-gray-800 bg-gray-200 hover:bg-gray-300 transition"
        >
            Seguimiento
        </router-link>

        <button
            class="px-6 py-2 rounded-full font-semibold text-gray-800 bg-gray-200 hover:bg-gray-300 transition"
        >
            Archivado
        </button>

        <button
            class="px-6 py-2 rounded-full font-semibold text-gray-800 bg-gray-200 hover:bg-gray-300 transition"
        >
            Papelera
        </button>
    </div>
</template>

<script setup>
</script>