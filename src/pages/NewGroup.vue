<template>
  <section class="min-h-screen flex items-center justify-center bg-gray-50 p-6">
    <div class="bg-white rounded-2xl shadow p-6 w-full max-w-md">
      <h2 class="text-xl font-semibold text-gray-900 mb-6 text-center">Crear nuevo grupo</h2>

      <form @submit.prevent="onCreateGroup" class="space-y-4">
        <div>
          <label for="groupName" class="block text-sm font-medium text-gray-700">Nombre del grupo</label>
          <input
            id="groupName"
            v-model="form.name"
            type="text"
            placeholder="Nombre"
            class="mt-1 block w-full rounded-lg border-gray-200 shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-green-300"
          />
        </div>

        <div>
          <label for="startDate" class="block text-sm font-medium text-gray-700">Fecha de inicio</label>
          <input
            id="startDate"
            type="date"
            :value="today"
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
            class="mt-1 block w-full rounded-lg border-gray-200 shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-green-300"
          />
        </div>

        <div class="flex justify-end gap-3 mt-4">
          <button
            type="button"
            class="px-6 py-2 rounded-2xl bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="px-6 py-2 rounded-2xl bg-green-900 text-white font-semibold shadow hover:bg-green-800 transition"
          >
            Crear grupo
          </button>
        </div>

        <p v-if="createError" class="text-red-500 text-sm mt-2">{{ createError }}</p>
      </form>
    </div>
  </section>
</template>

<script>
import { createGroup } from '../services/groups.js';

export default {
  data() {
    return {
      form: {
        name: '',
        due_date: '',
      },
      creating: false,
      createError: null,
    };
  },
  computed: {
    today() {
      const d = new Date();
      return d.toISOString().split('T')[0];
    },
  },
  methods: {
    async onCreateGroup() {
      this.createError = null;
      if (!this.form.name) return;
      this.creating = true;
      try {
        const nuevoGrupo = await createGroup(this.form.name, this.form.due_date);

        this.form.name = '';
        this.form.due_date = '';

        this.$router.push('/home');

        } catch (error) {
          this.createError = error.message;
        } finally {
          this.creating = false;
        }
      },
    },
  };
</script>
