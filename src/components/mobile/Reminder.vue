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
        class="flex items-start bg-gray-50 rounded-xl shadow-sm border-l-4 p-4"
        :style="{
          borderLeftColor: item.color || '#34A469'
        }"
      >
        <div class="flex-1 flex flex-col gap-2">
          <div class="flex items-start justify-between">

            <h4 class="font-['Outfit'] font-medium text-gray-800">
              {{ item.title }}
            </h4>

            <div class="flex items-center gap-3 text-gray-500">
              <i
                class="fa-solid fa-pen-to-square cursor-pointer hover:text-gray-800 transition text-lg"
                @click="openEdit(item)"
              ></i>

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
import { ref, computed } from "vue"
import { deleteReminder } from "../../services/reminder.js"
import EditReminderModal from "../EditReminderModal.vue"
import DeleteModal from "../DeleteModal.vue"

const props = defineProps({
  reminders: {
    type: Array,
    default: () => []
  },
  limit: {
    type: Number,
    default: 4
  }
})

const emit = defineEmits([
  "updated",
  "deleted"
])

const showEditModal = ref(false)
const selectedReminder = ref(null)

const showDeleteReminderModal = ref(false)
const reminderToDelete = ref(null)

const visibleReminders = computed(() => {
  return props.reminders.slice(0, props.limit)
})

function formatDate(dateStr) {
  if (!dateStr) return ""

  const [year, month, day] = String(dateStr).slice(0, 10).split("-")

  const date = new Date(
    Number(year),
    Number(month) - 1,
    Number(day)
  )

  return date.toLocaleDateString("es-AR", {
    day: "numeric",
    month: "short",
    year: "numeric"
  })
}

function openEdit(reminder) {
  selectedReminder.value = reminder
  showEditModal.value = true
}

function handleUpdatedReminder(updatedReminder) {
  emit("updated", updatedReminder)

  showEditModal.value = false
}

function openDeleteReminder(reminder) {
  reminderToDelete.value = reminder
  showDeleteReminderModal.value = true
}

async function confirmDeleteReminder() {
  try {
    await deleteReminder(reminderToDelete.value.id)

    emit("deleted", reminderToDelete.value.id)

    showDeleteReminderModal.value = false
    reminderToDelete.value = null

  } catch (error) {
    console.error("Error eliminando recordatorio:", error)
  }
}
</script>