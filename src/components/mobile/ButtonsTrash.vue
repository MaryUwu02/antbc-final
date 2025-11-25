<template>
  <div class="flex flex-col gap-3">
    <button
      @click="unarchive(group)"
      class="px-6 py-2 rounded-xl text-white font-semibold bg-blue-500 hover:bg-blue-700 transition"
    >
      Desarchivar
    </button>

    <button
      @click="moveToTrash(group)"
      class="px-6 py-2 rounded-xl bg-gray-100 text-gray-800 font-semibold hover:bg-gray-200 transition"
    >
      Eliminar
    </button>
  </div>
</template>

<script setup>
defineProps({
  group: Object
})

function unarchive(group) {
  // lógica de desarchivar
}

function moveToTrash(group) {
  // lógica de mover a papelera
}
</script>
