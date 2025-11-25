<template>
    <section class="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
        <h1 class="text-color text-2xl sm:text-3xl font-bold mb-4">Eligí tu plan</h1>
        <p class="text-gray-600 text-base sm:text-lg max-w-lg mb-8">
            ¡Podés cambiarlo cuando quieras!
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
            <div class="bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-between border border-gray-200">
                <div>
                <h3 class="text-2xl font-semibold text-gray-900 mb-4">
                    <a href="#" class="hover:text-blue-600 transition">Plan Gratis</a>
                </h3>
                <p class="text-gray-600 mb-6">
                    Ideal para comenzar y probar la plataforma sin costos.
                </p>
                <ul class="space-y-2 text-gray-700 mb-6">
                    <li>✔ Hasta 3 proyectos activos.</li>
                    <li>✔ Seguimiento básico de progreso.</li>
                    <li>✔ Hasta 5 miembros en el equipo.</li>
                </ul>
                </div>
                <button
                class="mt-4 px-6 py-3 rounded-2xl bg-gray-200 text-gray-900 font-semibold hover:bg-gray-300 transition"
                >
                Elegir Gratis
                </button>
            </div>

        <div class="bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-between border border-gray-200">
            <div>
                <h3 class="text-2xl font-semibold text-gray-900 mb-4">
                    <a href="#">Plan Plus</a>
                </h3>
                <p class="text-gray-600 mb-6">
                    Perfecto para equipos que necesitan funciones avanzadas y mayor capacidad.
                </p>
                <ul class="space-y-2 text-gray-700 mb-6">
                    <li>✔ Proyectos ilimitados.</li>
                    <li>✔ Panel de métricas en tiempo real.</li>
                    <li>✔ Uso ilimitado del chatbot.</li>
                    <li>✔ Espacio ampliado.</li>
                </ul>
                </div>
                <button
                class="btn-primary mt-4 px-6 py-3 rounded-2xl text-white font-semibold shadow"
                >
                Elegir Plus
                </button>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "Planes",
};
</script>