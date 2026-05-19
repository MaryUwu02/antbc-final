<template>
    <BaseModal @close="$emit('close')">

        <div class="bg-white p-6 rounded-xl shadow w-full max-w-sm z-10">
            <h2 class="font-['Outfit'] font-medium text-xl text-gray-900 mb-4">
                Unirse a grupo
            </h2>

            <div>
                <label class="block text-sm font-medium text-gray-700">
                    Código de acceso
                </label>
                <input
                    v-model="code"
                    placeholder="Ej: ABC123"
                    class="w-full px-4 py-2 rounded-lg border border-gray-300
                    focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
        
                <p v-if="error" class="text-red-500 text-sm mb-2">
                {{ error }}
                </p>
            </div>

            <div class="flex justify-end gap-3 mt-4">
                <button
                    @click="$emit('close')"
                    class="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"    
                >
                    Cancelar
                </button>

                <button
                    @click="handleJoin"
                    class="px-5 py-2 rounded-lg btn-primary text-white font-semibold transition"
                >
                    Unirse
                </button>
            </div>
        </div>
    </BaseModal>
</template>

<script setup>
import { ref } from "vue";
import BaseModal from "./BaseModal.vue";
import { joinGroupByCode } from "../services/groups";

const emit = defineEmits(["close", "joined"]);

const code = ref("");
const error = ref(null);

async function handleJoin() {
    error.value = null;

    try {
        await joinGroupByCode(code.value);
        emit("joined");
        emit("close");
    } catch (err) {
        error.value = err.message;
    }
}
</script>