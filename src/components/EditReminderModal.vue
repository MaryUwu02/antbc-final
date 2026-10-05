<template>
    <BaseModal @close="$emit('close')">

        <div class="bg-white rounded-xl shadow-lg p-6">
            <div class="flex items-center justify-between mb-4">
                <h2 class="font-['Outfit'] font-semibold text-xl text-gray-900">
                    Editar recordatorio
                </h2>
            </div>

            <div class="flex flex-col gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        Recordatorio para
                    </label>

                    <div class="grid grid-cols-2 flex gap-2">

                        <button
                            type="button"
                            @click="reminderType = 'personal'"
                            class="px-4 py-2.5 rounded-xl border text-sm font-medium transition-all"
                            :class="reminderType === 'personal'
                                ? 'border-[#34A469] bg-[#34A469]/10 text-[#34A469]'
                                : 'border-gray-200 text-gray-500 hover:border-gray-300'"
                        >
                            <i class="fa-solid fa-user mr-2"></i>
                            Solo para mí
                        </button>

                        <button
                            type="button"
                            @click="reminderType = 'group'"
                            class="px-4 py-2.5 rounded-xl border text-sm font-medium transition-all"
                            :class="reminderType === 'group'
                                ? 'border-[#0A88C4] bg-[#0A88C4]/10 text-[#0A88C4]'
                                : 'border-gray-200 text-gray-500 hover:border-gray-300'"
                        >
                            <i class="fa-solid fa-users mr-2"></i>
                            Un grupo
                        </button>

                    </div>
                </div>

                <div v-if="reminderType === 'group'">

                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        Grupo
                    </label>

                    <select
                        v-model="selectedGroupId"
                        class="w-full px-4 py-2 rounded-lg border border-gray-300
                        focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                        <option value="" disabled>
                            Seleccioná un grupo
                        </option>

                        <option
                            v-for="group in groups"
                            :key="group.group_id"
                            :value="group.group_id"
                        >
                            {{ group.name }}
                        </option>
                    </select>

                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
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
                    <label class="block text-sm font-medium text-gray-700 mb-2">
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
                    <label class="block text-sm font-medium text-gray-700 mb-2">
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

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        Color
                    </label>

                    <div class="flex items-center gap-3 flex-wrap">
                        <button
                            v-for="itemColor in colors"
                            :key="itemColor"
                            type="button"
                            @click="color = itemColor"
                            class="w-8 h-8 rounded-full transition-all duration-200"
                            :class="color === itemColor
                                ? 'ring-2 ring-offset-2 ring-gray-400 scale-110'
                                : 'hover:scale-105'"
                            :style="{ backgroundColor: itemColor }"
                        ></button>
                    </div>
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
import { fetchGroups } from "../services/groups.js";

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
const color = ref("#34A469");

const reminderType = ref("personal");
const selectedGroupId = ref("");
const groups = ref([]);

const errors = ref({});

const colors = [
    "#34A469",
    "#0A88C4",
    "#E3562B",
    "#F79C05"
];

async function loadGroups() {
    try {
        groups.value = await fetchGroups();
    } catch (error) {
        console.error("Error cargando grupos:", error);
        groups.value = [];
    }
}

onMounted(async () => {

    title.value = props.reminder.title || "";
    description.value = props.reminder.description || "";
    date.value = props.reminder.date || "";

    color.value = props.reminder.color || "#34A469";

    if (props.reminder.group_id) {
        reminderType.value = "group";
        selectedGroupId.value = props.reminder.group_id;
    } else {
        reminderType.value = "personal";
        selectedGroupId.value = "";
    }

    await loadGroups();
});

function validate() {
    errors.value = {};

    if (!title.value.trim()) {
        errors.value.title = "El título es obligatorio";
    }

    if (!date.value) {
        errors.value.date = "La fecha es obligatoria";
    }

    if (reminderType.value === "group" && !selectedGroupId.value) {
        errors.value.group = "Seleccioná un grupo";
    }

    return Object.keys(errors.value).length === 0;
}

async function updateReminder() {

    if (!validate()) return;

    const { data, error } = await supabase
        .from("reminders")
        .update({
            title: title.value.trim(),
            description: description.value.trim(),
            date: date.value,
            color: color.value,
            group_id:
                reminderType.value === "group"
                    ? selectedGroupId.value
                    : null
        })
        .eq("id", props.reminder.id)
        .select(`
            *,
            groups:group_id (
                group_id,
                name
            )
        `)
        .single();

    if (error) {
        console.error("Error actualizando recordatorio:", error);
        return;
    }

    emit("updated", data);
    emit("close");
}
</script>