<template>
    <nav class="flex items-center justify-between p-4 bg-white shadow-sm relative" aria-label="Barra de navegación">
        <h1 class="text-xl font-bold">AntBC</h1>

        <button
            @click="isOpen = !isOpen"
            class="md:hidden text-2xl focus:outline-none"
            aria-label="Abrir menú"
            >
            <svg v-if="!isOpen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" class="w-7 h-7">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>

            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" class="w-7 h-7">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>

    <div
        :class="[
            'flex flex-col md:flex-row md:items-center md:gap-6 absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none transition-all duration-300',
            isOpen ? 'opacity-100 visible' : 'opacity-0 invisible md:opacity-100 md:visible'
        ]"
        >
        <ul class="flex flex-col md:flex-row text-lg md:text-base text-gray-700">
            <li><a href="#" class="block px-4 py-2 menu-link hover:font-bold transition-all duration-300 ease-in-out font-normal md:font-normal">Inicio</a></li>
            <li><a href="#" class="block px-4 py-2 menu-link hover:font-bold transition-all duration-300 ease-in-out font-normal md:font-normal">Funciones</a></li>
            <li><a href="#" class="block px-4 py-2 menu-link hover:font-bold transition-all duration-300 ease-in-out font-normal md:font-normal">Planes</a></li>
            <li><a href="#" class="block px-4 py-2 menu-link hover:font-bold transition-all duration-300 ease-in-out font-normal md:font-normal">Preguntas Frecuentes</a></li>
        </ul>

        <button class="btn-primary px-5 py-3 rounded-2xl font-semibold focus:outline-none transition-all duration-300">
        Descargar
        </button>
    </div>
    </nav>
</template>

<script setup>
import { ref } from 'vue'
const isOpen = ref(false)
</script>
