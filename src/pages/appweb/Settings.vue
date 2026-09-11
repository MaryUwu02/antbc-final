<template>
  <div class="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 relative">
    <NavMobile />
    <main class="flex-1 p-6 pt-20 pb-24 md:pt-6 md:pb-6 max-w-5xl mx-auto w-full">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Configuración</h2>

      <section class="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 mb-6 transition-colors duration-300">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Perfil</h3>

        <div class="flex items-center gap-6">
          <div class="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-300 text-2xl font-semibold uppercase">
            {{ userInitial }}
          </div>

          <div class="flex-1">
            <p class="font-medium text-gray-900 dark:text-white">{{ userName }}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ userEmail }}</p>

            <button 
              @click="openEditProfileModal"
              class="mt-3 px-4 py-2 text-sm rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
            >
              Editar perfil
            </button>
          </div>
        </div>
      </section>

      <section class="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 mb-6 transition-colors duration-300">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Seguridad</h3>

        <div class="space-y-3">
          <button 
            @click="openChangePasswordModal"
            class="w-full text-left px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700/60 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 transition"
          >
            <i class="fa-solid fa-pen-to-square text-lg mr-2"></i> Cambiar contraseña
          </button>
          <button 
            @click="openChangeEmailModal"
            class="w-full text-left px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700/60 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 transition"
          >
            <i class="fa-solid fa-envelope text-lg mr-2"></i> Cambiar email
          </button>
        </div>
      </section>
      
<section class="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 mb-6 transition-colors duration-300">
  <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Tema</h3>

  <div class="grid grid-cols-2 gap-3">
    <button
      @click="setTheme('light')"
      :class="[
        'flex items-center justify-center gap-2 p-3.5 rounded-xl border transition-all font-medium text-sm',
        !isDark
          ? 'border-orange-500 bg-orange-50 dark:border-sky-500 dark:bg-sky-950/30 text-orange-600 dark:text-sky-400 font-semibold shadow-sm'
          : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/40 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
      ]"
    >
      <i class="fa-solid fa-sun text-lg"></i>
      <span>Modo Claro</span>
    </button>

    <button
      @click="setTheme('dark')"
      :class="[
        'flex items-center justify-center gap-2 p-3.5 rounded-xl border transition-all font-medium text-sm',
        isDark
          ? 'border-orange-500 bg-orange-50 dark:border-sky-500 dark:bg-sky-950/30 text-orange-600 dark:text-sky-400 font-semibold shadow-sm'
          : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/40 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
      ]"
    >
      <i class="fa-solid fa-moon text-lg"></i>
      <span>Modo Oscuro</span>
    </button>
  </div>
