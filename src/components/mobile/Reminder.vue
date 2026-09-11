<template>
  <div>
    <h3 class="font-['Outfit'] font-medium text-xl text-gray-900 mb-4">Recordatorios</h3>

    <p 
      v-if="reminders.length === 0" 
      class="text-gray-500 font-body text-sm italic"
    >
      Todavía no creaste ningún recordatorio
    </p>

    <div v-else class="flex flex-col gap-4">
      <div
        v-for="item in visibleReminders"
        :key="item.id"
        class="flex items-start bg-gray-50 rounded-xl shadow-sm border-l-4 border-green-600 p-4"
      >
        <div class="flex-1 flex flex-col gap-2">
          <div class="flex items-start justify-between">
            <h4 class="font-['Outfit'] font-medium text-gray-800">{{ item.title }}</h4>
            <div class="flex items-center gap-3 text-gray-500">
              <i
                class="fa-solid fa-pen-to-square cursor-pointer hover:text-gray-800 transition text-lg"
                @click="openEdit(item)" >
              </i>
              <i 
                class="fa-solid fa-xmark cursor-pointer hover:text-gray-800 transition text-lg"
                @click="openDeleteReminder(item)"
              ></i>
            </div>
          </div>

          <p class="text-sm text-gray-600">
            {{ item.description }}
          </p>

          <span class="text-xs text-gray-500">
            {{ formatDate(item.date) }}
          </span>
        </div>
      </div>
    </div>

    <div class="mt-6 flex gap-3">
        <button
          @click="openModal"
          class="btn-primary px-6 py-2 rounded-xl text-white font-semibold hover:bg-green-800 transition"
        >
          Nuevo recordatorio
        </button>
  
        <router-link to="/allreminders"
          class="btn-outline-primary px-6 py-2 rounded-xl bg-gray-100 text-gray-800 font-semibold transition"
        >
          Ver todo
        </router-link>
    </div>
    
      <ReminderModal
        v-if="showModal"
        @close="showModal = false"
        @created="addReminder"
      />

      <EditReminderModal
        v-if="showEditModal"
        :reminder="selectedReminder"
        @close="showEditModal = false"
        @updated="handleUpdatedReminder"
      />

      <DeleteModal
        v-if="showDeleteReminderModal"
        title="Eliminar recordatorio"
        @close="showDeleteReminderModal = false"
        @confirm="confirmDeleteReminder"
      >
      <span>
        ¿Estás seguro de que querés eliminar este recordatorio?
      </span>
      </DeleteModal>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue"
import { supabase } from "../../services/supabase"
import { getReminders, deleteReminder } from "../../services/reminder.js"
import ReminderModal from "../../components/ReminderModal.vue"
import EditReminderModal from "../EditReminderModal.vue"
import DeleteModal from "../DeleteModal.vue"

const props = defineProps({
  limit: {
    type: Number,
    default: 4
  }
})

const reminders = ref([])
const showModal = ref(false)
const showEditModal = ref(false);
const selectedReminder = ref(null);
const showDeleteReminderModal = ref(false);
const reminderToDelete = ref(null);

function openModal() {
  showModal.value = true
}

const visibleReminders = computed(() => {
  return reminders.value.slice(0, props.limit)
})

async function loadReminders() {
  const { data: { user } } = await supabase.auth.getUser()
  reminders.value = await getReminders(user.id)
}

function addReminder(newData) {
  reminders.value.unshift(newData)
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "short",
    year: "numeric"
  })
}

async function onDelete(id) {
  try {
    await deleteReminder(id)
    reminders.value = reminders.value.filter(r => r.id !== id)
  } catch (err) {
    console.error("Error eliminando recordatorio:", err)
    alert("No se pudo eliminar el recordatorio")
  }
}

function openEdit(reminder) {
  selectedReminder.value = reminder;
  showEditModal.value = true;
}

function handleUpdatedReminder(updatedReminder) {

  reminders.value = reminders.value.map(reminder => {

    if (reminder.id === updatedReminder.id) {
      return updatedReminder;
    }

    return reminder;
  });
}

function openDeleteReminder(reminder) {
  reminderToDelete.value = reminder;
  showDeleteReminderModal.value = true;
}
async function confirmDeleteReminder() {

  try {

    await deleteReminder(reminderToDelete.value.id);

    reminders.value = reminders.value.filter(
      reminder => reminder.id !== reminderToDelete.value.id
    );

    showDeleteReminderModal.value = false;

  } catch(error) {

    console.error(error);

  }

}

onMounted(() => {
  loadReminders()
})
</script>