<template>
    <div>
        <nav
            :class="[
                'hidden md:flex md:flex-col md:h-screen md:sticky md:top-0 p-4 transition-all duration-300 border-r border-black/10',
                collapsed ? 'md:w-20' : 'md:w-64'
            ]"
            style="background-color: #F9FAFE;"
            aria-label="Sidebar navigation"
            >
            <div class="flex items-center justify-center py-4">
                <img
                src="../../assets/imgs/logo-2.png"
                alt="AntBC logo"
                class="object-contain transition-all duration-300"
                :class="collapsed ? 'w-10 h-10' : 'w-20 h-20'"
                />
            </div>

            <ul class="flex-1 mt-8 space-y-2">
                <li
                v-for="link in topLinks"
                :key="link.name"
                class="relative group"
                >

                <router-link
                    v-if="link.path"
                    :to="link.path"
                    class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200"
                    :class="getLinkClasses(link)"
                >
                    <i :class="[link.icon, 'w-5 h-5 text-center']"></i>

                    <span
                    v-if="!collapsed"
                    class="font-medium whitespace-nowrap"
                    >
                    {{ link.name }}
                    </span>
                </router-link>

                <button
                    v-else-if="link.action"
                    @click="link.action"
                    class="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200"
                    :class="getLinkClasses(link)"
                >
                    <i :class="[link.icon, 'w-5 h-5 text-center']"></i>

                    <span
                    v-if="!collapsed"
                    class="font-medium whitespace-nowrap"
                    >
                    {{ link.name }}
                    </span>
                </button>

                <div
                    v-if="collapsed"
                    class="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 rounded-lg bg-black text-white text-sm opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 whitespace-nowrap z-50"
                >
                    {{ link.name }}
                </div>
                </li>
            </ul>

            <ul class="pt-4 border-t border-black/10 space-y-2">
                <li
                v-for="link in bottomLinks"
                :key="link.name"
                class="relative group"
                >
                <router-link
                    v-if="link.path"
                    :to="link.path"
                    class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200"
                    :class="getLinkClasses(link)"
                >
                    <i :class="[link.icon, 'w-5 h-5 text-center']"></i>

                    <span
                    v-if="!collapsed"
                    class="font-medium whitespace-nowrap"
                    >
                    {{ link.name }}
                    </span>
                </router-link>

                <button
                    v-else-if="link.action"
                    @click="link.action"
                    class="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200"
                    :class="getLinkClasses(link)"
                >
                    <i :class="[link.icon, 'w-5 h-5 text-center']"></i>

                    <span
                    v-if="!collapsed"
                    class="font-medium whitespace-nowrap"
                    >
                    {{ link.name }}
                    </span>
                </button>

                <div
                    v-if="collapsed"
                    class="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 rounded-lg bg-black text-white text-sm opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 whitespace-nowrap z-50"
                >
                    {{ link.name }}
                </div>
                </li>
            </ul>
        </nav>

        <nav
        class="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-black/10"
        style="background-color: #EEEDF3;"
        >
        <ul class="flex items-center justify-around py-2">
            <li v-for="link in mobileLinks" :key="link.name">
            <router-link
                :to="link.path"
                class="flex items-center justify-center p-3 rounded-xl transition-all duration-200"
                :class="
                isActive(link.path)
                    ? 'bg-black text-white'
                    : 'text-black/60'
                "
            >
                <i :class="[link.icon, 'text-xl']"></i>
            </router-link>
            </li>
        </ul>
        </nav>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { supabase } from '../../services/supabase.js'

const router = useRouter()
const route = useRoute()

async function logout() {
    await supabase.auth.signOut()
    router.push('/login')
}

const navLinks = [
    { section: 'main', name: 'Inicio', path: '/home', icon: 'fa-solid fa-house'},
    { section: 'main', name: 'Notificaciones', path: '/notifications', icon: 'fa-regular fa-bell' },
    { section: 'main', name: 'Mensajes', path: '/allchats', icon: 'fa-regular fa-comments' },
    { section: 'main', name: 'Papelera', path: '/trash', icon: 'fa-regular fa-trash-can' },
    { section: 'main', name: 'Archivados', path: '/archived', icon: 'fa-regular fa-folder' },
    { section: 'bottom', name: 'Configuración', path: '/settings', icon: 'fa-solid fa-gear' },
    { section: 'bottom', name: 'Cerrar sesión', icon: 'fa-solid fa-arrow-right-from-bracket', action: logout, danger: true }
]

const topLinks = computed(() =>
    navLinks.filter(link => link.section === 'main')
)

const bottomLinks = computed(() =>
    navLinks.filter(link => link.section === 'bottom')
)

const mobileLinks = computed(() =>
    navLinks.filter(
        link =>
        link.section === 'main' &&
        ['Inicio', 'Notificaciones', 'Mensajes'].includes(link.name)
    )
)

const collapsed = computed(() => {
    return (
        route.path.startsWith('/group/') ||
        route.path === '/allchats' ||
        route.path === '/followupmembers'
    )
})

function isActive(path) {
    return route.path.startsWith(path)
    }

    function getLinkClasses(link) {
        if (link.danger) {
            return 'text-red-500 hover:bg-red-500/10'
    }

    return isActive(link.path)
        ? 'bg-black text-white shadow-md'
        : 'text-black/70 hover:bg-black/5 hover:text-black'
}
</script>