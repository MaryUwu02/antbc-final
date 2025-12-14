<template>
    <teleport to="body">
        <Transition name="modal" appear>
            <div class="fixed inset-0 z-50 flex items-center justify-center">

                <div 
                class="absolute inset-0 backdrop-blur-[2px] bg-black/20"
                @click="close">
                </div>

                <div class="relative bg-white rounded-2xl shadow p-6 w-full max-w-md z-10">
                    <h2 class="text-xl font-bold text-gray-900 mb-4">
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

                        <div class="flex justify-end gap-3 mt-4">
                            <button
                                type="button"
                                @click="close"
                                class="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
                            >
                                Cancelar
                            </button>

                            <button
                                type="submit"
                                :disabled="creating"
                                class="px-5 py-2 rounded-lg btn-primary text-white
                                font-semibold transition"
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
            </div>
        </Transition>
    </teleport>
</template>

<script setup>
import { ref, computed } from "vue";
import { createGroup } from "../services/groups.js";

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
        await createGroup(
            form.value.name.trim(),
            form.value.due_date || null
        );
        emit("created");
        close();
    } catch (err) {
        createError.value =
        err?.message || "Ocurrió un error al crear el grupo.";
    } finally {
        creating.value = false;
    }
}
</script>

<style>
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.25s ease, transform 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
    transform: scale(1);
}

.modal-enter-to,
.modal-leave-from {
    opacity: 1;
    transform: scale(1);
}
</style>