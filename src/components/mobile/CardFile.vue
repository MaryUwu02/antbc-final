<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <router-link
        v-for="(archivo, index) in archivos"
        :key="index"
        :to="archivo.ruta"
        target="_blank"
        rel="noopener noreferrer"
        class="block"
        >
        <div class="bg-white dark:bg-gray-800 shadow rounded-xl p-4 cursor-pointer w-full">
            <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {{ archivo.nombre }}
            </h2>
            <i class="fa-regular fa-star text-yellow-400 text-xl"></i>
            </div>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Última edición: {{ archivo.ultimaEdicion }}
            </p>
        </div>
        </router-link>
    </div>
</template>

<script>
export default {
  data() {
    return {
      archivos: [
        { nombre: "Archivo 1", ultimaEdicion: "24/11/2025", ruta: "/ruta-destino" },
      ],
    };
  },
};
</script>
