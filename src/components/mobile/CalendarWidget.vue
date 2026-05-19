<template>
  <div class="bg-white rounded-2xl shadow p-5 w-full">
    <div class="flex items-center justify-between mb-4">
      <button @click="prevMonth" class="text-gray-600 hover:text-gray-900">
        <i class="fa-solid fa-chevron-left"></i>
      </button>

      <h3 class="font-['Outfit'] font-medium text-gray-900 text-lg">
        {{ monthName }} {{ currentYear }}
      </h3>

      <button @click="nextMonth" class="text-gray-600 hover:text-gray-900">
        <i class="fa-solid fa-chevron-right"></i>
      </button>
    </div>

    <div class="grid grid-cols-7 text-center text-gray-500 text-sm mb-2">
      <span v-for="d in days" :key="d">{{ d }}</span>
    </div>

    <div class="grid grid-cols-7 gap-2">
      <div
        v-for="(day, i) in calendarDays"
        :key="i"
        @click="selectDate(day)"
        class="h-10 flex items-center justify-center text-sm rounded-xl cursor-pointer transition"
        :class="[
          isCurrentMonth(day.date)
            ? 'text-gray-900'
            : 'text-gray-400',

          reminders.some(r => r.date === formatDateToYMD(day.date))
            ? 'bg-blue-100 text-blue-900 font-medium'
            : 'hover:bg-gray-100',

          isSelected(day.date)
            ? 'ring-2 ring-blue-400 bg-blue-200'
            : ''
        ]"
      >
        {{ day.day }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"

const today = new Date()

const currentMonth = ref(today.getMonth())
const currentYear = ref(today.getFullYear())
const selectedDate = ref(null)

const props = defineProps({
  reminders: {
    type: Array,
    default: () => []
  }
})

const days = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]

function formatDateToYMD(date) {
  return date.toISOString().split("T")[0]
}

const monthName = computed(() =>
  new Date(currentYear.value, currentMonth.value)
    .toLocaleString("es-ES", { month: "long" })
    .replace(/^\w/, c => c.toUpperCase())
)

function getCalendarDays(month, year) {
  const firstDay = new Date(year, month, 1)
  const startDayIndex = (firstDay.getDay() + 6) % 7

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrevMonth = new Date(year, month, 0).getDate()

  const calendar = []

  for (let i = startDayIndex - 1; i >= 0; i--) {
    calendar.push({
      day: daysInPrevMonth - i,
      date: new Date(year, month - 1, daysInPrevMonth - i)
    })
  }

  for (let d = 1; d <= daysInMonth; d++) {
    calendar.push({
      day: d,
      date: new Date(year, month, d)
    })
  }

  while (calendar.length < 42) {
    const nextDay = calendar.length - (startDayIndex + daysInMonth) + 1
    calendar.push({
      day: nextDay,
      date: new Date(year, month + 1, nextDay)
    })
  }

  return calendar
}

const calendarDays = computed(() =>
  getCalendarDays(currentMonth.value, currentYear.value)
)

function prevMonth() {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

function nextMonth() {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
}

function selectDate(day) {
  selectedDate.value = day.date
}

function isSelected(date) {
  if (!selectedDate.value) return false
  return formatDateToYMD(date) === formatDateToYMD(selectedDate.value)
}

function isCurrentMonth(date) {
  return (
    date.getMonth() === currentMonth.value &&
    date.getFullYear() === currentYear.value
  )
}
</script>