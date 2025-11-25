<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '../services/auth'

const router = useRouter()

const loading = ref(false)
const user = ref({
    nombre: '',
    email: '',
    password: '',
})

async function handleSubmit() {
    if (!user.value.email || !user.value.password) {
        console.log('Por favor completá email y contraseña')
        return
    }

    try {
        loading.value = true
        await register(user.value.email, user.value.password)
        console.log('Cuenta creada con éxito!')
        router.push('/home')
    } catch (error: any) {
        console.log('Error al registrar: ' + error.message)
    } finally {
        loading.value = false
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
        class="w-full h-64 md:h-full flex items-center justify-center shadow-lg md:rounded-none rounded-b-2xl md:rounded-r-2xl overflow-hidden"
        style="background-color: #0A88C4;"
        >
        </div>
    </aside>

    <main class="flex items-center justify-center p-6 md:p-16 bg-white">
      <div class="w-full max-w-md">
        <header class="mb-6">
          <h1 class="text-2xl md:text-3xl font-semibold text-gray-900">
            Crear cuenta
          </h1>
          <p class="text-sm text-gray-500 mt-2">
            Creá tu cuenta para empezar a colaborar con tu equipo.
          </p>
        </header>

        <form
        action="#"
        @submit.prevent="handleSubmit"
        class="space-y-4" aria-label="formulario de registro">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              id="name"
              type="text"
              placeholder="Nombre"
              class="mt-1 block w-full rounded-lg border border-gray-200 shadow-sm p-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300"
              v-model="user.nombre"
            />
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              placeholder="ejemplo@gmail.com"
              class="mt-1 block w-full rounded-lg border border-gray-200 shadow-sm p-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300"
              v-model="user.email"
            />
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
          </div>

          <div>
            <button
              type="submit"
              class="btn-primary w-full inline-flex items-center justify-center px-5 py-3 rounded-2xl text-white font-semibold shadow hover:bg-green-800 transition"
            >
              Crear cuenta
            </button>
          </div>
        </form>

        <p class="mt-4 text-sm text-center text-gray-600">
          ¿Ya tenés cuenta?
          <router-link
          to="/login" class="text-green-700 underline ml-1"
          >
            Iniciá sesión
          </router-link>
        </p>
      </div>
    </main>
  </section>
</template>
