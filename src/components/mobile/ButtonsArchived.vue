<template>
  <div class="flex flex-col gap-3">
    <button
      class="px-6 py-2 rounded-xl text-white font-semibold bg-blue-500 hover:bg-blue-700 transition"
      @click="$emit('unarchive')"
    >
      Desarchivar
    </button>

    <button
      class="px-6 py-2 rounded-xl bg-gray-100 text-gray-800 font-semibold hover:bg-gray-200 transition"
      @click="$emit('delete')"
    >
      Eliminar
    </button>
  </div>
</template>

<script setup>
defineProps({
  group: Object
});
</script>