</section>

      <section class="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 mb-6 transition-colors duration-300">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Información legal</h3>
        <div class="space-y-3 text-sm text-gray-600 dark:text-gray-400">
          <p class="cursor-pointer hover:text-gray-900 dark:hover:text-white transition">Términos y condiciones</p>
          <p class="cursor-pointer hover:text-gray-900 dark:hover:text-white transition">Política de privacidad</p>
          <p class="cursor-pointer hover:text-gray-900 dark:hover:text-white transition">Licencias</p>
        </div>
      </section>

      <section class="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 mb-6 text-center transition-colors duration-300">
        <button
          @click="openLogoutModal"
          class="w-full py-3 rounded-xl text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition flex items-center justify-center gap-2"
        >
          <i class="fa-solid fa-arrow-right-from-bracket w-5"></i> Cerrar sesión
        </button>
      </section>

      <section class="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 text-center border border-red-100 dark:border-red-900/30 transition-colors duration-300">
        <button
          @click="openDeleteAccountModal"
          class="w-full py-3 rounded-xl text-red-600 dark:text-red-400 font-semibold hover:bg-red-50 dark:hover:bg-red-950/30 transition flex items-center justify-center gap-2"
        >
          <i class="fa-solid fa-user-xmark w-5"></i> Eliminar cuenta
        </button>
      </section>
    </main>

    <transition name="modal-fade-slide">
      <div 
        v-if="showEditProfileModal"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4"
      >
        <div 
          class="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
          @click="showEditProfileModal = false"
        ></div>
        
        <div class="modal-card relative bg-white dark:bg-gray-800 rounded-[1.5rem] p-6 md:p-8 max-w-sm w-full shadow-2xl transition-colors">
          <div class="text-center mb-6">
            <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
              Editar Perfil
            </h2>
          </div>

          <div class="flex justify-center mb-6">
            <div class="relative">
              <div class="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-300 text-3xl font-semibold uppercase shadow-inner">
                {{ userInitial }}
              </div>
              <div class="absolute bottom-0 right-0 bg-white dark:bg-gray-700 p-1.5 rounded-full shadow-md border border-gray-100 dark:border-gray-600">
                <i class="fa-solid fa-pen-to-square text-gray-600 dark:text-gray-300 text-sm"></i>
              </div>
            </div>
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Correo electrónico</label>
            <div class="w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-700 rounded-xl text-gray-500 dark:text-gray-400 text-sm flex items-center gap-2">
              <i class="fa-solid fa-envelope text-gray-400"></i>
              {{ userEmail }}
            </div>
          </div>
          
          <div class="mb-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre de usuario</label>
            <input 
              v-model="editNameInput" 
              type="text" 
              class="w-full px-4 py-2.5 bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
              :class="{'border-red-500 focus:ring-red-500 focus:border-red-500': errorMessage}"
              placeholder="Tu nombre"
              @input="errorMessage = ''"
            />
            <p v-if="errorMessage" class="text-red-500 text-sm mt-2 font-medium">
              {{ errorMessage }}
            </p>
          </div>
          
          <div class="flex flex-col md:flex-row justify-end gap-3 mt-6">
            <button 
              @click="showEditProfileModal = false" 
              class="w-full md:w-auto px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold transition-colors"
              :disabled="isSavingProfile"
            >
              Cancelar
            </button>
            <button 
              @click="saveProfile" 
              class="w-full md:w-auto px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-colors shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2"
              :disabled="isSavingProfile"
            >
              <i v-if="isSavingProfile" class="fa-solid fa-circle-notch fa-spin"></i>
              Guardar
            </button>
          </div>
        </div>
      </div>
    </transition>

    <transition name="modal-fade-slide">
      <div 
        v-if="showChangePasswordModal"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4"
      >
        <div 
          class="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
          @click="showChangePasswordModal = false"
        ></div>
        
        <div class="modal-card relative bg-white dark:bg-gray-800 rounded-[1.5rem] p-6 md:p-8 max-w-sm w-full shadow-2xl transition-colors">
          <div class="text-center mb-6">
            <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
              Cambiar Contraseña
            </h2>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contraseña actual</label>
              <div class="relative">
                <input 
                  v-model="currentPassword" 
                  :type="showCurrentPassword ? 'text' : 'password'" 
                  class="w-full px-4 py-2.5 bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all pr-10"
                  :class="{'border-red-500': passwordErrorMessage}"
                  placeholder="Ingresa tu contraseña actual"
                  @input="passwordErrorMessage = ''"
                />
                <button 
                  @click="showCurrentPassword = !showCurrentPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
                >
                  <i :class="showCurrentPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
                </button>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nueva contraseña</label>
              <div class="relative">
                <input 
                  v-model="newPassword" 
                  :type="showNewPassword ? 'text' : 'password'" 
                  class="w-full px-4 py-2.5 bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all pr-10"
                  :class="{'border-red-500': passwordErrorMessage}"
                  placeholder="Ingresa la nueva contraseña"
                  @input="passwordErrorMessage = ''"
                />
                <button 
                  @click="showNewPassword = !showNewPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
                >
                  <i :class="showNewPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
                </button>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirmar nueva contraseña</label>
              <div class="relative">
                <input 
                  v-model="confirmPassword" 
                  :type="showConfirmPassword ? 'text' : 'password'" 
                  class="w-full px-4 py-2.5 bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all pr-10"
                  :class="{'border-red-500': passwordErrorMessage}"
                  placeholder="Repite la nueva contraseña"
                  @input="passwordErrorMessage = ''"
                />
                <button 
                  @click="showConfirmPassword = !showConfirmPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
                >
                  <i :class="showConfirmPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
                </button>
              </div>
            </div>
            
            <p v-if="passwordErrorMessage" class="text-red-500 text-sm font-medium">
              {{ passwordErrorMessage }}
            </p>
          </div>
          
          <div class="flex flex-col md:flex-row justify-end gap-3 mt-6">
            <button 
              @click="showChangePasswordModal = false" 
              class="w-full md:w-auto px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold transition-colors"
              :disabled="isSavingPassword"
            >
              Cancelar
            </button>
            <button 
              @click="savePassword" 
              class="w-full md:w-auto px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-colors shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2"
              :disabled="isSavingPassword"
            >
              <i v-if="isSavingPassword" class="fa-solid fa-circle-notch fa-spin"></i>
              Guardar
            </button>
          </div>
        </div>
      </div>
    </transition>

    <transition name="modal-fade-slide">
      <div 
        v-if="showChangeEmailModal"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4"
      >
        <div 
          class="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
          @click="showChangeEmailModal = false"
        ></div>
        
        <div class="modal-card relative bg-white dark:bg-gray-800 rounded-[1.5rem] p-6 md:p-8 max-w-sm w-full shadow-2xl transition-colors">
          <div class="text-center mb-6">
            <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
              Cambiar Email
            </h2>
          </div>

          <div class="mb-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nuevo correo electrónico</label>
            <input 
              v-model="newEmailInput" 
              type="email" 
              class="w-full px-4 py-2.5 bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
              :class="{'border-red-500 focus:ring-red-500 focus:border-red-500': emailErrorMessage}"
              placeholder="ejemplo@correo.com"
              @input="emailErrorMessage = ''"
            />
            <p v-if="emailErrorMessage" class="text-red-500 text-sm mt-2 font-medium">
              {{ emailErrorMessage }}
            </p>
          </div>
          
          <div class="flex flex-col md:flex-row justify-end gap-3 mt-6">
            <button 
              @click="showChangeEmailModal = false" 
              class="w-full md:w-auto px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold transition-colors"
              :disabled="isSavingEmail"
            >
              Cancelar
            </button>
            <button 
              @click="saveEmail" 
              class="w-full md:w-auto px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-colors shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2"
              :disabled="isSavingEmail"
            >
              <i v-if="isSavingEmail" class="fa-solid fa-circle-notch fa-spin"></i>
              Guardar
            </button>
          </div>
        </div>
      </div>
    </transition>

    <transition name="modal-fade-slide">
      <div 
        v-if="showDeleteAuthModal"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4"
      >
        <div 
          class="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
          @click="showDeleteAuthModal = false"
        ></div>
        
        <div class="modal-card relative bg-white dark:bg-gray-800 rounded-[1.5rem] p-6 md:p-8 max-w-sm w-full shadow-2xl transition-colors">
          <div class="text-center mb-6">
            <div class="mx-auto w-12 h-12 bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mb-4">
              <i class="fa-solid fa-triangle-exclamation text-xl"></i>
            </div>
            <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
              Verifica tu identidad
            </h2>
            <p class="text-gray-500 dark:text-gray-400 text-sm mt-2">
              Ingresa tus datos para continuar con la eliminación de la cuenta.
            </p>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Correo electrónico</label>
              <input 
                v-model="deleteEmailInput" 
                type="email" 
                class="w-full px-4 py-2.5 bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                :class="{'border-red-500': deleteErrorMessage}"
                placeholder="tu@email.com"
                @input="deleteErrorMessage = ''"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contraseña</label>
              <div class="relative">
                <input 
                  v-model="deletePasswordInput" 
                  :type="showDeletePassword ? 'text' : 'password'" 
                  class="w-full px-4 py-2.5 bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all pr-10"
                  :class="{'border-red-500': deleteErrorMessage}"
                  placeholder="Tu contraseña actual"
                  @input="deleteErrorMessage = ''"
                />
                <button 
                  @click="showDeletePassword = !showDeletePassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
                >
                  <i :class="showDeletePassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
                </button>
              </div>
            </div>
            
            <p v-if="deleteErrorMessage" class="text-red-500 text-sm font-medium text-center">
              {{ deleteErrorMessage }}
            </p>
          </div>
          
          <div class="flex flex-col md:flex-row justify-end gap-3 mt-6">
            <button 
              @click="showDeleteAuthModal = false" 
              class="w-full md:w-auto px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold transition-colors"
              :disabled="isVerifyingDelete"
            >
              Cancelar
            </button>
            <button 
              @click="verifyDeleteCredentials" 
              class="w-full md:w-auto px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors shadow-lg shadow-red-500/30 flex items-center justify-center gap-2"
              :disabled="isVerifyingDelete"
            >
              <i v-if="isVerifyingDelete" class="fa-solid fa-circle-notch fa-spin"></i>
              Continuar
            </button>
          </div>
        </div>
      </div>
    </transition>

    <transition name="modal-fade-slide">
      <div 
        v-if="showDeleteConfirmModal"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4"
      >
        <div 
          class="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
          @click="showDeleteConfirmModal = false"
        ></div>
        
        <div class="modal-card relative bg-white dark:bg-gray-800 rounded-[1.5rem] p-6 md:p-8 max-w-sm w-full shadow-2xl border-2 border-red-100 dark:border-red-900/40 transition-colors">
          <div class="text-center md:text-left">
            <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3">
              ¿Estás seguro de que quieres eliminar la cuenta?
            </h2>
            <p class="text-gray-600 dark:text-gray-300 text-sm md:text-base mb-8">
              Una vez que elimines la cuenta, no tendrás posibilidad de recuperarla o de volver a iniciar sesión con tu email.
            </p>
          </div>
          
          <div class="flex flex-col md:flex-row justify-end gap-3">
            <button 
              @click="showDeleteConfirmModal = false" 
              class="w-full md:w-auto px-6 py-3 rounded-xl bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold transition-colors"
              :disabled="isDeletingAccount"
            >
              Cancelar
            </button>
            <button 
              @click="confirmDeleteAccount" 
              class="w-full md:w-auto px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors shadow-lg shadow-red-500/30 flex items-center justify-center gap-2"
              :disabled="isDeletingAccount"
            >
              <i v-if="isDeletingAccount" class="fa-solid fa-circle-notch fa-spin"></i>
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </transition>

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
            <p class="text-gray-500 dark:text-gray-400 text-sm md:text-base mb-8">
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
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import NavMobile from '../../components/mobile/NavMobile.vue';
import { supabase } from '../../services/supabase.js';
import { useTheme } from '../../composables/useTheme'

