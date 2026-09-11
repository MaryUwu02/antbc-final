<template>
    <BaseModal @close="$emit('close')">

        <div class="bg-white rounded-xl shadow-lg p-6">

            <h2 class="text-xl font-bold text-gray-900 mb-4">
                Editar recordatorio
            </h2>

            <div class="flex flex-col gap-4">

                <div>
                <label class="block text-sm font-medium text-gray-700">
                    Nombre del recordatorio
                </label>

                <input
                    v-model="title"
                    type="text"
                    placeholder="Título"
                    class="w-full px-4 py-2 rounded-lg border border-gray-300
                    focus:outline-none focus:ring-2 focus:ring-blue-300"
                />

                <p v-if="errors.title" class="text-red-600 text-sm mt-1">
                    {{ errors.title }}
                </p>
                </div>

                <div>
                <label class="block text-sm font-medium text-gray-700">
                    Descripción
                </label>

                <textarea
                    v-model="description"
                    rows="3"
                    placeholder="Descripción"
                    class="w-full px-4 py-2 rounded-lg border border-gray-300
                    focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
                ></textarea>
                </div>

                <div>
                <label class="block text-sm font-medium text-gray-700">
                    Fecha
                </label>

                <input
                    v-model="date"
                    type="date"
                    class="w-full px-4 py-2 rounded-lg border border-gray-300
                    focus:outline-none focus:ring-2 focus:ring-blue-300"
                />

                <p v-if="errors.date" class="text-red-600 text-sm mt-1">
                    {{ errors.date }}
                </p>
                </div>

            </div>

            <div class="flex justify-end gap-3 mt-6">

                <button
                    @click="$emit('close')"
                    class="px-4 py-2 text-sm font-medium text-gray-600"
                >
                Cancelar
                </button>

                <button
                    @click="updateReminder"
                    class="px-5 py-2 rounded-lg btn-primary transition text-white"
                >
                Guardar cambios
                </button>

            </div>

        </div>

    </BaseModal>
</template>

<script setup>
import { ref, onMounted } from "vue";
import BaseModal from "./BaseModal.vue";
import { supabase } from "../services/supabase.js";

const emit = defineEmits(["close", "updated"]);

const props = defineProps({
    reminder: {
        type: Object,
        required: true,
    },
});

const title = ref("");
const description = ref("");
const date = ref("");

const errors = ref({});

onMounted(() => {
    title.value = props.reminder.title || "";
    description.value = props.reminder.description || "";
    date.value = props.reminder.date || "";
});

function validate() {
    errors.value = {};

    if (!title.value.trim()) {
        errors.value.title = "El título es obligatorio";
    }

    if (!date.value) {
        errors.value.date = "La fecha es obligatoria";
    }

    return Object.keys(errors.value).length === 0;
}

async function updateReminder() {

    if (!validate()) return;

    const { data, error } = await supabase
        .from("reminders")
        .update({
            title: title.value,
            description: description.value,
            date: date.value,
        })
        .eq("id", props.reminder.id)
        .select()
        .single();

    if (error) {
        console.error(error);
        return;
    }

    emit("updated", data);
    emit("close");
}
</script>