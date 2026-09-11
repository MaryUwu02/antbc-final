<template>
  <div>
    <nav
      :class="[
        'hidden md:flex md:flex-col md:h-screen md:sticky md:top-0 py-4 transition-all duration-300 border-r border-black/10 dark:border-gray-800 bg-white dark:bg-gray-900 z-40',
        collapsed ? 'md:w-20 px-2' : 'md:w-64 px-4'
      ]"
      aria-label="Sidebar navigation"
    >
      <div class="flex items-center transition-all duration-300" :class="collapsed ? 'flex-col justify-center gap-4' : 'justify-between px-2'">
        <img
          :src="collapsed ? logoIcon : logoFull"
          alt="AntBC logo"
          class="object-contain transition-all duration-300 dark:brightness-0 dark:invert"
          :class="collapsed ? 'w-10 h-10' : 'h-14 w-auto max-w-[180px]'"
        />
        <button @click="collapsed = !collapsed" class="p-2 rounded-full hover:bg-black/5 dark:hover:bg-gray-800 transition-colors">
          <i class="fa-solid fa-bars text-xl text-black/70 dark:text-gray-300"></i>
        </button>
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
            class="nav-item flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-200"
            :class="[getLinkTextClasses(link), collapsed ? 'justify-center px-0' : '']"
          >
            <span class="nav-bg"></span>
            <i :class="[getIcon(link), 'w-5 h-5 text-center relative z-10']"></i>
            <span
              v-if="!collapsed"
              class="font-medium whitespace-nowrap relative z-10"
            >
              {{ link.name }}
            </span>
          </router-link>

          <div
            v-if="collapsed"
            class="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 rounded-lg bg-black dark:bg-gray-800 text-white text-sm opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 whitespace-nowrap z-50 shadow-md"
          >
            {{ link.name }}
          </div>
        </li>
      </ul>

      <ul class="pt-4 border-t border-black/10 dark:border-gray-800 space-y-2">
        <li
          v-for="link in bottomLinks"
          :key="link.name"
          class="relative group"
        >
          <router-link
            v-if="link.path"
            :to="link.path"
            class="nav-item flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-200"
            :class="[getLinkTextClasses(link), collapsed ? 'justify-center px-0' : '']"
          >
            <span class="nav-bg"></span>
            <i :class="[getIcon(link), 'w-5 h-5 text-center relative z-10']"></i>
            <span
              v-if="!collapsed"
              class="font-medium whitespace-nowrap relative z-10"
            >
              {{ link.name }}
            </span>
          </router-link>

          <button
            v-else-if="link.action"
            @click="link.action"
            class="nav-item w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-200"
            :class="[getLinkTextClasses(link), collapsed ? 'justify-center px-0' : '']"
          >
            <span class="nav-bg"></span>
            <i :class="[getIcon(link), 'w-5 h-5 text-center relative z-10']"></i>
            <span
              v-if="!collapsed"
              class="font-medium whitespace-nowrap relative z-10"
            >
              {{ link.name }}
            </span>
          </button>
          
          <div
            v-if="collapsed"
            class="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 rounded-lg bg-black dark:bg-gray-800 text-white text-sm opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 whitespace-nowrap z-50 shadow-md"
          >
            {{ link.name }}
          </div>
        </li>
      </ul>
    </nav>

    <nav class="md:hidden fixed top-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 border-b border-black/10 dark:border-gray-800 flex items-center justify-between px-4 py-3 h-16 transition-colors">
      <div class="flex items-center gap-3">
        <img 
          :src="userMenuOpen ? logoFull : logoIcon" 
          alt="Logo" 
          class="object-contain transition-all duration-300 dark:brightness-0 dark:invert" 
          :class="userMenuOpen ? 'h-10 w-auto max-w-[150px]' : 'h-8 w-auto'"
        />
      </div>

      <div class="relative">
        <button @click="userMenuOpen = !userMenuOpen" class="p-1.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors border border-black/5 dark:border-gray-700">
          <i class="fa-solid fa-user text-lg text-black/70 dark:text-gray-200 w-7 h-7 flex items-center justify-center"></i>
        </button>

        <transition name="dropdown">
          <div
            v-if="userMenuOpen"
            class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-black/10 dark:border-gray-800 overflow-hidden z-50 origin-top-right transition-colors"
          >
            <router-link 
              to="/notifications" 
              @click="userMenuOpen = false" 
              class="block w-full text-left px-4 py-3 text-sm font-medium text-black/70 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-sky-950/30 dark:hover:text-sky-400 transition-colors border-b border-black/5 dark:border-gray-800"
            >
              <i class="fa-regular fa-bell w-5"></i> Notificaciones
            </router-link>
            <router-link 
              to="/settings" 
              @click="userMenuOpen = false" 
              class="block w-full text-left px-4 py-3 text-sm font-medium text-black/70 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-sky-950/30 dark:hover:text-sky-400 transition-colors"
            >
              <i class="fa-solid fa-gear w-5"></i> Configuración
            </router-link>
            <button 
              @click="openLogoutModal" 
              class="block w-full text-left px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors border-t border-black/5 dark:border-gray-800"
            >
              <i class="fa-solid fa-arrow-right-from-bracket w-5"></i> Cerrar sesión
            </button>
          </div>
        </transition>
      </div>
    </nav>

    <nav class="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-black/10 dark:border-gray-800 bg-white dark:bg-gray-900 pb-safe transition-colors">
      <ul class="flex items-center justify-around py-1">
        <li v-for="link in mobileLinks" :key="link.name" class="flex-1">
          <router-link
            :to="link.path"
            class="nav-item flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 mx-0.5"
            :class="getLinkTextClasses(link)"
          >
            <span class="nav-bg"></span>
            <i :class="[getIcon(link), 'text-lg mb-1 relative z-10']"></i>
            <span class="text-[9px] font-medium relative z-10 leading-tight text-center">{{ link.name }}</span>
          </router-link>
        </li>
      </ul>
    </nav>

    <transition name="modal-fade-slide">
      <div 
        v-if="showLogoutModal"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4"
      >
        <div 
          class="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
          @click="showLogoutModal = false"
        ></div>
        
        <div class="modal-card relative bg-white dark:bg-gray-800 rounded-[1.5rem] p-6 md:p-8 max-w-sm w-full shadow-2xl transition-colors">
          <div class="text-center md:text-left">
            <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3">
              ¿Estás seguro de que quieres cerrar sesión?
            </h2>
            <p class="text-gray-500 dark:text-gray-300 text-sm md:text-base mb-8">
              Puedes volver cuando quieras iniciando sesión con tu cuenta sin ningún problema.
            </p>
          </div>
          
          <div class="flex flex-col md:flex-row justify-end gap-3">
            <button 
              @click="showLogoutModal = false" 
              class="w-full md:w-auto px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold transition-colors"
            >
              Cancelar
            </button>
            <button 
              @click="confirmLogout" 
              class="w-full md:w-auto px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors shadow-lg shadow-red-500/30"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import logoIcon from '../../assets/imgs/logo-1-negro.png'
