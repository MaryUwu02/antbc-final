<template>
    <div>
        <aside
        :class="[
            'hidden md:flex md:flex-col md:h-screen md:sticky md:top-0 p-4 transition-all duration-300',
            collapsed ? 'md:w-20' : 'md:w-64'
        ]"
        style="background-color: #140E0C;"
        aria-label="Barra de navegación"
        >
        <div class="flex items-center gap-2 pt-3">
            <img 
            src="../../assets/imgs/logo-2.png" 
            alt="AntBC logo" 
            class="object-contain transition-all duration-300"
            :class="collapsed ? 'w-10 h-10' : 'w-20 h-20'"
            />
        </div>

        <ul class="flex-1 space-y-1 mt-6">
            <li v-for="link in navLinks" :key="link.name">
            <router-link 
                :to="link.path" 
                class="group flex items-center gap-3 px-3 py-2 rounded-lg text-white"
            >
                <i :class="link.icon + ' w-5 h-5'"></i>
                <span v-if="!collapsed" class="text-white/80 group-hover:text-white transition">
                {{ link.name }}
                </span>
            </router-link>
            </li>
        </ul>

        <div class="mt-auto space-y-2">
            <router-link
                to="/"
                @click.prevent="logout"
                class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-white"
                >
                <i class="fa-solid fa-arrow-right-from-bracket w-5 h-5"></i>
                <span v-if="!collapsed" class="text-white/80 group-hover:text-white transition">Cerrar sesión</span>
            </router-link>
            
            <router-link 
                to="/settings"
                class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-white"
                >
                <i class="fa-solid fa-gear w-5 h-5"></i>
                <span v-if="!collapsed" class="text-white/80 group-hover:text-white transition">Configuración</span>
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
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { supabase } from '../../services/supabase.js'

const router = useRouter()
const route = useRoute()

const collapsed = ref(false)
const active = ref('home')

async function logout() {
    await supabase.auth.signOut()
    router.push('/login')
}

function setActive(name) {
    active.value = name
}

const navLinks = [
    { name: 'Inicio', path: '/home', icon: 'fa-solid fa-house' },
    { name: 'Notificaciones', path: '/notifications', icon: 'fa-regular fa-bell' },
    { name: 'Mensajes', path: '/allchats', icon: 'fa-regular fa-comments' },
    { name: 'Papelera', path: '/trash', icon: 'fa-regular fa-trash-can' },
    { name: 'Archivar', path: '/archived', icon: 'fa-regular fa-folder' },
]

watch(
    () => route.path,
    (newPath) => {
        collapsed.value = newPath.startsWith('/group/')
    },
    { immediate: true }
)
</script>