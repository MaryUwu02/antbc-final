<template>
    <div
        class="bg-[#fffdf8] border border-[#eee8dc]
        rounded-[24px] p-5"
    >
        <div class="flex items-start justify-between gap-4">

            <div class="flex items-center gap-3 min-w-0">
                <div
                    class="w-11 h-11 flex-shrink-0 rounded-xl
                    bg-[#f5f1e9] flex items-center justify-center
                    text-[#34A469]"
                >
                    <i class="fa-solid fa-layer-group"></i>
                </div>

                <div class="min-w-0">
                    <h3
                        class="font-['Outfit'] text-lg font-medium
                        text-[#2d2926] truncate"
                    >
                        {{ flashcard.title }}
                    </h3>

                    <p class="text-sm text-[#9b9387] mt-1">
                        {{ flashcard.items.length }}
                        {{ flashcard.items.length === 1 ? 'card' : 'cards' }}
                    </p>
                </div>
            </div>

            <div class="flex items-center gap-1">
                <div class="relative group">
                    <button
                        @click="showStudyModal = true"
                        class="w-10 h-10 flex-shrink-0 rounded-xl
                        text-[#958d82] hover:text-[#34A469] transition"
                    >
                        <i class="fa-solid fa-arrow-right"></i>
                    </button>

                    <span
                        class="absolute top-full left-1/2 -translate-x-1/2 mt-3
                        px-3 py-1.5 rounded-lg bg-black dark:bg-gray-800
                        text-white text-sm opacity-0 group-hover:opacity-100
                        pointer-events-none transition-all duration-200
                        whitespace-nowrap z-50 shadow-md"
                    >
                        Estudiar
                    </span>
                </div>
                <div class="relative group">
                    <button
                        @click="showDeleteModal = true"
                        class="w-10 h-10 flex-shrink-0 rounded-xl
                        text-[#958d82] hover:text-[#E3562B] transition"
                    >
                        <i class="fa-solid fa-xmark"></i>
                    </button>

                    <span
                        class="absolute top-full left-1/2 -translate-x-1/2 mt-3
                        px-3 py-1.5 rounded-lg bg-black dark:bg-gray-800
                        text-white text-sm opacity-0 group-hover:opacity-100
                        pointer-events-none transition-all duration-200
                        whitespace-nowrap z-50 shadow-md"
                    >
                        Eliminar
                    </span>
                </div>
            </div>
        </div>
    </div>

    <FlashcardStudyModal
        v-if="showStudyModal"
        :flashcard="flashcard"
        @close="showStudyModal = false"
    />

    <DeleteModal
        v-if="showDeleteModal"
        :loading="deleting"
        @close="showDeleteModal = false"
        @confirm="confirmDelete"
    >
        ¿Estás seguro de que querés eliminar la flashcard
        <span class="font-medium text-gray-800">
            "{{ flashcard.title }}"
        </span>?
        Esta acción eliminará también todas las tarjetas
        que contiene.
    </DeleteModal>
</template>

<script setup>
import { ref } from "vue";
import FlashcardStudyModal from "../../components/FlashcardStudyModal.vue";
import DeleteModal from "../../components/DeleteModal.vue";

const props = defineProps({
    flashcard: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(["deleted"]);

const showStudyModal = ref(false);
const showDeleteModal = ref(false);

function handleDeleted() {
    showDeleteModal.value = false;
    emit("deleted", props.flashcard.flashcard_id);
}
</script>