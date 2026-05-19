<template>
    <BaseModal @close="$emit('close')">

        <div class="relative bg-white rounded-2xl shadow p-6 w-full max-w-md z-10">
            <h2 class="font-['Outfit'] font-medium text-xl text-gray-900 mb-4">
                Crear grupo
            </h2>

            <form @submit.prevent="onCreateGroup" class="space-y-4">

                <div>
                    <label class="block text-sm font-medium text-gray-700">
                        Nombre del grupo
                    </label>
                    <input
                        v-model="form.name"
                        type="text"
                        class="w-full px-4 py-2 rounded-lg border border-gray-300
                        focus:outline-none focus:ring-2 focus:ring-blue-300"
                        :class="{ 'border-red-500': errors.name }"
                    />
                    <p v-if="errors.name" class="text-red-500 text-sm mt-1">
                        {{ errors.name }}
                    </p>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700">
                        Fecha de inicio
                    </label>
                    <input
                        type="date"
                        :value="today"
                        readonly
                        class="w-full px-4 py-2 rounded-lg border border-gray-300
                        focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700">
                        Finalización (opcional)
                    </label>
                    <input
                        type="date"
                        v-model="form.due_date"
                        class="w-full px-4 py-2 rounded-lg border border-gray-300
                        focus:outline-none focus:ring-2 focus:ring-blue-300"
                        :class="{ 'border-red-500': errors.due_date }"
                    />
                    <p v-if="errors.due_date" class="text-red-500 text-sm mt-1">
                    {{ errors.due_date }}
                    </p>
                </div>
                
                <div v-if="createdGroup" class="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <p class="text-sm text-gray-600 mb-2">
                        Código de invitación
                    </p>

                    <div class="flex items-center justify-between gap-2">
                        <span class="font-mono text-lg font-semibold tracking-widest">
                        {{ createdGroup.invitation_code }}
                        </span>

                        <button
                        type="button"
                        @click="copyCode"
                        class="text-sm px-3 py-1.5 rounded-md bg-gray-200 hover:bg-gray-300 transition"
                        >
                        {{ copied ? "Copiado!" : "Copiar" }}
                        </button>
                    </div>
                </div>

                <div class="flex justify-end gap-3 mt-4">
                    <button
                        type="button"
                        @click="emit('close')"
                        class="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
                    >
                        {{ createdGroup ? "Cerrar" : "Cancelar" }}
                    </button>

                    <button
                        v-if="!createdGroup"
                        type="submit"
                        :disabled="creating"
                        class="px-5 py-2 rounded-lg btn-primary text-white font-semibold transition"
                    >
                        <span v-if="!creating">Crear grupo</span>
                        <span v-else>Creando…</span>
                    </button>
                </div>

                <p
                    v-if="createError && !errors.name && !errors.due_date"
                    class="text-red-500 text-sm mt-2"
                >
                    {{ createError }}
                </p>
            </form>
        </div>

    </BaseModal>
</template>

<script setup>
import { ref, computed } from "vue";
import BaseModal from "./BaseModal.vue";
import { createGroup } from "../services/groups.js";
const createdGroup = ref(null);
const copied = ref(false);

const emit = defineEmits(["close", "created"]);

const form = ref({
    name: "",
    due_date: ""
});

const creating = ref(false);
const createError = ref(null);
const errors = ref({
    name: null,
    due_date: null
});

const today = computed(() =>
    new Date().toISOString().split("T")[0]
);

function close() {
    emit("close");
}

function clearErrors() {
    createError.value = null;
    errors.value.name = null;
    errors.value.due_date = null;
}

function isDateBefore(a, b) {
    return new Date(a + "T00:00:00") < new Date(b + "T00:00:00");
}

async function onCreateGroup() {
    clearErrors();

    if (!form.value.name.trim()) {
        errors.value.name = "El nombre es obligatorio.";
        return;
    }

    if (
        form.value.due_date &&
        isDateBefore(form.value.due_date, today.value)
    ) {
        errors.value.due_date =
        "La fecha de finalización no puede ser anterior a hoy.";
        return;
    }

    creating.value = true;

    try {
        const group = await createGroup(
        form.value.name.trim(),
        form.value.due_date || null
        );

        createdGroup.value = group;
        emit("created");
    } catch (err) {
        createError.value =
        err?.message || "Ocurrió un error al crear el grupo.";
    } finally {
        creating.value = false;
    }
}

async function copyCode() {
    if (!createdGroup.value?.invitation_code) return;

    await navigator.clipboard.writeText(createdGroup.value.invitation_code);
    copied.value = true;

    setTimeout(() => {
        copied.value = false;
    }, 2000);
}
</script>