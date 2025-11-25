<template>
  <section class="p-6 flex flex-col gap-6 max-w-md mx-auto">
    <div class="flex items-start bg-gray-50 rounded-xl shadow-sm border-l-4 border-green-600 p-4">
      <div class="flex-1">
        <div class="flex items-center justify-between mb-1">
          <h3 class="font-semibold text-gray-800">Entrega prototipo funcional</h3>
          <span class="text-xs text-gray-500">Hoy - 11:10</span>
        </div>
        <p class="text-sm text-gray-600">Entrega de funcionalidades con nota.</p>
      </div>
    </div>

    <div class="flex gap-3 mt-2">
      <button
        @click="$emit('open-seguimiento')"
        class="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2 rounded-xl transition w-full text-center"
      >
        <i class="fa-solid fa-eye"></i>
        Seguimiento
      </button>

      <button
        @click="openActivity"
        class="flex items-center justify-center gap-2 border-2 border-orange-500 text-orange-600 font-semibold px-5 py-2 rounded-xl hover:bg-orange-50 transition w-full"
      >
        <i class="fa-solid fa-clock"></i>
        Actividad
      </button>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'

</script>
