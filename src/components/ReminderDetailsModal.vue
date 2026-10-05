<template>
    <BaseModal
        maxWidth="max-w-md"
        @close="close"
    >
        <div class="bg-white rounded-2xl shadow-xl p-6">
            <div class="flex items-start justify-between gap-4 mb-5">
                <div class="flex items-start gap-3">
                <div
                    class="w-3 h-3 rounded-full mt-2 flex-shrink-0"
                    :style="{ backgroundColor: reminder.color || '#34A469' }"
                ></div>

                <h2
                    class="font-['Outfit'] font-semibold text-xl text-gray-900"
                >
                    {{ reminder.title }}
                </h2>
                </div>

                <button
                    @click="close"
                    class="text-gray-400 hover:text-gray-700 transition-colors"
                    >
                    <i class="fa-solid fa-xmark text-xl"></i>
                </button>
            </div>

            <div class="flex flex-col gap-5">
                <div>
                    <p class="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                        Fecha
                    </p>

                    <p class="text-sm text-gray-700">
                        {{ formatDate(reminder.date) }}
                    </p>
                </div>

                <div>
                    <p class="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                        Descripción
                    </p>

                    <p
                        v-if="reminder.description"
                        class="text-sm text-gray-700 leading-relaxed"
                    >
                        {{ reminder.description }}
                    </p>

                    <p
                        v-else
                        class="text-sm text-gray-400 italic"
                    >
                        Este recordatorio no tiene descripción.
                    </p>
                </div>

                <div>
                    <p class="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                        Recordatorio para:
                    </p>
                    <p class="text-sm text-gray-700">
                        <span v-if="reminder.group_id">
                            Grupo: {{ reminder.groups?.name || "Grupo" }}
                        </span>

                        <span v-else>
                            Solo para mí
                        </span>
                    </p>
                </div>
                <!-- <div>
                <p class="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                    Creado por
                </p>

                <p class="text-sm text-gray-700">
                    {{ reminder.profiles?.username || "Usuario" }}
                </p>
                </div> -->
            </div>
        </div>
    </BaseModal>
</template>

<script setup>
import BaseModal from "./BaseModal.vue"

defineProps({
    reminder: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(["close"])

function close() {
    emit("close")
}

function formatDate(dateStr) {
    if (!dateStr) return ""

    const [year, month, day] = String(dateStr)
        .slice(0, 10)
        .split("-")

    const date = new Date(
        Number(year),
        Number(month) - 1,
        Number(day)
    )

    return date.toLocaleDateString("es-AR", {
        day: "numeric",
        month: "long",
        year: "numeric"
    })
}
</script>