import logoFull from '../../assets/imgs/logo-2-negro.png'

const router = useRouter()
const route = useRoute()

const collapsed = ref(false)
const userMenuOpen = ref(false)
const showLogoutModal = ref(false)

const closeDropdown = (e) => {
  if (userMenuOpen.value && !e.target.closest('.relative')) {
    userMenuOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeDropdown)
})
onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
})

function openLogoutModal() {
  userMenuOpen.value = false
  showLogoutModal.value = true
}

async function confirmLogout() {
  showLogoutModal.value = false
  router.push('/login')
}

const navLinks = [
  { section: 'main', name: 'Inicio', path: '/home', icon: 'fa-solid fa-house', activeIcon: 'fa-solid fa-house-chimney' },
  { section: 'main', name: 'Notificaciones', path: '/notifications', icon: 'fa-regular fa-bell', activeIcon: 'fa-solid fa-bell' },
  { section: 'main', name: 'Mensajes', path: '/allchats', icon: 'fa-regular fa-comments', activeIcon: 'fa-solid fa-comments' },
  { section: 'main', name: 'Archivados', path: '/archived', icon: 'fa-regular fa-folder', activeIcon: 'fa-solid fa-folder-open' },
  { section: 'main', name: 'Papelera', path: '/trash', icon: 'fa-regular fa-trash-can', activeIcon: 'fa-solid fa-trash-can' },
  { section: 'bottom', name: 'Configuración', path: '/settings', icon: 'fa-solid fa-gear', activeIcon: 'fa-solid fa-gear' },
  { section: 'bottom', name: 'Cerrar sesión', icon: 'fa-solid fa-arrow-right-from-bracket', activeIcon: 'fa-solid fa-arrow-right-from-bracket', action: openLogoutModal, danger: true }
]

const topLinks = computed(() => navLinks.filter(link => link.section === 'main'))
const bottomLinks = computed(() => navLinks.filter(link => link.section === 'bottom'))

const mobileLinks = computed(() =>
  navLinks.filter(
    link => link.section === 'main' && ['Inicio', 'Mensajes', 'Archivados', 'Papelera'].includes(link.name)
  )
)

function isActive(path) {
  if (!path) return false
  return route.path.startsWith(path)
}

function getLinkTextClasses(link) {
  if (link.danger) {
    return 'text-red-500 hover:text-red-600'
  }
  return isActive(link.path)
    ? 'text-orange-600 dark:text-sky-400 font-semibold' 
    : 'text-black/60 dark:text-gray-400 hover:text-black dark:hover:text-sky-300'
}

function getIcon(link) {
  return isActive(link.path) && link.activeIcon ? link.activeIcon : link.icon
}
</script>

<style>
.nav-item {
  position: relative;
  overflow: hidden;
}

.nav-item .nav-bg {
  position: absolute;
  inset: 0;
  background-color: #ffecd6;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: inherit;
  z-index: 0;
}

.dark .nav-item .nav-bg {
  background-color: rgba(14, 165, 233, 0.2);
}

.nav-item:not(.text-red-500):hover .nav-bg {
  transform: scaleX(1);
  opacity: 0.5;
}

.router-link-active .nav-bg,
.router-link-exact-active .nav-bg {
  transform: scaleX(1);
  opacity: 1;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(-10px);
}

.modal-fade-slide-enter-active {
  transition: opacity 0.3s ease;
}
.modal-fade-slide-enter-active .modal-card {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.modal-fade-slide-leave-active {
  transition: opacity 0.2s ease;
}
.modal-fade-slide-leave-active .modal-card {
  transition: transform 0.2s ease;
}
.modal-fade-slide-enter-from,
.modal-fade-slide-leave-to {
  opacity: 0;
}
.modal-fade-slide-enter-from .modal-card,
.modal-fade-slide-leave-to .modal-card {
  transform: translateY(40px);
}

@supports (padding-bottom: env(safe-area-inset-bottom)) {
  .pb-safe {
    padding-bottom: env(safe-area-inset-bottom);
  }
}
</style>