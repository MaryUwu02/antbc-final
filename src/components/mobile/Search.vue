<template>
    <div class="flex items-center gap-3 w-full max-w-md">
        <div
        class="flex-1 flex items-center px-4 py-2 rounded-xl border border-white/20 text-white"
        style="background-color: #140E0C;"
        >
            <i class="fa-solid fa-magnifying-glass text-white/70 mr-2"></i>

            <input
                :value="modelValue"
                @input="$emit('update:modelValue', $event.target.value)"
                @keydown.enter.prevent
                type="text"
                placeholder="Buscar..."
                class="w-full bg-transparent outline-none placeholder-white/60 text-white"
            />
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    modelValue: {
        type: String,
        default: ""
    }
})
const emit = defineEmits(["update:modelValue"])
</script>