const { isDark, setTheme } = useTheme()

const router = useRouter();

const userName = ref("Usuario");
const userEmail = ref("usuario@gmail.com");
const userInitial = ref("U");

const currentTheme = ref('light');

function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    currentTheme.value = 'dark';
    document.documentElement.classList.add('dark');
  } else {
    currentTheme.value = 'light';
    document.documentElement.classList.remove('dark');
  }
}

const showLogoutModal = ref(false);
const showEditProfileModal = ref(false);
const showChangePasswordModal = ref(false);
const showChangeEmailModal = ref(false);

const editNameInput = ref("");
const isSavingProfile = ref(false);
const errorMessage = ref("");

const currentPassword = ref("");
const newPassword = ref("");
const confirmPassword = ref("");
const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);
const passwordErrorMessage = ref("");
const isSavingPassword = ref(false);

const newEmailInput = ref("");
const emailErrorMessage = ref("");
const isSavingEmail = ref(false);

const showDeleteAuthModal = ref(false);
const showDeleteConfirmModal = ref(false);
const deleteEmailInput = ref("");
const deletePasswordInput = ref("");
const showDeletePassword = ref(false);
const deleteErrorMessage = ref("");
const isVerifyingDelete = ref(false);
const isDeletingAccount = ref(false);

onMounted(async () => {
  initTheme();

  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user) return;

  if (typeof userEmail !== 'undefined') {
    userEmail.value = authData.user.email;
  }

  let metaName = authData.user.user_metadata?.full_name || 
                 authData.user.user_metadata?.name || 
                 authData.user.user_metadata?.username;

  const { data: profile } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", authData.user.id)
    .single();

  let dbName = profile?.username;

  if (typeof dbName === 'object' && dbName !== null) {
      dbName = dbName.full_name || dbName.name || dbName.username;
  }
  if (typeof dbName === 'string' && dbName.startsWith('{')) {
      try {
          const parsed = JSON.parse(dbName);
          dbName = parsed.full_name || parsed.name || parsed.username;
      } catch(e) {
          console.error("Error al parsear el nombre de usuario", e);
      }
  }

  let finalName = dbName || metaName || authData.user.email?.split("@")[0] || "Usuario";

  userName.value = finalName;
  userInitial.value = finalName.charAt(0).toUpperCase();
});

