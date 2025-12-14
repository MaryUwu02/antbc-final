<template>
  <div class="flex min-h-screen">
    <NavMobile />

    <main class="flex-1 p-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-2">Papelera</h1>
      <p class="text-gray-600 mb-6">
        Los grupos eliminados se pueden restaurar o eliminar permanentemente.
      </p>

      <div v-if="loading" class="flex items-center justify-center py-20">
        <Loader />
      </div>

      <div v-else-if="trashedGroups.length === 0" class="text-gray-500 py-20 text-center italic">
        No hay grupos en papelera.
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="group in trashedGroups"
          :key="group.id"
          class="bg-white rounded-2xl shadow p-5 flex flex-col gap-3 border border-gray-100 relative"
        >
          <div class="flex justify-between items-start">
            <h3 class="text-lg font-semibold text-gray-900">{{ group.name }}</h3>

            <div class="relative">
              <ButtonsTrash
                :group="group"
                @restore="handleRestore(group)"
                @delete="handleDelete(group)"
              />
            </div>
          </div>

          <div class="text-sm text-gray-500">
            <p>Creación: {{ formatDate(group.created_at) }}</p>
            <p>Miembros: {{ group.members_count || 0 }}</p>
          </div>

          <div>
            <div class="flex justify-between text-xs text-gray-500 mb-1">
              <span>Progreso</span>
              <span>{{ group.progress || 0 }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                class="h-2 rounded-full"
                :style="{ width: (group.progress || 0) + '%', backgroundColor: '#0A88C4' }"
              ></div>
            </div>
          </div>

          <router-link
            :to="`/group/${group.id}`"
            class="mt-3 text-sm font-semibold text-blue-600 hover:text-blue-800 transition text-center block"
          >
            Ver grupo
          </router-link>
        </div>
      </div>

    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import NavMobile from '../../components/mobile/NavMobile.vue';
import Loader from '../../components/Loader.vue';
import ButtonsTrash from '../../components/mobile/ButtonsTrash.vue';
import { fetchTrashedGroups, restoreGroup, deleteGroupPermanent } from '../../services/groups.js';

const loading = ref(false);
const trashedGroups = ref([]);

async function loadTrashedGroups() {
  loading.value = true;
  try {
    trashedGroups.value = await fetchTrashedGroups();
  } catch (err) {
    console.error('Error cargando grupos en papelera:', err);
  } finally {
    loading.value = false;
  }
}

async function handleRestore(group) {
  try {
    await restoreGroup(group.id);
    trashedGroups.value = trashedGroups.value.filter(g => g.id !== group.id);
  } catch (err) {
    console.error('Error restaurando grupo:', err);
  }
}

async function handleDelete(group) {
  try {
    await deleteGroupPermanent(group.id);
    trashedGroups.value = trashedGroups.value.filter(g => g.id !== group.id);
  } catch (err) {
    console.error('Error eliminando grupo permanentemente:', err);
  }
}

function formatDate(value) {
  try {
    if (!value) return '-';
    return new Date(value).toLocaleDateString();
  } catch {
    return String(value);
  }
}

onMounted(() => {
  loadTrashedGroups();
});
</script>
