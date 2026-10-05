<template>
  <div class="flex min-h-screen bg-gray-50">

    <NavMobile />

      <main class="flex-1 p-4 md:p-6 pt-20 pb-20 md:pt-6 md:pb-6">
        <div class="mb-6">
          <h1 class="font-['Outfit'] font-bold text-3xl text-[#332926] mb-2">
            Todos mis recordatorios
          </h1>
          <p class="text-gray-500 text-sm">
            Organizá tus recordatorios y consultá tus fechas.
          </p>
        </div>

      <div class="grid grid-cols-1 lg:grid-cols-[30%_70%] gap-6">

        <div
          class="bg-white rounded-2xl shadow-sm p-5 flex flex-col
          h-[580px] overflow-hidden"
        >

          <button
            @click="openReminderModal()"
            class="btn-primary w-full px-6 py-3 rounded-xl text-white
            font-semibold transition-all duration-300 ease-out mb-5"
          >
            Nuevo recordatorio
          </button>
          
          <div class="chatScroll flex-1 overflow-y-auto pr-2">
            <div
              v-if="reminders.length === 0"
              class="h-full flex items-center justify-center"
            >
              <p class="text-gray-500 text-sm italic text-center">
                Todavía no creaste ningún recordatorio
              </p>
            </div>

            <div
              v-else
              class="flex flex-col gap-6"
            >
              <div
                v-for="group in groupedReminders"
                :key="group.key"
              >
                <div class="flex items-center gap-3 mb-3">
                  <h3
                    class="font-['Outfit'] font-semibold
                    text-sm text-gray-700 uppercase tracking-wide"
                  >
                    {{ group.month }}
                  </h3>

                  <div class="flex-1 h-px bg-gray-200"></div>
                </div>

                <div class="flex flex-col gap-3">
                  <!-- animación al pasar el pulsor sobre los recordatrios, agregar al home -->
                  <div
                    v-for="item in group.reminders"
                    :key="item.id"
                    @click="openReminderDetails(item)"
                    class="rounded-xl bg-gray-50 p-4
                    border border-gray-100
                    hover:shadow-md hover:-translate-y-0.5
                    transition-all duration-300 ease-out
                    cursor-pointer"
                  >

                    <div class="flex items-start gap-3">
                      <div
                        class="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                        :style="{
                          backgroundColor: item.color || '#34A469'
                        }"
                      ></div>

                      <div class="flex-1 min-w-0">
                        <h4
                          class="font-['Outfit'] font-medium
                          text-gray-800 truncate"
                        >
                          {{ item.title }}
                        </h4>
                        <p
                          v-if="item.description"
                          class="text-sm text-gray-500 mt-1 line-clamp-2"
                        >
                          {{ item.description }}
                        </p>
                        <span
                          class="block text-xs text-gray-400 mt-2"
                        >
                          {{ formatDate(item.date) }}
                        </span>
                      </div>

                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="w-full h-full pr-5"
        >
          <CalendarWidget
            :reminders="reminders"
            :showTitles="true"
            @select-date="openReminderModal"
          />
        </div>
      </div>

      <ReminderModal
        v-if="showReminderModal"
        :key="selectedDate"
        :defaultDate="selectedDate"
        @close="closeReminderModal"
        @created="onReminderCreated"
      />

      <ReminderDetailsModal
        v-if="showReminderDetailsModal && selectedReminder"
        :reminder="selectedReminder"
        @close="closeReminderDetails"
      />
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import { supabase } from "../../services/supabase"
import { getReminders } from "../../services/reminder.js"
import NavMobile from "../../components/mobile/NavMobile.vue"
import CalendarWidget from "../../components/mobile/CalendarWidget.vue"
import ReminderModal from "../../components/ReminderModal.vue"
import ReminderDetailsModal from "../../components/ReminderDetailsModal.vue"

const reminders = ref([])
const showReminderModal = ref(false)
const selectedDate = ref(null)
const selectedReminder = ref(null)
const showReminderDetailsModal = ref(false)

function openReminderDetails(reminder) {
  selectedReminder.value = reminder
  showReminderDetailsModal.value = true
}

function closeReminderDetails() {
  showReminderDetailsModal.value = false
  selectedReminder.value = null
}

async function loadReminders() {
  try {
    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (!user) return

    reminders.value = await getReminders(user.id)
  } catch (error) {
    console.error(
      "Error cargando recordatorios:",
      error
    )
  }
}

function openReminderModal(date = null) {
  selectedDate.value = date
  showReminderModal.value = true
}

function closeReminderModal() {
  showReminderModal.value = false
  selectedDate.value = null
}

function onReminderCreated(reminder) {
  reminders.value.unshift(reminder)
  closeReminderModal()
}

function formatDate(dateStr) {
  if (!dateStr) return ""

  const [year, month, day] =
    String(dateStr)
      .slice(0, 10)
      .split("-")

  const date = new Date(
    Number(year),
    Number(month) - 1,
    Number(day)
  )

  return date.toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  })
}

const groupedReminders = computed(() => {

  const groups = {}
  const sorted = [...reminders.value].sort(
    (a, b) => {
      return String(a.date).localeCompare(
        String(b.date)
      )
    }
  )

  sorted.forEach(reminder => {
    if (!reminder.date) return

    const [year, month] =
      String(reminder.date)
        .slice(0, 7)
        .split("-")

    const key = `${year}-${month}`

    if (!groups[key]) {
      const date = new Date(
        Number(year),
        Number(month) - 1,
        1
      )

      groups[key] = {
        key,
        month: date.toLocaleDateString(
          "es-AR",
          {
            month: "long",
            year: "numeric"
          }
        ),
        reminders: []
      }
    }

    groups[key].reminders.push(reminder)

  })
  return Object.values(groups)
})

onMounted(() => {
  loadReminders()
})
</script>