<template>
    <BaseModal @close="close">

        <div class="bg-white rounded-2xl shadow p-6 w-full">
            <h2 class="font-['Outfit'] font-medium text-xl text-gray-900 mb-4">
                Editar grupo
            </h2>

            <form @submit.prevent="onSave" class="space-y-4">
                <div>
                <label class="block text-sm font-medium text-gray-700">
                    Nombre del grupo
                </label>

                <input
                    v-model="form.name"
                    type="text"
                    placeholder="Nombre"
                    :disabled="saving || loading"
                    class="w-full px-4 py-2 rounded-lg border border-gray-300
                    focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                </div>

                <div>
                <label class="block text-sm font-medium text-gray-700">
                    Fecha de inicio
                </label>

                <input
                    type="date"
                    :value="startDateValue"
                    readonly
                    class="w-full px-4 py-2 rounded-lg border border-gray-300
                    focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                </div>

                <div>
                <label class="block text-sm font-medium text-gray-700">
                    Finalización (opcional)
                </label>

                <input
                    type="date"
                    v-model="form.due_date"
                    :disabled="saving || loading"
                    class="w-full px-4 py-2 rounded-lg border border-gray-300
                    focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                </div>

                <div class="flex justify-end gap-3 mt-4">

                <button
                    type="button"
                    @click="close"
                    class="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
                    :disabled="saving"
                >
                    Cancelar
                </button>

                <button
                    type="submit"
                    class="px-5 py-2 rounded-lg btn-primary text-white
                    font-semibold transition"
                    :disabled="saving || loading"
                >
                    <span v-if="!saving">Guardar cambios</span>
                    <span v-else>Guardando…</span>
                </button>

                </div>

                <p v-if="saveError" class="text-red-500 text-sm mt-2">
                {{ saveError }}
                </p>
            </form>
        </div>

    </BaseModal>
</template>

<script>
import BaseModal from "./BaseModal.vue";
import { fetchGroupById, updateGroup } from "../services/groups.js";

export default {
    name: "EditGroupModal",

    components: {
        BaseModal
    },

    props: {
        groupId: {
        type: [String, Number],
        required: true
        }
    },

    emits: ["close", "updated"],

    data() {
        return {
        form: {
            name: "",
            due_date: ""
        },
        original: null,
        loading: true,
        saving: false,
        saveError: null,
        };
    },

    computed: {
        startDateValue() {
        const date = this.original?.created_at || this.original?.startDate;

        if (!date) return "";

        return new Date(date).toISOString().split("T")[0];
        }
    },

    methods: {
        close() {
        this.$emit("close");
        },

        async load() {
        this.loading = true;

        try {
            const group = await fetchGroupById(this.groupId);

            this.original = group;
            this.form.name = group.name || "";
            this.form.due_date = group.due_date
            ? new Date(group.due_date).toISOString().split("T")[0]
            : "";

        } catch {
            this.saveError = "No se pudieron cargar los datos.";

        } finally {
            this.loading = false;
        }
        },

        async onSave() {
        this.saveError = null;

        if (!this.form.name) {
            this.saveError = "El nombre es obligatorio.";
            return;
        }

        this.saving = true;

        try {
            await updateGroup(this.groupId, {
            name: this.form.name,
            due_date: this.form.due_date || null,
            });

            this.$emit("updated");
            this.close();

        } catch (err) {
            this.saveError = err?.message || "No se pudo guardar el grupo.";

        } finally {
            this.saving = false;
        }
        },
    },

    mounted() {
        this.load();
    }
};
</script>