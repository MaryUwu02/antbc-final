<template>
  <div>
    <h3 class="text-xl font-semibold text-gray-900 mb-4">Mis grupos</h3>

    <div v-if="loading" class="flex items-center justify-center py-20">
      <Loader />
    </div>

    <div v-else-if="groups.length === 0" class="text-gray-500 text-sm italic">
      Todavía no creaste grupos.
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        v-for="group in filteredGroups"
        :key="group.id || group.group_id"
        class="bg-white rounded-2xl shadow p-5 flex flex-col gap-3 border border-gray-100 relative"
      >
        <div class="flex justify-between items-start">
          <h4 class="text-lg font-semibold text-gray-900">
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
      v-model="showDeleteModal"
      :loading="Boolean(actionLoading[deleteTargetId])"
      @confirm="confirmDelete"
      @cancel="closeDeleteModal"
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

<script>
import Loader from "../Loader.vue";
import DeleteModal from "../DeleteModal.vue";
import EditGroupModal from "../EditGroupModal.vue";

import {
  fetchGroups,
  deleteGroup as deleteGroupService,
  archiveGroup as archiveGroupService,
} from "../../services/groups.js";

export default {
  components: {
    Loader,
    DeleteModal,
    EditGroupModal,
  },

  props: {
    search: { type: String, default: "" },
  },

  data() {
    return {
      groups: [],
      openMenuId: null,

      showEditModal: false,
      editGroupId: null,

      showDeleteModal: false,
      deleteTarget: null,
      deleteTargetId: null,

      actionLoading: {},
      loading: true,
    };
  },

  computed: {
    filteredGroups() {
      const q = (this.search || "").toLowerCase().trim();
      if (q.length < 2) return this.groups;
      const slice = q.slice(0, 2);
      return this.groups.filter((g) =>
        (g.name || "").toLowerCase().startsWith(slice)
      );
    },
  },

  methods: {
    async loadGroups() {
      this.loading = true;
      try {
        const loaded = await fetchGroups();
        this.groups = Array.isArray(loaded) ? loaded : [];
      } catch (err) {
        console.error("Error cargando grupos:", err);
        this.groups = [];
      } finally {
        this.loading = false;
      }
    },

    toggleMenu(id) {
      this.openMenuId = this.openMenuId === id ? null : id;
    },

    closeMenu() {
      this.openMenuId = null;
    },

    handleClickOutside(event) {
      const wrapper = this.$refs.menuWrapper;
      if (!wrapper) return;

      if (!Array.isArray(wrapper)) {
        if (!wrapper.contains(event.target)) this.closeMenu();
      } else {
        const clickedInside = wrapper.some(
          (el) => el && el.contains(event.target)
        );
        if (!clickedInside) this.closeMenu();
      }
    },

    formatDate(value) {
      try {
        return value ? new Date(value).toLocaleDateString() : "-";
      } catch {
        return String(value);
      }
    },

    editGroup(group) {
      const id = group.id || group.group_id;
      if (!id) return;

      this.editGroupId = id;
      this.showEditModal = true;
      this.closeMenu();
    },

    async archiveGroup(group) {
      const id = group.id || group.group_id;
      try {
        await archiveGroupService(id);
        this.groups = this.groups.filter(
          (g) => (g.id || g.group_id) !== id
        );
      } catch (err) {
        console.error("Error archivando grupo:", err);
      } finally {
        this.closeMenu();
      }
    },

    openDeleteModal(group) {
      this.deleteTarget = group;
      this.deleteTargetId = group.id || group.group_id;
      this.showDeleteModal = true;
      this.closeMenu();
    },

    closeDeleteModal() {
      if (this.actionLoading[this.deleteTargetId]) return;
      this.showDeleteModal = false;
      this.deleteTarget = null;
      this.deleteTargetId = null;
    },

    async confirmDelete() {
      const id = this.deleteTargetId;
      if (!id || this.actionLoading[id]) return;

      const target = this.deleteTarget;
      this.closeDeleteModal();

      this.$set
        ? this.$set(this.actionLoading, id, true)
        : (this.actionLoading[id] = true);

      try {
        await deleteGroupService(target.id || target.group_id);
        this.groups = this.groups.filter(
          (g) => (g.id || g.group_id) !== id
        );
      } catch (err) {
        console.error("Error eliminando grupo:", err);
      } finally {
        this.$set
          ? this.$set(this.actionLoading, id, false)
          : (this.actionLoading[id] = false);
      }
    },

    closeEditModal() {
      this.showEditModal = false;
      this.editGroupId = null;
    },

    async onGroupUpdated() {
      await this.loadGroups();
      this.closeEditModal();
    },
  },

  async mounted() {
    await this.loadGroups();

    document.addEventListener("click", this.handleClickOutside);

    this._onKeydown = (e) => {
      if (e.key === "Escape") {
        if (this.showDeleteModal) this.closeDeleteModal();
        else if (this.showEditModal) this.closeEditModal();
        else this.closeMenu();
      }
    };

    window.addEventListener("keydown", this._onKeydown);
  },

  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
    window.removeEventListener("keydown", this._onKeydown);
  },
};
</script>