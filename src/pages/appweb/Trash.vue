<template>
    <div class="flex min-h-screen">
        <NavMobile />

        <main class="flex-1 p-6">
            <h1 class="text-2xl font-bold text-gray-800 mb-2">Papelera</h1>
            <p class="text-gray-600 mb-6">
                Una vez eliminado el grupo, no se podrá voler a recuperar.
            </p>

            <div v-if="loading" class="flex items-center justify-center py-20">
                <Loader />
            </div>

            <div v-else-if="trashedGroups.length === 0" class="text-gray-500 py-20 text-center italic">
                No hay grupos en papelera.
            </div>

            <div v-else class="flex flex-col gap-6">
                <div v-for="group in trashedGroups" :key="group.id" class="flex items-start gap-4">
                    <CardArchivedTrash :group="group" />
                    <ButtonsTrash :group="group" />
                </div>
            </div>

        </main>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import NavMobile from '../../components/mobile/NavMobile.vue';
import CardArchivedTrash from '../../components/mobile/CardArchivedTrash.vue';
import ButtonsTrash from '../../components/mobile/ButtonsTrash.vue';
import Loader from '../../components/Loader.vue';

const loading = ref(false);
const trashedGroups = ref([]);
</script>