function openEditProfileModal() {
  editNameInput.value = userName.value;
  errorMessage.value = "";
  showEditProfileModal.value = true;
}

async function saveProfile() {
  errorMessage.value = "";
  const newName = editNameInput.value.trim();

  if (!newName) {
    errorMessage.value = "Por favor, ingresa un nombre de usuario válido.";
    return;
  }

  if (newName === userName.value) {
    showEditProfileModal.value = false;
    return;
  }

  isSavingProfile.value = true;

  try {
    const { data: authData } = await supabase.auth.getUser();
    if (!authData.user) throw new Error("No user found");

    const { data: existingUsers, error: searchError } = await supabase
      .from("profiles")
      .select("id")
      .eq("username", newName)
      .neq("id", authData.user.id);

    if (searchError) throw searchError;

    if (existingUsers && existingUsers.length > 0) {
      errorMessage.value = "Este nombre de usuario ya está en uso.";
      isSavingProfile.value = false;
      return; 
    }

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ username: newName })
      .eq("id", authData.user.id);

    if (updateError) throw updateError;

    userName.value = newName;
    userInitial.value = newName.charAt(0).toUpperCase();
    
    showEditProfileModal.value = false;
  } catch (error) {
    console.error("Error al actualizar el perfil:", error);
    errorMessage.value = "Hubo un error de conexión al guardar. Inténtalo de nuevo.";
  } finally {
    isSavingProfile.value = false;
  }
}

