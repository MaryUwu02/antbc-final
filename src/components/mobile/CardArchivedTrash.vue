<template>
    <div class="flex flex-col justify-between bg-gray-50 rounded-xl shadow-sm border-l-4 border-green-600 p-4 w-4/5">
        <div class="flex items-center justify-between mb-2">
        <h3 class="font-semibold text-gray-800 text-lg">{{ group.name }}</h3>
        <span class="text-xs text-gray-500">{{ group.created_at }}</span>
        </div>
        <p class="text-sm text-gray-600">
        Miembros: {{ group.members }}
        </p>
    </div>
</template>

<script setup>
defineProps({
  group: Object
})
</script>
