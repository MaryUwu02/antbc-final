<template>
    <section class="bg-white">
        <div class="max-w-6xl mx-auto px-6 py-12 md:py-20">
            <div class="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12">

                        <div class="w-full md:w-1/2">
                        <h2 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight opacity-0 animate-fade-up">
                          Centralizá tus proyectos,
                          <span class="block text-color">simplificá tu vida</span>
                        </h2>

                        <p class="mt-4 text-base sm:text-lg text-gray-600 max-w-xl opacity-0 animate-fade-up-soft [animation-delay:0.2s]">
                            Planificá, compartí y avanzá con AntBC. La forma más ágil de trabajar en grupo.
                        </p>

                        <div class="mt-6 flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-3 opacity-0 animate-fade-up-soft [animation-delay:0.4s]">
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
                    <div class="w-90 h-100 flex items-center justify-center opacity-0 animate-fade-up [animation-delay:0.3s]">
                        <img :src="banner" alt="Banner" class="object-cover w-full h-full" />
                    </div>
                    </div>

            </div>
        </div>
    </section>

    <div class="overflow-hidden whitespace-nowrap relative bg-white py-6">
  <div class="carousel-track gap-4">

    <template v-for="i in 2">
      <span class="px-5 py-2 rounded-xl bg-[#F79C05] text-[#332926]">Calendarios</span>
      <span class="px-5 py-2 rounded-xl bg-[#F79C05] text-[#332926]">ChatBots</span>
      <span class="px-5 py-2 rounded-xl bg-[#F79C05] text-[#332926]">Tableros</span>
      <span class="px-5 py-2 rounded-xl bg-[#F79C05] text-[#332926]">Seguimientos</span>
      <span class="px-5 py-2 rounded-xl bg-[#F79C05] text-[#332926]">Recordatorios</span>
      <span class="px-5 py-2 rounded-xl bg-[#F79C05] text-[#332926]">Diagramas</span>
      <span class="px-5 py-2 rounded-xl bg-[#F79C05] text-[#332926]">Métricas</span>
      <span class="px-5 py-2 rounded-xl bg-[#F79C05] text-[#332926]">Llamadas</span>
      <span class="px-5 py-2 rounded-xl bg-[#F79C05] text-[#332926]">Lista de Tareas</span>
      <span class="px-5 py-2 rounded-xl bg-[#F79C05] text-[#332926]">Notas</span>
      <span class="px-5 py-2 rounded-xl bg-[#F79C05] text-[#332926]">Presentaciones</span>
      <span class="px-5 py-2 rounded-xl bg-[#F79C05] text-[#332926]">Diseños</span>
      <span class="px-5 py-2 rounded-xl bg-[#F79C05] text-[#332926]">Organizaciones</span>
    </template>

  </div>
</div>

</template>

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

@keyframes fadeUpSoft {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-up {
  animation: fadeUp 0.8s ease-out forwards;
}

.animate-fade-up-soft {
  animation: fadeUpSoft 1s ease-out forwards;
}

@keyframes scrollInfinite {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}

.carousel-track {
  display: flex;
  width: max-content;
  animation: scrollInfinite 25s linear infinite;
}
</style>

<script setup>
import banner from '../../assets/imgs/banner-prueba.png'

</script>