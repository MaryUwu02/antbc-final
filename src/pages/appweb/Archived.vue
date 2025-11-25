<template>
    <div class="flex min-h-screen">
        <NavMobile />

        <main class="flex-1 p-6">
            <h1 class="text-2xl font-bold text-gray-800 mb-2">Archivado</h1>
            <p class="text-gray-600 mb-6">
                Acá podés ver todos los proyectos que archivaste. Podés desarchivar o eliminar proyectos según necesites.
            </p>

            <div class="flex flex-col gap-6">
                <div class="flex items-start gap-4">
                <CardArchivedTrash :group="group" />
                <ButtonsArchived :group="group" />
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import NavMobile from '../../components/mobile/NavMobile.vue';
import CardArchivedTrash from '../../components/mobile/CardArchivedTrash.vue';
import ButtonsArchived from '../../components/mobile/ButtonsArchived.vue';

const group = {
  name: 'Proyecto X',
  created_at: '24/11/2025',
  members: 5
}
</script>
