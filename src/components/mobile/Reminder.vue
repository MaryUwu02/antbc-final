<template>
  <h2 class="text-xl font-semibold text-gray-900 mb-4">Recordatorios</h2>
  <div>
    <p v-if="reminders.length === 0" class="text-gray-500 text-sm italic">
      Todavía no creaste ningún recordatorio
    </p>

    <div v-else class="flex flex-col gap-4">
      <div
        v-for="(item, i) in reminders"
        :key="i"
        class="flex items-start bg-gray-50 rounded-xl shadow-sm border-l-4 border-green-600 p-4"
      >
        <div class="flex-1">
          <div class="flex items-center justify-between mb-1">
            <h3 class="font-semibold text-gray-800">{{ item.title }}</h3>
            <span class="text-xs text-gray-500">{{ item.date }}</span>
          </div>
          <p class="text-sm text-gray-600">
            {{ item.description }}
          </p>
        </div>
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
import { ref } from 'vue'

const reminders = ref([]) 
</script>