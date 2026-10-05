<template>
    <div class="flex min-h-screen">

        <NavMobile />

        <main class="flex-1 p-6">

            <div class="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">

                <div>
                    <h1 class="font-['Outfit'] font-bold text-3xl mb-2">
                        Mis flashcards
                    </h1>

                    <p class="text-gray-600 mb-6">
                        Creá y organizá tus tarjetas de estudio.
                    </p>
                </div>

                <button
                    @click="showCreateModal = true"
                    class="px-5 py-3 rounded-xl bg-[#34A469] text-white
                    font-semibold hover:bg-[#2f955e] transition"
                >
                    <i class="fa-solid fa-plus mr-2"></i>
                    Crear flashcard
                </button>

            </div>

            <CreateFlashcardModal
                v-if="showCreateModal && group"
                :group-id="group.group_id"
                @close="showCreateModal = false"
                @created="addFlashcard"
            />

            <div
                v-if="flashcards.length"
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >

                <Flashcard
                    v-for="flashcard in flashcards"
                    :key="flashcard.flashcard_id"
                    :flashcard="flashcard"
                    @deleted="removeFlashcard"
                />

            </div>

            <div
                v-else
                class="flex flex-col items-center justify-center
                min-h-[400px] text-center"
            >
                <p class="text-gray-500 font-body text-sm italic mt-2">
                    Creá tu primera unidad para comenzar a estudiar.
                </p>
            </div>

        </main>

    </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

import NavMobile from "../../components/mobile/NavMobile.vue";
import CreateFlashcardModal from "../../components/mobile/CreateFlashcardModal.vue";
import Flashcard from "./Flashcard.vue";

import { fetchGroupById } from "../../services/groups.js";
import { getFlashcards } from "../../services/flashcard.js";

const route = useRoute();

const group = ref(null);
const showCreateModal = ref(false);
const flashcards = ref([]);

function addFlashcard(newFlashcard) {
    flashcards.value.unshift(newFlashcard);
    showCreateModal.value = false;
}
function removeFlashcard(flashcardId) {
    flashcards.value = flashcards.value.filter(
        flashcard => flashcard.flashcard_id !== flashcardId
    );
}
onMounted(async () => {
    try {
        const groupId = route.params.id;

        group.value = await fetchGroupById(groupId);

        flashcards.value = await getFlashcards(groupId);

    } catch (err) {
        console.error("Error cargando flashcards:", err);
    }
});
</script>