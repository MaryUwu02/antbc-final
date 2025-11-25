<template>
    <div class="flex flex-col gap-3">
        <button
        type="button"
        class="px-6 py-2 rounded-xl text-white font-semibold bg-blue-500 hover:bg-blue-700 transition"
        >
        Desarchivar
        </button>

        <button
        type="button"
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

</script>