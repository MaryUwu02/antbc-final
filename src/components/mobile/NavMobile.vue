<template>
    <aside
        class="hidden md:flex md:flex-col md:w-64 md:h-screen md:sticky md:top-0 p-4"
        style="background-color: #140E0C;"
        aria-label="Barra de navegación"
    >
        <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 flex items-center justify-center text-white font-bold">LOGO</div>
            <div class="text-lg font-semibold text-white hidden">AntBC</div>
        </div>

        <ul class="flex-1 space-y-1">
            <li>
                <router-link to="/home" class="group flex items-center gap-3 px-3 py-2 rounded-lg text-white">
                    <i class="fa-solid fa-house w-5 h-5"></i>
                    <span class="text-white/80 group-hover:text-white">Inicio</span>
                </router-link>
            </li>

            <li>
                <router-link to="/notifications" class="group flex items-center gap-3 px-3 py-2 rounded-lg text-white">
                    <i class="fa-regular fa-bell w-5 h-5"></i>
                    <span class="text-white/80 group-hover:text-white">Notificaciones</span>
                </router-link>
            </li>

            <li>
                <router-link to="/allchats" class="group flex items-center gap-3 px-3 py-2 rounded-lg text-white">
                    <i class="fa-regular fa-comments w-5 h-5"></i>
                    <span class="text-white/80 group-hover:text-white">Mensajes</span>
                </router-link>
            </li>

            <li>
                <router-link to="/trash" class="group flex items-center gap-3 px-3 py-2 rounded-lg text-white">
                    <i class="fa-regular fa-trash-can w-5 h-5"></i>
                    <span class="text-white/80 group-hover:text-white">Papelera</span>
                </router-link>
            </li>

            <li>
                <router-link to="/archived" class="group flex items-center gap-3 px-3 py-2 rounded-lg text-white">
                    <i class="fa-regular fa-folder w-5 h-5"></i>
                    <span class="text-white/80 group-hover:text-white">Archivar</span>
                </router-link>
            </li>
        </ul>

        <div class="mt-auto space-y-2">
            <router-link
                to="/"
                @click.prevent="logout"
                class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-white"
                aria-label="Cerrar sesión"
                >
                <i class="fa-solid fa-arrow-right-from-bracket w-5 h-5"></i>
                <span class="text-white/80 group-hover:text-white">Cerrar sesión</span>
            </router-link>
            
            <router-link 
                to="/settings"
                class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-white"
                aria-label="Configuración"
            >
                <i class="fa-solid fa-gear w-5 h-5"></i>
                <span class="text-white/80 group-hover:text-white">Configuración</span>
            </router-link>
        </div>
    </aside>

    <nav
    class="flex md:hidden fixed bottom-0 left-0 right-0 items-center justify-around py-2 z-40"
    style="background-color: #140E0C;"
    >
        <button @click="setActive('home')" class="p-2" aria-label="Inicio">
            <i
            class="fa-solid fa-house text-white w-6 h-6 transition "
            :class="{ 'text-white/80': active !== 'home' }"
            ></i>
        </button>

        <button @click="setActive('notifications')" class="p-2" aria-label="Notificaciones">
            <i
            class="fa-regular fa-bell text-white w-6 h-6 transition"
            :class="{ 'text-white/80': active !== 'notifications' }"
            ></i>
        </button>

        <button @click="setActive('messages')" class="p-2" aria-label="Mensajes">
            <i
            class="fa-regular fa-comments text-white w-6 h-6 transition"
            :class="{ 'text-white/80': active !== 'messages' }"
            ></i>
        </button>
    </nav>
</template>

<script setup>
import { supabase } from '../../services/supabase.js'
import { useRouter } from 'vue-router'

const router = useRouter()

async function logout() {
    await supabase.auth.signOut()
    router.push('/login')
}
</script>