<template>
    <div class="flex min-h-screen bg-gray-50">
        <NavMobile />

        <main class="flex-1 p-6 max-w-5xl mx-auto w-full">
            
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Configuración</h2>

            <section class="bg-white rounded-2xl shadow p-6 mb-6">
                <h3 class="text-lg font-semibold text-gray-800 mb-4">Perfil</h3>

                <div class="flex items-center gap-6">
                    <div
                    class="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-2xl font-semibold">
                        U
                    </div>

                    <div class="flex-1">
                        <p class="font-medium text-gray-900">Usuario</p>
                        <p class="text-sm text-gray-500">usuario@gmail.com</p>

                        <button
                        class="mt-3 px-4 py-2 text-sm rounded-lg bg-gray-100 hover:bg-gray-200 transition"
                        >
                        Editar perfil
                        </button>
                    </div>
                </div>
            </section>

            <section class="bg-white rounded-2xl shadow p-6 mb-6">
                <h3 class="text-lg font-semibold text-gray-800 mb-4">Seguridad</h3>

                <div class="space-y-3">
                    <button
                    class="w-full text-left px-4 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
                    >
                    Cambiar contraseña
                    </button>
                </div>
            </section>

            <section class="bg-white rounded-2xl shadow p-6 mb-6">
                <h3 class="text-lg font-semibold text-gray-800 mb-4">Información legal</h3>

                <div class="space-y-3 text-sm text-gray-600">
                    <p class="cursor-pointer hover:text-gray-800 transition">
                        Términos y condiciones
                    </p>
                    <p class="cursor-pointer hover:text-gray-800 transition">
                        Política de privacidad
                    </p>
                    <p class="cursor-pointer hover:text-gray-800 transition">
                        Licencias
                    </p>
                </div>
            </section>

            <section class="bg-white rounded-2xl shadow p-6">
                <router-link
                to="/"
                @click.prevent="logout"
                class="w-full py-3 rounded-xl text-red-600 font-semibold hover:bg-red-50 transition"
                >
                Cerrar sesión
                </router-link>
            </section>
        </main>
    </div>
</template>

<script setup>
import NavMobile from '../../components/mobile/NavMobile.vue';

async function logout() {
    await supabase.auth.signOut()
    router.push('/login')
}

</script>
