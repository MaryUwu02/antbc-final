<template>
  <div class="relative min-h-screen bg-white">
    <Navbar class="absolute top-0 left-0 w-full z-50" />

    <section class="min-h-screen grid grid-cols-1 md:grid-cols-2 pt-16 md:pt-0">
      
      <aside
        class="flex items-center justify-center w-full h-64 md:h-screen animate-slide-right order-1 md:order-none"
        aria-hidden="true"
      >
        <div
          class="img-register w-full h-full flex items-center justify-center shadow-lg rounded-b-3xl md:rounded-b-none md:rounded-r-[3rem] overflow-hidden"
        >
        </div>
      </aside>

      <main class="flex items-center justify-center p-6 md:p-16 bg-white order-2 md:order-none">
        <div class="w-full max-w-md">
          
          <header class="mb-6 animate-fade-up-1">
            <h1 class="text-2xl md:text-3xl font-semibold text-gray-900">
              Crear cuenta
            </h1>
            <p class="text-sm text-gray-500 mt-2">
              Creá tu cuenta para empezar a colaborar con tu equipo.
            </p>
          </header>

          <form
            @submit.prevent="handleSubmit"
            class="space-y-4 animate-fade-up-2"
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
                class="mt-1 block w-full rounded-lg border border-gray-200 shadow-sm p-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300"
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
                class="mt-1 block w-full rounded-lg border border-gray-200 shadow-sm p-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
              <p v-if="errors.email" class="text-red-600 text-sm mt-1">
                {{ errors.email }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div class="relative mt-1">
                <input
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Mín. 6 caracteres"
                  v-model="user.password"
                  class="block w-full rounded-lg border border-gray-200 shadow-sm p-3 pr-10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300"
                />
                <button 
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition focus:outline-none"
                  aria-label="Mostrar u ocultar contraseña"
                >
                  <i :class="showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
                </button>
              </div>
              <p v-if="errors.password" class="text-red-600 text-sm mt-1">
                {{ errors.password }}
              </p>
            </div>

            <div class="pt-2">
              <button
                type="submit"
                :disabled="loading"
                class="w-full inline-flex items-center justify-center px-5 py-3 rounded-2xl text-white font-semibold shadow bg-green-700 hover:bg-green-800 transition disabled:opacity-50"
              >
                <span v-if="!loading">Crear cuenta</span>
                <span v-else>Creando...</span>
              </button>
            </div>
          </form>

          <div class="animate-fade-up-3">
            <p v-if="errors.general" class="text-red-600 text-sm text-center mt-4">
              {{ errors.general }}
            </p>

            <p class="mt-6 text-sm text-center text-gray-600">
              ¿Ya tenés cuenta?
              <router-link to="/login" class="text-green-700 font-medium underline ml-1 hover:text-green-800 transition">
                Iniciá sesión
              </router-link>
            </p>
          </div>
          
        </div>
      </main>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { register } from "../services/auth";
import Navbar from "../components/landing/Navbar.vue";

const router = useRouter();
const loading = ref(false);
const showPassword = ref(false);

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
      user.value.nombre
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

<style>
.img-register {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

@keyframes slideRight {
  0% {
    opacity: 0;
    transform: translateX(-60px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-right {
  animation: slideRight 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
}

.animate-fade-up-1 {
  opacity: 0;
  animation: fadeUp 0.7s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
  animation-delay: 0.2s;
}

.animate-fade-up-2 {
  opacity: 0;
  animation: fadeUp 0.7s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
  animation-delay: 0.4s;
}

.animate-fade-up-3 {
  opacity: 0;
  animation: fadeUp 0.7s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
  animation-delay: 0.55s;
}
</style>