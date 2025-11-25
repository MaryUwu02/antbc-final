<template>
    <section class="py-16">
        <div class="max-w-6xl mx-auto px-6 space-y-16">
            <h2 class="text-color text-3xl md:text-4xl font-extrabold text-center">
                Tus herramientas favoritas
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">

                <div
                class="featuresOne relative flex flex-col justify-end rounded-3xl shadow-md text-center overflow-hidden h-120"
                >
                    <div class="relative z-10 p-6 text-white">
                        <h3 class="text-2xl font-semibold mb-3">
                        Crea un grupo de trabajo e invita a tu equipo
                        </h3>
                        <p class="text-sm sm:text-base">
                        Organizá tus proyectos en grupos colaborativos. Invitá a integrantes o visitantes mediante
                        un enlace seguro y gestioná permisos fácilmente desde una misma plataforma.
                        </p>
                    </div>
                </div>

                <div
                class="featuresTwo relative flex flex-col justify-end rounded-3xl shadow-md text-center overflow-hidden h-120"
                >
                    <div class="relative z-10 p-6 text-white">
                        <h3 class="text-2xl font-semibold mb-3">
                        Realizá llamadas y videollamadas con tu equipo
                        </h3>
                        <p class="text-sm sm:text-base">
                        Conectate en tiempo real con tu grupo sin depender de múltiples aplicaciones.
                        AntBC integra videollamadas y reuniones virtuales de forma fluida y segura.
                        </p>
                    </div>
                </div>

                <div
                class="featuresThree relative flex flex-col justify-end rounded-3xl shadow-md text-center overflow-hidden h-120"
                >
                    <div class="relative z-10 p-6 text-white">
                        <h3 class="text-2xl font-semibold mb-3">
                        Chateá con tu equipo y usá el ChatBot
                        </h3>
                        <p class="text-sm sm:text-base">
                        Comunicá ideas, compartí archivos y pedile al asistente integrado que te ayude
                        con tareas, redacción o brainstorming sin salir de AntBC.
                        </p>
                    </div>
                </div>

            </div>

            <div class="max-w-3xl mx-auto text-center flex flex-col items-center">
                <h4 class="text-color text-2xl sm:text-3xl font-bold mb-4">
                    ¡Unite para conocer más funciones!
                </h4>

                <p class="text-gray-600 text-base sm:text-lg max-w-lg mb-8">
                    Descubrí cómo AntBC puede ayudarte a organizar tus proyectos, comunicarte mejor y avanzar en equipo.
                </p>

                <div>
                    <router-link
                        to="/register"
                        class="inline-flex items-center justify-center px-5 py-3 rounded-2xl font-semibold transition-all duration-300 ease-in-out btn-primary"
                    >
                        Probar gratis
                    </router-link>
                </div>

            </div>
        </div>
    </section>
</template>

<script setup>
</script>