<template>
  <h2 class="text-xl font-semibold text-gray-900 mb-4">Recordatorios</h2>

    <div class="flex flex-col gap-4">

      <div class="flex items-start bg-gray-50 rounded-xl shadow-sm border-l-4 border-green-600 p-4">
        <div class="flex-1">
          <div class="flex items-center justify-between mb-1">
            <h3 class="font-semibold text-gray-800">Entrega prototipo fucional</h3>
            <span class="text-xs text-gray-500">Hoy - 11:10</span>
          </div>
          <p class="text-sm text-gray-600">
            Entrega de funcionalidades con nota.
          </p>
        </div>
      </div>

    </div>

    <div class="mt-6 flex gap-3">
      <button
        class="btn-outline-primary px-6 py-2 rounded-xl bg-gray-100 text-gray-800 font-semibold transition"
      >
        Ver todo
      </button>
      <button
        class="btn-primary px-6 py-2 rounded-xl text-white font-semibold hover:bg-green-800 transition"
      >
        Agregar recordatorio
      </button>
    </div>
</template>

<script setup>
</script>