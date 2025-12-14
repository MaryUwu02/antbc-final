<template>
  <section class="min-h-screen grid grid-cols-1 md:grid-cols-2">
    <aside
      class="flex items-center justify-center md:h-screen"
      aria-hidden="true"
    >
      <div
        class="img-register w-full h-64 md:h-full flex items-center justify-center shadow-lg
        md:rounded-none rounded-b-2xl md:rounded-r-2xl overflow-hidden"
      >
      </div>
    </aside>

    <main class="flex items-center justify-center p-6 md:p-16 bg-white">
      <div class="w-full max-w-md">
        <div class="mb-6">
          <h1 class="text-2xl md:text-3xl font-semibold text-gray-900">
            Crear cuenta
          </h1>
          <p class="text-sm text-gray-500 mt-2">
            Creá tu cuenta para empezar a colaborar con tu equipo.
          </p>
        </div>

        <form
          @submit.prevent="handleSubmit"
          class="space-y-4"
          aria-label="formulario de registro"
        >
          <div>
            <label class="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              placeholder="Nombre"
              v-model="user.nombre"
              class="mt-1 block w-full rounded-lg border border-gray-200 shadow-sm p-3
              placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
            <p v-if="errors.nombre" class="text-red-600 text-sm mt-1">
              {{ errors.nombre }}
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="ejemplo@gmail.com"
              v-model="user.email"
              class="mt-1 block w-full rounded-lg border border-gray-200 shadow-sm p-3
              placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
            <p v-if="errors.email" class="text-red-600 text-sm mt-1">
              {{ errors.email }}
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="Mín. 6 caracteres"
              v-model="user.password"
              class="mt-1 block w-full rounded-lg border border-gray-200 shadow-sm p-3
              placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
            <p v-if="errors.password" class="text-red-600 text-sm mt-1">
              {{ errors.password }}
            </p>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full inline-flex items-center justify-center px-5 py-3
            rounded-2xl text-white font-semibold shadow
            bg-green-700 hover:bg-green-800 transition
            disabled:opacity-50"
          >
            Crear cuenta
          </button>
        </form>

        <p
          v-if="errors.general"
          class="text-red-600 text-sm text-center mt-4"
        >
          {{ errors.general }}
        </p>

        <p class="mt-4 text-sm text-center text-gray-600">
          ¿Ya tenés cuenta?
          <router-link to="/login" class="text-green-700 underline ml-1">
            Iniciá sesión
          </router-link>
        </p>
      </div>
    </main>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { register } from "../services/auth";

const router = useRouter();
const loading = ref(false);

const user = ref({
  nombre: "",
  email: "",
  password: "",
});

const errors = ref({
  nombre: "",
  email: "",
  password: "",
  general: "",
});

function validate() {
  errors.value = {
    nombre: "",
    email: "",
    password: "",
    general: "",
  };

  let valid = true;

  if (!user.value.nombre) {
    errors.value.nombre = "El nombre es obligatorio.";
    valid = false;
  }

  if (!user.value.email.includes("@")) {
    errors.value.email = "Ingresá un email válido.";
    valid = false;
  }

  if (!user.value.password) {
    errors.value.password = "La contraseña es obligatoria.";
    valid = false;
  } else if (user.value.password.length < 6) {
    errors.value.password = "Debe tener al menos 6 caracteres.";
    valid = false;
  }

  return valid;
}

async function handleSubmit() {
  if (!validate()) return;

  try {
    loading.value = true;

    await register(
      user.value.email,
      user.value.password,
      { full_name: user.value.nombre }
    );

    router.push("/home");
  } catch (error) {
    if (error?.message?.includes("User already registered")) {
      errors.value.email = "Este usuario ya está registrado.";
    } else {
      errors.value.general = "No se pudo registrar. Intentá nuevamente.";
    }
  } finally {
    loading.value = false;
  }
}
</script>