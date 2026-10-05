<template>
    <BaseModal
        maxWidth="max-w-3xl"
        @close="emit('close')"
    >
        <div
            class="bg-white rounded-2xl shadow p-3
            overflow-hidden"
        >
            <div class="max-h-[90vh] overflow-y-auto p-3 md:p-8 chatScroll">
                <div class="flex items-start justify-between mb-7">
                    <div>
                        <h2 class="font-['Outfit'] font-medium text-xl text-[#2d2926]">
                            Crear flashcard
                        </h2>
                    </div>
                </div>

                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-[#4d4741] mb-2">
                            Título
                        </label>

                        <input
                            v-model="title"
                            type="text"
                            placeholder="Título"
                            class="w-full px-4 py-3 rounded-lg border border-gray-300
                            focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400 focus:shadow-md transition-all duration-300 ease-in-out resize-none"
                        />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-[#4d4741] mb-2">
                            Descripción de la unidad
                        </label>

                        <textarea
                            v-model="description"
                            rows="3"
                            placeholder="Escribí una breve descripción de lo que trata esta unidad."
                            class="w-full px-4 py-3 rounded-lg border border-gray-300
                            focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400 focus:shadow-md transition-all duration-300 ease-in-out resize-none"
                        ></textarea>
                    </div>

                    <div class="pt-3">

                        <div class="flex items-center justify-between mb-4">
                            <div>
                                <h3 class="font-medium text-[#3f3934]">
                                    Términos y definiciones
                                </h3>

                                <p class="text-xs text-[#9b9387] mt-1">
                                    Agregá los conceptos que quieras estudiar.
                                </p>
                            </div>

                            <span class="text-xs text-[#9b9387]">
                                {{ items.length }} términos
                            </span>
                        </div>

                        <div class="space-y-4">

                            <div
                                v-for="(item, index) in items"
                                :key="item.id"
                                class="bg-[#f8f5ee] border border-[#eee8dc]
                                rounded-2xl p-4"
                            >

                                <div class="flex items-center justify-between mb-4">
                                    <span class="text-xs font-semibold text-[#8e867b]">
                                        Término {{ index + 1 }}
                                    </span>

                                    <button
                                        v-if="items.length > 3"
                                        @click="removeItem(item.id)"
                                        class="text-[#b4aca1] hover:text-red-500 transition"
                                    >
                                        <i class="fa-solid fa-trash text-xs"></i>
                                    </button>
                                </div>

                                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">

                                    <div>
                                        <label class="block text-xs text-[#8e867b] mb-1.5">
                                            Término
                                        </label>

                                        <input
                                            v-model="item.term"
                                            type="text"
                                            placeholder="Ejemplo"
                                            class="w-full px-3 py-3 rounded-lg border
                                            border-gray-300 bg-white focus:outline-none
                                            focus:ring-2 focus:ring-gray-200 
                                            focus:border-gray-400 focus:shadow-md
                                            transition-all duration-300 ease-in-out resize-none"
                                        />
                                    </div>

                                    <div>
                                        <label class="block text-xs text-[#8e867b] mb-1.5">
                                            Definición
                                        </label>

                                        <textarea
                                            v-model="item.definition"
                                            rows="2"
                                            placeholder="Escribí su definición..."
                                            class="w-full px-3 py-3 rounded-lg border
                                            border-gray-300 bg-white focus:outline-none
                                            focus:ring-2 focus:ring-gray-200 
                                            focus:border-gray-400 focus:shadow-md
                                            transition-all duration-300 ease-in-out resize-none"
                                        ></textarea>
                                    </div>

                                </div>
                            </div>

                        </div>

                        <button
                            @click="addItem"
                            class="w-full mt-4 flex items-center justify-center gap-2
                            px-4 py-3 rounded-xl border border-dashed
                            border-[#d8d0c3] text-[#7d756b]
                            hover:bg-[#f8f5ee] hover:text-[#4d4741] transition"
                        >
                            <i class="fa-solid fa-plus text-sm"></i>
                        </button>

                    </div>
                </div>

                <div
                    class="flex justify-end gap-3 mt-8 pt-5
                    border-t border-[#eee8dc]"
                >
                    <button
                        @click="emit('close')"
                        class="px-5 py-3 rounded-xl text-[#6f675d]"
                    >
                        Cancelar
                    </button>

                    <button
                        @click="handleCreate"
                        class="px-5 py-3 rounded-xl bg-[#34A469]
                        text-white font-semibold hover:bg-[#2f955e] transition"
                    >
                        Crear flashcard
                    </button>
                </div>
            </div>
        </div>
    </BaseModal>
</template>

<script setup>
import { ref } from "vue";
import BaseModal from "../BaseModal.vue";
import { createFlashcard } from "../../services/flashcard.js";

const props = defineProps({
    groupId: {
        type: String,
        required: true
    }
});

const emit = defineEmits(["close", "created"]);

const title = ref("");
const description = ref("");

const items = ref([
    {
        id: Date.now(),
        term: "",
        definition: ""
    },
    {
        id: Date.now() + 1,
        term: "",
        definition: ""
    },
    {
        id: Date.now() + 2,
        term: "",
        definition: ""
    }
]);

function addItem() {
    items.value.push({
        id: Date.now(),
        term: "",
        definition: ""
    });
}

function removeItem(id) {
    items.value = items.value.filter(item => item.id !== id);
}

async function handleCreate() {
    try {
        const newFlashcard = await createFlashcard(
            props.groupId,
            title.value,
            description.value,
            items.value
        );

        emit("created", newFlashcard);
    } catch (error) {
        console.error("Error al crear la flashcard:", error);
    }
}
</script>