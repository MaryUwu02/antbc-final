<template>
  <section class="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
    <h1 class="text-color text-2xl sm:text-3xl font-bold mb-4">Elegí tu plan</h1>
    <p class="text-gray-600 text-base sm:text-lg max-w-lg mb-8">
      ¡Podés cambiarlo cuando quieras!
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">

      <div class="bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-between border border-gray-200">
        <div>
          <h3 class="text-2xl font-semibold text-gray-900 mb-4">Plan Gratis</h3>

          <p class="text-gray-600 mb-6">
            Ideal para comenzar y probar la plataforma sin costos.
          </p>

          <ul class="space-y-4 text-gray-700 mb-6">
            <li class="flex items-start gap-3">

              <svg class="w-5 h-5 text-[#E85A2A] flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.5 12.75l6 6 9-13.5" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>Hasta 3 proyectos activos.</span>
            </li>

            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-[#E85A2A] flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.5 12.75l6 6 9-13.5" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>Seguimiento básico de progreso.</span>
            </li>

            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-[#E85A2A] flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.5 12.75l6 6 9-13.5" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>Hasta 5 miembros en el equipo.</span>
            </li>
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
          <h3 class="text-2xl font-semibold text-gray-900 mb-4">Plan Plus</h3>

          <p class="text-gray-600 mb-6">
            Perfecto para equipos que necesitan funciones avanzadas y mayor capacidad.
          </p>

          <ul class="space-y-4 text-gray-700 mb-6">
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-[#E85A2A] flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.5 12.75l6 6 9-13.5" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>Proyectos ilimitados.</span>
            </li>

            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-[#E85A2A] flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.5 12.75l6 6 9-13.5" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>Panel de métricas en tiempo real.</span>
            </li>

            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-[#E85A2A] flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.5 12.75l6 6 9-13.5" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>Uso ilimitado del chatbot.</span>
            </li>

            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-[#E85A2A] flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.5 12.75l6 6 9-13.5" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>Espacio ampliado.</span>
            </li>
          </ul>
        </div>

        <button class="btn-primary mt-4 px-6 py-3 rounded-2xl text-white font-semibold shadow">
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