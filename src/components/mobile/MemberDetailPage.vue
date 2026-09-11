<script setup>
import { ref, onMounted } from 'vue'
import { getMemberById } from '../../services/membersService.js'
import ToDoList from '../../components/mobile/ToDoList.vue'

const props = defineProps({ id: String })
const member = ref(null)
const sent = ref(false)

onMounted(async () => {
  try {
    member.value = await getMemberById(props.id)
  } catch (error) {
    console.error('Error al cargar datos del miembro:', error)
  }
})

function sendPush() {
  if (sent.value) return
  sent.value = true
}
</script>

<template>
  <div v-if="member" class="p-4 space-y-4 relative">
    <div class="bg-blue-200 p-4 rounded-xl">
      <h3 class="font-bold text-lg">{{ member.name }}</h3>
      <p>Email: {{ member.email }}</p>
      <p>Teléfono: {{ member.phone }}</p>
      <p>Rol: {{ member.role }}</p>
    </div>

    <div class="grid grid-cols-2 gap-2 text-sm">
      <div class="bg-green-100 p-2 rounded-xl">
        <p>Última act.</p>
        <p class="font-semibold">{{ member.last_activity }}</p>
      </div>
      <div class="bg-green-100 p-2 rounded-xl">
        <p>Progreso general</p>
        <div class="flex items-center gap-2 mt-1">
          <div class="w-full bg-gray-200 h-2 rounded">
            <div
              class="bg-green-500 h-2 rounded"
              :style="{ width: member.progress + '%' }"
            ></div>
          </div>
          <span
            class="text-sm font-medium text-gray-700 min-w-[2.5rem] text-right"
          >
            {{ member.progress }}%
          </span>
        </div>
      </div>
    </div>
<div class="bg-orange-100 p-5 rounded-2xl flex flex-col items-center text-center">
  <div class="flex items-center justify-center gap-4 mb-3">
    <img
      src="https://images.vexels.com/media/users/3/134126/isolated/preview/37fb3358f410d3a764891e06e132c218-estrella-de-dibujos-animados-05.png"
      alt="Estrella amarilla"
      class="w-20 h-20 drop-shadow-md"
    />
    <div class="text-left">
      <h4 class="font-bold text-lg text-orange-700">Envía un empujoncito</h4>
      <p class="text-gray-700 text-sm">¡Hola! No te olvides de seguir con tus trabajos.</p>
    </div>
  </div>

  <button
    @click="sendPush"
    class="mt-2 bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-xl text-white font-semibold text-lg transition active:scale-95 w-full sm:w-auto"
    :class="{ 'bg-gray-400 cursor-not-allowed': sent }"
  >
    {{ sent ? '¡Mensaje enviado!' : 'Enviar' }}
  </button>
</div>
    <ToDoList :memberId="member.id" />
  </div>
</template>