function openChangePasswordModal() {
  currentPassword.value = "";
  newPassword.value = "";
  confirmPassword.value = "";
  showCurrentPassword.value = false;
  showNewPassword.value = false;
  showConfirmPassword.value = false;
  passwordErrorMessage.value = "";
  showChangePasswordModal.value = true;
}

async function savePassword() {
  passwordErrorMessage.value = "";

  if (!currentPassword.value || !newPassword.value || !confirmPassword.value) {
    passwordErrorMessage.value = "Todos los campos son obligatorios.";
    return;
  }

  if (newPassword.value !== confirmPassword.value) {
    passwordErrorMessage.value = "Las contraseñas nuevas no coinciden.";
    return;
  }

  if (newPassword.value.length < 6) {
    passwordErrorMessage.value = "La nueva contraseña debe tener al menos 6 caracteres.";
    return;
  }

  isSavingPassword.value = true;

  try {
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: userEmail.value,
      password: currentPassword.value
    });

    if (signInError) {
      passwordErrorMessage.value = "La contraseña actual es incorrecta.";
      isSavingPassword.value = false;
      return;
    }

    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword.value
    });

    if (updateError) throw updateError;

    showChangePasswordModal.value = false;
    alert("¡Tu contraseña ha sido actualizada con éxito!");
    
  } catch (error) {
    console.error("Error al actualizar la contraseña:", error);
    passwordErrorMessage.value = "Hubo un error al guardar. Inténtalo de nuevo más tarde.";
  } finally {
    isSavingPassword.value = false;
  }
}

