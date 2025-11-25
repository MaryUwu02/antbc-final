<template>
    <section class="img-fondo min-h-screen flex items-center justify-center p-6">
        <div class="bg-white rounded-2xl shadow p-6 w-full max-w-md">
            <h2 class="text-xl font-semibold text-gray-900 mb-6 text-center">
                Editar grupo
            </h2>

            <form @submit.prevent="onSave" class="space-y-4">
                <div>
                    <label for="groupName" class="block text-sm font-medium text-gray-700">Nombre del grupo</label>
                    <input
                        id="groupName"
                        v-model="form.name"
                        type="text"
                        placeholder="Nombre"
                        :disabled="saving || loading"
                        class="mt-1 block w-full rounded-lg border-gray-200 shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-green-300"
                    />
                </div>

                <div>
                    <label for="startDate" class="block text-sm font-medium text-gray-700">Fecha de inicio</label>
                    <input
                        id="startDate"
                        type="date"
                        :value="startDateValue"
                        class="mt-1 block w-full rounded-lg border-gray-200 shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                        readonly
                    />
                </div>

                <div>
                    <label for="endDate" class="block text-sm font-medium text-gray-700">Finalización (opcional)</label>
                    <input
                        id="endDate"
                        type="date"
                        v-model="form.due_date"
                        :disabled="saving || loading"
                        class="mt-1 block w-full rounded-lg border-gray-200 shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                    />
                </div>

                <div class="flex justify-end gap-3 mt-4">
                    <button
                        type="button"
                        @click="onCancel"
                        class="px-6 py-2 rounded-2xl bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
                        :disabled="saving"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        class="px-6 py-2 rounded-2xl  btn-primary text-white font-semibold shadow transition"
                        :disabled="saving || loading"
                    >
                        <span v-if="!saving">Guardar cambios</span>
                        <span v-else>Guardando…</span>
                    </button>
                </div>

                <p v-if="saveError" class="text-red-500 text-sm mt-2">{{ saveError }}</p>
            </form>
        </div>
    </section>
</template>

<script>
import { fetchGroupById, updateGroup } from "../../services/groups.js";

export default {
    name: "GroupEdit",
    props: {
        id: {
            type: String,
            required: false
        },
    },
    data() {
        return {
        form: { name: "", due_date: "" },
        original: null,
        loading: true,
        saving: false,
        saveError: null,
        };
    },
    computed: {
        startDateValue() {
        const date = this.original?.created_at || this.original?.startDate || null;
        if (!date) {
            const d = new Date();
            return d.toISOString().split("T")[0];
        }
        try {
            return new Date(date).toISOString().split("T")[0];
        } catch {
            return "";
        }
        },
        groupId() {
        return this.original ? (this.original.group_id || this.original.id) : (this.id || null);
        },
    },
    methods: {
        async load() {
        this.loading = true;
        this.saveError = null;
        try {
            const id = this.id || this.$route?.params?.id;
            if (!id) {
            this.saveError = "ID de grupo faltante.";
            return;
            }
            const group = await fetchGroupById(id);
            if (!group) {
            this.saveError = "Grupo no encontrado.";
            return;
            }
            this.original = group;
            this.form.name = group.name || "";
            this.form.due_date = group.due_date || "";
        } catch (err) {
            console.error("Error cargando grupo:", err);
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
        const id = this.groupId || this.id || this.$route?.params?.id;
        if (!id) {
            this.saveError = "ID del grupo faltante.";
            return;
        }

        this.saving = true;
        try {
            await updateGroup(id, {
            name: this.form.name,
            due_date: this.form.due_date || null,
            });
            this.$router.push({ name: "Home" });
        } catch (err) {
            console.error("Error guardando:", err);
            this.saveError = err?.message || "No se pudo guardar el grupo.";
        } finally {
            this.saving = false;
        }
        },
        onCancel() {
        this.$router.back();
        },
    },
    mounted() {
        this.load();
    },
};
</script>