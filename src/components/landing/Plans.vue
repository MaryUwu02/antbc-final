<template>
  <section ref="sectionRef" class="py-16">
    <div class="max-w-6xl mx-auto px-6 space-y-12 flex flex-col items-center">

      <!-- 🧠 TITULO -->
      <h2
        :class="[
          'text-color text-3xl md:text-4xl font-extrabold text-center opacity-0',
          isVisible && 'animate-fade-up'
        ]"
      >
        Planes para tu equipo
      </h2>

      <!-- 💳 CARDS -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">

        <!-- PLAN GRATIS -->
        <div
          :class="[
            'bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-between border border-gray-200 opacity-0',
            isVisible && 'animate-fade-up'
          ]"
          style="animation-delay: 0.15s"
        >
          <div>
            <h3 class="text-2xl font-semibold text-gray-900 mb-4">
              Plan Gratis
            </h3>

            <p class="text-gray-600 mb-6">
              Ideal para comenzar y probar la plataforma sin costos.
            </p>

            <ul class="space-y-4 text-gray-700 mb-6">

              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-[#E85A2A] mt-1" viewBox="0 0 24 24" fill="none">
                  <path d="M4.5 12.75l6 6 9-13.5" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>Hasta 3 proyectos activos.</span>
              </li>

              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-[#E85A2A] mt-1" viewBox="0 0 24 24" fill="none">
                  <path d="M4.5 12.75l6 6 9-13.5" stroke="currentColor" stroke-width="3"/>
                </svg>
                <span>Seguimiento básico de progreso.</span>
              </li>

              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-[#E85A2A] mt-1" viewBox="0 0 24 24" fill="none">
                  <path d="M4.5 12.75l6 6 9-13.5" stroke="currentColor" stroke-width="3"/>
                </svg>
                <span>Hasta 5 miembros en el equipo.</span>
              </li>

            </ul>
          </div>

          <button class="mt-4 px-6 py-3 rounded-2xl bg-gray-200 text-gray-900 font-semibold hover:bg-gray-300 transition">
            Elegir Gratis
          </button>
        </div>

        <!-- PLAN PLUS -->
        <div
          :class="[
            'bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-between border border-gray-200 opacity-0',
            isVisible && 'animate-fade-up'
          ]"
          style="animation-delay: 0.3s"
        >
          <div>
            <h3 class="text-2xl font-semibold text-gray-900 mb-4">
              Plan Plus
            </h3>

            <p class="text-gray-600 mb-6">
              Perfecto para equipos que necesitan funciones avanzadas y mayor capacidad.
            </p>

            <ul class="space-y-4 text-gray-700 mb-6">

              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-[#E85A2A] mt-1" viewBox="0 0 24 24" fill="none">
                  <path d="M4.5 12.75l6 6 9-13.5" stroke="currentColor" stroke-width="3"/>
                </svg>
                <span>Proyectos ilimitados.</span>
              </li>

              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-[#E85A2A] mt-1" viewBox="0 0 24 24" fill="none">
                  <path d="M4.5 12.75l6 6 9-13.5" stroke="currentColor" stroke-width="3"/>
                </svg>
                <span>Panel de métricas en tiempo real.</span>
              </li>

              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-[#E85A2A] mt-1" viewBox="0 0 24 24" fill="none">
                  <path d="M4.5 12.75l6 6 9-13.5" stroke="currentColor" stroke-width="3"/>
                </svg>
                <span>Uso ilimitado del chatbot.</span>
              </li>

              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-[#E85A2A] mt-1" viewBox="0 0 24 24" fill="none">
                  <path d="M4.5 12.75l6 6 9-13.5" stroke="currentColor" stroke-width="3"/>
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

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const sectionRef = ref(null);
const isVisible = ref(false);

let observer = null;

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true;
        observer.disconnect();
      }
    },
    { threshold: 0.2 }
  );

  if (sectionRef.value) observer.observe(sectionRef.value);
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});
</script>

<style>
@keyframes fadeUp {
  0% {
    opacity: 0;
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-up {
  animation: fadeUp 0.8s ease-out forwards;
}
</style>