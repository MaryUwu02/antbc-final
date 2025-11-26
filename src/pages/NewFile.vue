<template>
  <section class="min-h-screen flex items-center justify-center p-6">
    <div class="bg-white rounded-2xl shadow p-6 w-full max-w-md">

      <h2 class="text-xl font-semibold text-gray-900 mb-6 text-center">
        Crear nuevo archivo / subgrupo
      </h2>

      <form @submit.prevent="createSubgroup" class="space-y-4">

        <div>
          <label class="block text-sm font-medium text-gray-700">
            Nombre
          </label>
          <input
            v-model="form.name"
            type="text"
            placeholder="Nombre del subgrupo"
            class="mt-1 block w-full rounded-lg border-gray-200 shadow-sm p-3 focus:ring-green-300"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">
            Categoría
          </label>
          <input
            v-model="form.category"
            type="text"
            placeholder="Ej: Matemática, Proyectos..."
            class="mt-1 block w-full rounded-lg border-gray-200 shadow-sm p-3 focus:ring-green-300"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">
            Imagen (opcional)
          </label>
          <input
            type="file"
            @change="handleImage"
            class="mt-2 block w-full text-sm"
            accept="image/*"
          />
        </div>

        <div class="flex justify-end gap-3 mt-4">
          <router-link
            to="/home"
            class="px-6 py-2 rounded-2xl bg-gray-200 text-gray-700 font-semibold"
          >
            Cancelar
          </router-link>

          <button
            type="submit"
            class="px-6 py-2 rounded-2xl bg-green-600 text-white font-semibold shadow hover:bg-green-700"
          >
            Crear
          </button>
        </div>

        <p v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</p>

      </form>

    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "../supabase.js";
import { useRouter } from "vue-router";

const router = useRouter();
const form = ref({
  name: "",
  category: "",
});
const imageFile = ref(null);
const error = ref("");

function handleImage(e) {
  imageFile.value = e.target.files[0];
}

async function createSubgroup() {
  try {
    error.value = "";

    let image_url = null;

    if (imageFile.value) {
      const fileName = `${Date.now()}-${imageFile.value.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("subgroup-images")
        .upload(fileName, imageFile.value);

      if (uploadError) throw uploadError;

      image_url = uploadData.path;
    }

    const { error: insertError } = await supabase
      .from("subgroups")
      .insert({
        name: form.value.name,
        category: form.value.category,
        image_url,
      });

    if (insertError) throw insertError;

    router.push("/home");

  } catch (err) {
    error.value = err.message;
  }
}
</script>
