<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
    <div
      v-for="(archivo, index) in archivos"
      :key="index"
      class="bg-white shadow-md rounded-3xl p-6 border-l-8 transition-all duration-300 hover:shadow-xl"
      :class="archivo.color"
    >
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-semibold text-gray-900 truncate">
          <router-link
            :to="archivo.ruta"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-blue-600 transition-colors duration-300"
          >
            {{ archivo.nombre }}
          </router-link>
        </h2>
        <i
          class="fa-regular fa-star text-yellow-400 text-2xl transition-transform duration-300 group-hover:scale-110"
        ></i>
      </div>

      <p class="text-gray-500 text-sm mt-4">
        Última edición: {{ archivo.ultimaEdicion }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      archivos: [
        {
          nombre: "Frontend",
          ultimaEdicion: "5 días",
          ruta: "/ruta-destino",
          color: "border-[#FF5A3C]",
        },
        {
          nombre: "Backend",
          ultimaEdicion: "1 día",
          ruta: "/ruta-destino",
          color: "border-[#FF5A3C]",
        },
        {
          nombre: "Mockup productos",
          ultimaEdicion: "2 días",
          ruta: "/ruta-destino",
          color: "border-[#0099D9]",
        },
        {
          nombre: "Wireframes",
          ultimaEdicion: "3 meses",
          ruta: "/ruta-destino",
          color: "border-[#3CBF5E]",
        },
        {
          nombre: "Speech",
          ultimaEdicion: "4 días",
          ruta: "/ruta-destino",
          color: "border-[#FFA500]",
        },
      ],
    };
  },
};
</script>