function openChangeEmailModal() {
  newEmailInput.value = "";
  emailErrorMessage.value = "";
  showChangeEmailModal.value = true;
}

async function saveEmail() {
  emailErrorMessage.value = "";
  const newEmail = newEmailInput.value.trim();

  if (!newEmail) {
    emailErrorMessage.value = "El campo no puede estar vacío.";
    return;
  }

  if (newEmail === userEmail.value) {
    emailErrorMessage.value = "El correo es el mismo que tienes actualmente.";
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(newEmail)) {
    emailErrorMessage.value = "Ingresa un correo electrónico válido.";
    return;
  }

  isSavingEmail.value = true;

  try {
    const { error: updateError } = await supabase.auth.updateUser({
      email: newEmail
    });

    if (updateError) throw updateError;

    showChangeEmailModal.value = false;
    alert("¡Solicitud enviada! Supabase ha enviado enlaces de confirmación a tu correo actual y al nuevo para verificar el cambio.");
    
  } catch (error) {
    console.error("Error al actualizar el email:", error);
    emailErrorMessage.value = "Hubo un error o el correo ya está en uso.";
  } finally {
    isSavingEmail.value = false;
  }
}

function openDeleteAccountModal() {
  deleteEmailInput.value = "";
  deletePasswordInput.value = "";
  showDeletePassword.value = false;
  deleteErrorMessage.value = "";
  showDeleteAuthModal.value = true;
}

async function verifyDeleteCredentials() {
  deleteErrorMessage.value = "";

  if (!deleteEmailInput.value || !deletePasswordInput.value) {
    deleteErrorMessage.value = "Debes ingresar tu correo y contraseña.";
    return;
  }

  if (deleteEmailInput.value !== userEmail.value) {
    deleteErrorMessage.value = "El correo no coincide con tu cuenta actual.";
    return;
  }

  isVerifyingDelete.value = true;

  try {
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: deleteEmailInput.value,
      password: deletePasswordInput.value
    });

    if (signInError) {
      deleteErrorMessage.value = "La contraseña es incorrecta.";
      isVerifyingDelete.value = false;
      return;
    }

    showDeleteAuthModal.value = false;
    showDeleteConfirmModal.value = true;
    
  } catch (error) {
    console.error("Error al verificar credenciales:", error);
    deleteErrorMessage.value = "Ocurrió un error al verificar tu cuenta.";
  } finally {
    isVerifyingDelete.value = false;
  }
}

async function confirmDeleteAccount() {
  isDeletingAccount.value = true;
  
  try {
    await supabase.auth.signOut();
    showDeleteConfirmModal.value = false;
    router.push('/login');
    
  } catch (error) {
    console.error("Error al eliminar la cuenta:", error);
  } finally {
    isDeletingAccount.value = false;
  }
}

function openLogoutModal() {
  showLogoutModal.value = true;
}

async function confirmLogout() {
  showLogoutModal.value = false;
  
  if (typeof supabase !== 'undefined') {
    await supabase.auth.signOut();
  }
  
  router.push('/login');
}
</script>

<style scoped>
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
</style>