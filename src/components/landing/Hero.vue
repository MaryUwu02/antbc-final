<template>
    <section class="bg-white">
        <div class="max-w-6xl mx-auto px-6 py-12 md:py-20">
            <div class="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12">

                <div class="w-full md:w-1/2">
                    <h2 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                        Centralizá tus proyectos, <span class="text-color">simplificá tu vida</span>
                    </h2>

                    <p class="mt-4 text-base sm:text-lg text-gray-600 max-w-xl">
                        Planificá, compartí y avanzá con AntBC. La forma más ágil de trabajar en grupo.
                    </p>

                    <div class="mt-6 flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-3">
                        <router-link
                            to="/register"
                            class="inline-flex items-center justify-center px-5 py-3 rounded-2xl font-semibold transition-all duration-300 ease-in-out btn-primary"
                        >
                            Empezá gratis
                        </router-link>

                        <a
                            href="#"
                            class="btn-outline-primary inline-flex items-center justify-center px-5 py-3 rounded-2xl font-medium transition-all duration-300 ease-in-out"
                        >
                            Ver demo
                        </a>
                    </div>
                </div>

                <div class="w-full md:w-1/2 flex justify-center">
                <div class="w-90 h-100 flex items-center justify-center">
                    <img :src="banner" alt="Banner" class="object-cover w-full h-full" />
                </div>
                </div>

            </div>
        </div>
    </section>

    <div class="overflow-hidden whitespace-nowrap relative bg-white py-4">
        <div class="animate-marquee flex gap-12 text-xl font-semibold text-gray-800">
            <span>Calendario</span>
            <span>ChatBot</span>
            <span>Tablero</span>
            <span>Seguimiento</span>
            <span>Recordatorios</span>
            <span>Diagramas</span>
            <span>Métricas</span>
            <span>Videollamada</span>
            <span>To Do List</span>
            <span>Notas</span>
            <span>Presentación</span>
            <span>Diseño</span>
            <span>Organización</span>
        </div>
    </div>

</template>

<script setup>
import banner from '../../assets/imgs/banner-prueba.png'

</script>