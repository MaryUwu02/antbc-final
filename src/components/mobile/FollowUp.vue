<template>
    <div class="flex-1 p-4 md:p-8 overflow-y-auto bg-[#f5f7fb] min-h-screen">

        <div class="bg-white rounded-[32px] p-6 shadow-sm mb-6">

            <div class="flex flex-col xl:flex-row gap-6">

                <div class="flex-1">

                    <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-6">

                        <div class="flex items-start gap-4">

                            <div
                                class="w-16 h-16 rounded-full bg-violet-500 text-white flex items-center justify-center text-2xl font-bold shrink-0"
                            >
                                J
                            </div>

                            <div>

                                <div class="flex flex-wrap items-center gap-3">

                                    <h2 class="text-2xl font-bold text-gray-800">
                                        Juan Pérez
                                    </h2>

                                    <span
                                        class="text-xs px-3 py-1 rounded-full btn-primary text-white-600 font-medium"
                                    >
                                        Diseñador UX
                                    </span>

                                </div>

                                <p class="text-gray-500 mt-1 break-all">
                                    juan@email.com
                                </p>

                            </div>

                        </div>

                        <div class="flex flex-col gap-4 text-left md:text-right">

                            <div>
                                <p class="text-sm text-gray-400">
                                    Última actividad
                                </p>

                                <p class="font-semibold text-gray-800">
                                    Hace 2 horas
                                </p>
                            </div>

                            <div>
                                <p class="text-sm text-gray-400">
                                    Teléfono
                                </p>

                                <p class="font-semibold text-gray-800">
                                    +54 11 2345 6789
                                </p>
                            </div>

                        </div>

                    </div>

                </div>

                <div
                    class="w-full xl:w-[320px] bg-[#f8f8fc] rounded-[28px] p-6 flex flex-col justify-between border border-gray-100"
                >

                    <div>

                        <h2 class="text-lg font-bold text-gray-800 mb-2">
                            Envía un empujoncito
                        </h2>

                        <p class="text-sm text-gray-500 leading-relaxed">
                            ¡Hola! No te olvides de seguir con tus trabajos.
                        </p>

                    </div>

                    <button
                        class="mt-6 btn-primary transition-all duration-200 text-white px-5 py-3 rounded-2xl font-medium w-full shadow-sm"
                    >
                        Enviar
                    </button>

                </div>

            </div>

        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">

            <div class="bg-white rounded-[28px] p-5 shadow-sm">

                <p class="text-gray-500 text-sm mb-2">
                    Completadas
                </p>

                <h3 class="text-3xl font-bold text-green-500">
                    18
                </h3>

                <p class="text-sm text-green-500 mt-2">
                    +12% esta semana
                </p>

            </div>

            <div class="bg-white rounded-[28px] p-5 shadow-sm">

                <p class="text-gray-500 text-sm mb-2">
                    Pendientes
                </p>

                <h3 class="text-3xl font-bold text-yellow-500">
                    4
                </h3>

                <p class="text-sm text-yellow-500 mt-2">
                    Requieren atención
                </p>

            </div>

            <div class="bg-white rounded-[28px] p-5 shadow-sm">

                <p class="text-gray-500 text-sm mb-2">
                    Atrasadas
                </p>

                <h3 class="text-3xl font-bold text-red-500">
                    2
                </h3>

                <p class="text-sm text-red-500 mt-2">
                    Prioridad alta
                </p>

            </div>

            <div class="bg-white rounded-[28px] p-5 shadow-sm">

                <p class="text-gray-500 text-sm mb-2">
                    Racha de actividad
                </p>

                <h3 class="text-3xl font-bold text-violet-500">
                    12 días
                </h3>

                <p class="text-sm text-violet-500 mt-2">
                    Excelente constancia
                </p>

            </div>

        </div>

        <div class="grid grid-cols-1 xl:grid-cols-3 gap-4">

            <div class="bg-white rounded-[28px] p-6 shadow-sm">

                <div class="flex items-center justify-between mb-6">

                    <h3 class="font-semibold text-gray-800">
                        Progreso general
                    </h3>

                    <span
                        class="btn-primary text-white-600 px-3 py-1 rounded-full text-sm font-medium"
                    >
                        72%
                    </span>

                </div>

                <div class="flex items-center justify-center py-6">

                    <div
                        class="w-40 h-40 rounded-full border-[14px] border-blue-400 border-t-blue-100 flex items-center justify-center"
                    >
                        <span class="text-3xl font-bold text-gray-700">
                            72%
                        </span>
                    </div>

                </div>

            </div>

            <div class="bg-white rounded-[28px] p-6 shadow-sm">

                <h3 class="font-semibold text-gray-800 mb-5">
                    To Do List
                </h3>

                <ul class="space-y-4">

                    <li class="flex items-center gap-3">

                        <input
                            type="checkbox"
                            checked
                            class="w-4 h-4 accent-blue-500"
                        />

                        <span class="text-gray-700">
                            Completar dashboard
                        </span>

                    </li>

                    <li class="flex items-center gap-3">

                        <input
                            type="checkbox"
                            class="w-4 h-4 accent-blue-500"
                        />

                        <span class="text-gray-700">
                            Subir documentación
                        </span>

                    </li>

                    <li class="flex items-center gap-3">

                        <input
                            type="checkbox"
                            class="w-4 h-4 accent-violet-500"
                        />

                        <span class="text-gray-700">
                            Asistir reunión grupal
                        </span>

                    </li>

                </ul>

            </div>

            <div class="bg-white rounded-[28px] p-6 shadow-sm">

                <h3 class="font-semibold text-gray-800 mb-5">
                    Próxima entrega
                </h3>

                <div
                    class="bg-[#f8f8fc] rounded-2xl p-5 border border-dashed border-gray-200"
                >

                    <p class="text-sm text-gray-500">
                        Proyecto final
                    </p>

                    <h4 class="text-3xl font-bold mt-2 text-gray-800">
                        18 Mayo
                    </h4>

                    <p class="text-sm text-red-500 mt-2">
                        Faltan 3 días
                    </p>

                </div>

            </div>

        </div>

    </div>
</template>

<script setup>
</script>