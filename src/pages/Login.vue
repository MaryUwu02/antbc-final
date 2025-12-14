<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "../services/auth";

const router = useRouter();

const loading = ref(false);

const user = ref({
  email: "",
  password: "",
});

const errors = ref({
  email: "",
  password: "",
  general: "",
});


function validate() {
  errors.value.email = "";
  errors.value.password = "";
  errors.value.general = "";

  let valid = true;

  if (!user.value.email) {
    errors.value.email = "El email es obligatorio.";
    valid = false;
  } else if (!user.value.email.includes("@")) {
    errors.value.email = "Ingresá un email válido.";
    valid = false;
  }

  if (!user.value.password) {
    errors.value.password = "La contraseña es obligatoria.";
    valid = false;
  } else if (user.value.password.length < 6) {
    errors.value.password = "La contraseña debe tener al menos 6 caracteres.";
    valid = false;
  }

  return valid;
}


async function handleSubmit() {
  errors.value.general = "";

  if (!validate()) return;

  loading.value = true;

  try {
    const res = await login(user.value.email, user.value.password);
    if (res && (res.error || (!res.user && !res.data?.user))) {
      errors.value.general = "Email o contraseña incorrecta.";
      return;
    }

    router.push("/home");
  } catch (err: any) {
    const msg = (err && (err.message || err.error)) || "";
    if (
      msg.toString().toLowerCase().includes("invalid") ||
      msg.toString().toLowerCase().includes("credentials") ||
      msg.toString().toLowerCase().includes("user not found") ||
      msg.toString().toLowerCase().includes("email")
    ) {
      errors.value.general = "Email o contraseña incorrecta.";
    } else {
      errors.value.general = "No se pudo iniciar sesión. Intentá nuevamente.";
      console.error("Error al iniciar sesión:", err);
    }
  } finally {
    loading.value = false;
  }
}
</script>

<template>
<section class="min-h-screen grid grid-cols-1 md:grid-cols-2">
    <aside
    class="flex items-center justify-center md:h-screen"
    aria-hidden="true"
    >
        <div
        class="login-img w-full h-64 md:h-full flex items-center justify-center shadow-lg md:rounded-none rounded-b-2xl md:rounded-r-2xl overflow-hidden"
        >
        </div>
    </aside>

    <main class="flex items-center justify-center p-6 md:p-16 bg-white">
      <div class="w-full max-w-md">
        <header class="mb-6">
          <h1 class="text-2xl md:text-3xl font-semibold text-gray-900">
            Inicia sesión
          </h1>
          <p class="text-sm text-gray-500 mt-2">
            Iniciá sesión para empezar a colaborar con tu equipo.
          </p>
        </header>

        <form 
        action="#"
        @submit.prevent="handleSubmit"
        class="space-y-4" aria-label="formulario de inicio de sesión">

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              placeholder="ejemplo@gmail.com"
              class="mt-1 block w-full rounded-lg border border-gray-200 shadow-sm p-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300"
              v-model="user.email"
            />
            <p v-if="errors.email" class="text-red-600 text-sm mt-1">{{ errors.email }}</p>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              id="password"
              type="password"
              placeholder="Mín. 6 caracteres"
              class="mt-1 block w-full rounded-lg border border-gray-200 shadow-sm p-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300"
              v-model="user.password"
            />
            <p v-if="errors.password" class="text-red-600 text-sm mt-1">{{ errors.password }}</p>
            <p v-if="errors.general" class="text-red-600 text-sm mt-1">
              {{ errors.general }}
            </p>
          </div>

          <div>
            <button
              type="submit"
              :disabled="loading"
              class="btn-primary w-full inline-flex items-center justify-center px-5 py-3 rounded-2xl text-white font-semibold shadow hover:bg-green-800 transition disabled:opacity-50"
            >
              <span v-if="!loading">Iniciar sesión</span>
              <span v-else>Ingresando...</span>
            </button>
          </div>
        </form>

        <p class="mt-4 text-sm text-center text-gray-600">
            ¿No recordás tus datos?
          <a class="text-green-700 underline ml-1"
          >
          <router-link
        to="/register" class="mt-4 text-sm text-center">
          Registrarse
        </router-link>
          </a>
        </p>
      </div>
    </main>
  </section>
</template>