<template>
  <div>
    <h3 class="font-['Outfit'] font-medium text-xl text-gray-900 mb-4">Mis grupos</h3>

    <div v-if="loading" class="flex items-center justify-center py-20">
      <Loader />
    </div>

    <div v-else-if="groups.length === 0" class="text-gray-500 text-sm italic">
      Todavía no creaste grupos.
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
      <div
        v-for="group in filteredGroups"
        :key="group.id || group.group_id"
        class="bg-white rounded-2xl shadow p-5 flex flex-col gap-3 border border-gray-100 relative"
      >
        <div class="flex justify-between items-start">
          <h4 class="font-['Outfit'] font-medium text-lg text-gray-900">
            {{ group.name }}
          </h4>

          <div class="relative" ref="menuWrapper">
            <i
              class="fa-solid fa-ellipsis-vertical text-gray-400 cursor-pointer p-2 rounded hover:bg-gray-100"
              @click.stop="toggleMenu(group.id || group.group_id)"
            ></i>

            <transition name="fade-scale">
              <div
                v-if="openMenuId === (group.id || group.group_id)"
                class="absolute right-0 mt-2 w-44 bg-white border border-gray-100 rounded-lg shadow-lg z-50"
              >
                <ul class="py-1 text-sm text-gray-700">
                  <li>
                    <button
                      class="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      @click="editGroup(group)"
                    >
                      Editar proyecto
                    </button>
                  </li>

                  <li>
                    <button
                      class="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      @click="archiveGroup(group)"
                    >
                      Archivar proyecto
                    </button>
                  </li>

                  <li>
                    <button
                      class="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                      @click="openDeleteModal(group)"
                    >
                      Eliminar proyecto
                    </button>
                  </li>
                </ul>
              </div>
            </transition>
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
              :style="{
                width: (group.progress || 0) + '%',
                backgroundColor: '#0A88C4'
              }"
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

    <DeleteModal
      v-if="showDeleteModal"
      :loading="Boolean(actionLoading[deleteTargetId])"
      @close="closeDeleteModal"
      @confirm="confirmDelete"
    >
      ¿Estás seguro de que querés eliminar el grupo
      <span class="font-medium text-gray-800">
        "{{ deleteTarget?.name }}"
      </span>?
      Podés restaurarlo cuando quieras en la pestaña
      <span class="font-medium text-gray-800">papelera.</span>
    </DeleteModal>

    <EditGroupModal
      v-if="showEditModal"
      :group-id="editGroupId"
      @close="closeEditModal"
      @updated="onGroupUpdated"
    />
  </div>
</template>
<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import Loader from "../Loader.vue";
import DeleteModal from "../DeleteModal.vue";
import EditGroupModal from "../EditGroupModal.vue";
import { fetchGroups, deleteGroup as deleteGroupService, archiveGroup as archiveGroupService } from "../../services/groups.js";

const props = defineProps({
  search: {
    type: String,
    default: "",
  },
});

const groups = ref([]);
const openMenuId = ref(null);
const showEditModal = ref(false);
const editGroupId = ref(null);
const showDeleteModal = ref(false);
const deleteTarget = ref(null);
const deleteTargetId = ref(null);
const actionLoading = ref({});
const loading = ref(true);
const menuWrapper = ref(null);

const filteredGroups = computed(() => {
  const q = (props.search || "").toLowerCase().trim();

  if (q.length < 2) {
    return groups.value;
  }

  const slice = q.slice(0, 2);

  return groups.value.filter((g) =>
    (g.name || "").toLowerCase().startsWith(slice)
  );
});

async function loadGroups() {
  loading.value = true;

  try {
    const loaded = await fetchGroups();

    groups.value = Array.isArray(loaded)
      ? loaded
      : [];
  } catch (err) {
    console.error("Error cargando grupos:", err);
    groups.value = [];
  } finally {
    loading.value = false;
  }
}

function toggleMenu(id) {
  openMenuId.value =
    openMenuId.value === id
      ? null
      : id;
}

function closeMenu() {
  openMenuId.value = null;
}

function handleClickOutside(event) {
  const wrapper = menuWrapper.value;

  if (!wrapper) return;

  if (Array.isArray(wrapper)) {
    const clickedInside = wrapper.some(
      (el) => el && el.contains(event.target)
    );

    if (!clickedInside) {
      closeMenu();
    }
  } else {
    if (!wrapper.contains(event.target)) {
      closeMenu();
    }
  }
}

function formatDate(value) {
  try {
    return value
      ? new Date(value).toLocaleDateString()
      : "-";
  } catch {
    return String(value);
  }
}

function editGroup(group) {
  const id = group.id || group.group_id;

  if (!id) return;

  editGroupId.value = id;
  showEditModal.value = true;

  closeMenu();
}

async function archiveGroup(group) {
  const id = group.id || group.group_id;

  try {
    await archiveGroupService(id);

    groups.value = groups.value.filter(
      (g) => (g.id || g.group_id) !== id
    );
  } catch (err) {
    console.error("Error archivando grupo:", err);
  } finally {
    closeMenu();
  }
}

function openDeleteModal(group) {
  deleteTarget.value = group;

  deleteTargetId.value =
    group.id || group.group_id;

  showDeleteModal.value = true;

  closeMenu();
}

function closeDeleteModal() {
  if (
    actionLoading.value[
      deleteTargetId.value
    ]
  ) {
    return;
  }

  showDeleteModal.value = false;
  deleteTarget.value = null;
  deleteTargetId.value = null;
}

async function confirmDelete() {
  const id = deleteTargetId.value;

  if (
    !id ||
    actionLoading.value[id]
  ) {
    return;
  }

  const target = deleteTarget.value;

  closeDeleteModal();

  actionLoading.value[id] = true;

  try {
    await deleteGroupService(
      target.id || target.group_id
    );

    groups.value = groups.value.filter(
      (g) => (g.id || g.group_id) !== id
    );
  } catch (err) {
    console.error("Error eliminando grupo:", err);
  } finally {
    actionLoading.value[id] = false;
  }
}

function closeEditModal() {
  showEditModal.value = false;
  editGroupId.value = null;
}

async function onGroupUpdated() {
  await loadGroups();
  closeEditModal();
}

function handleKeydown(e) {
  if (e.key === "Escape") {
    if (showDeleteModal.value) {
      closeDeleteModal();
    } else if (showEditModal.value) {
      closeEditModal();
    } else {
      closeMenu();
    }
  }
}

onMounted(async () => {
  await loadGroups();

  document.addEventListener(
    "click",
    handleClickOutside
  );

  window.addEventListener(
    "keydown",
    handleKeydown
  );
});

onBeforeUnmount(() => {
  document.removeEventListener(
    "click",
    handleClickOutside
  );

  window.removeEventListener(
    "keydown",
    handleKeydown
  );
});
</script>