<template>
  <div class="bg-white rounded-2xl shadow p-5 w-full">
    <div class="flex items-center justify-between mb-4">
      <button
        @click="prevMonth"
        class="text-gray-600 hover:text-gray-900"
      >
        <i class="fa-solid fa-chevron-left"></i>
      </button>

      <h3 class="font-['Outfit'] font-medium text-gray-900 text-lg">
        {{ monthName }} {{ currentYear }}
      </h3>

      <button
        @click="nextMonth"
        class="text-gray-600 hover:text-gray-900"
      >
        <i class="fa-solid fa-chevron-right"></i>
      </button>
    </div>

    <div class="grid grid-cols-7 text-center text-gray-500 text-sm mb-2">
      <span
        v-for="d in days"
        :key="d"
      >
        {{ d }}
      </span>
    </div>

    <div class="grid grid-cols-7 gap-2">
      <div
        v-for="(day, i) in calendarDays"
        :key="i"
        @click="selectDate(day)"
        class="min-h-16 flex flex-col items-center justify-start text-sm rounded-xl cursor-pointer transition relative p-1"
        :class="[
          isCurrentMonth(day.date)
            ? 'text-gray-900'
            : 'text-gray-400',

        ]"
      >
        <span class="font-medium">
          {{ day.day }}
        </span>

        <div
          v-if="!props.showTitles && getRemindersForDate(day.date).length"
          class="mt-1 flex items-center justify-center gap-1"
        >
          <span
            v-for="reminder in getRemindersForDate(day.date)"
            :key="reminder.id"
            class="w-1.5 h-1.5 rounded-full"
            :style="{
              backgroundColor: reminder.color || '#34A469'
            }"
          ></span>
        </div>

        <div
          v-if="props.showTitles && getRemindersForDate(day.date).length"
          class="mt-1 w-full flex flex-col items-center gap-1"
        >
          <span
            v-for="reminder in getRemindersForDate(day.date)"
            :key="reminder.id"
            class="w-full truncate text-xs font-semibold rounded-md px-2 py-1 text-center"
            :style="{
              backgroundColor: `${reminder.color || '#34A469'}25`,
              color: reminder.color || '#34A469'
            }"
            :title="reminder.title"
          >
            {{ reminder.title }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"

const props = defineProps({
  reminders: {
    type: Array,
    default: () => []
  },
  showTitles: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(["select-date"])
const today = new Date()
const currentMonth = ref(today.getMonth())
const currentYear = ref(today.getFullYear())
const selectedDate = ref(null)

const days = [
  "Lun",
  "Mar",
  "Mié",
  "Jue",
  "Vie",
  "Sáb",
  "Dom"
]


function formatDateToYMD(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}


const monthName = computed(() =>
  new Date(currentYear.value, currentMonth.value)
    .toLocaleString("es-AR", {
      month: "long"
    })
    .replace(/^\w/, c => c.toUpperCase())
)


function getCalendarDays(month, year) {
  const firstDay = new Date(year, month, 1)

  const startDayIndex =
    (firstDay.getDay() + 6) % 7

  const daysInMonth =
    new Date(year, month + 1, 0).getDate()

  const daysInPrevMonth =
    new Date(year, month, 0).getDate()

  const calendar = []

  for (let i = startDayIndex - 1; i >= 0; i--) {
    calendar.push({
      day: daysInPrevMonth - i,
      date: new Date(
        year,
        month - 1,
        daysInPrevMonth - i
      )
    })
  }

  for (let d = 1; d <= daysInMonth; d++) {
    calendar.push({
      day: d,
      date: new Date(year, month, d)
    })
  }

  while (calendar.length < 42) {
    const nextDay =
      calendar.length -
      (startDayIndex + daysInMonth) +
      1

    calendar.push({
      day: nextDay,
      date: new Date(
        year,
        month + 1,
        nextDay
      )
    })
  }

  return calendar
}

const calendarDays = computed(() =>
  getCalendarDays(
    currentMonth.value,
    currentYear.value
  )
)

function getRemindersForDate(date) {
  const calendarDate = formatDateToYMD(date)

  return props.reminders.filter(reminder => {
    if (!reminder.date) return false

    const reminderDate =
      String(reminder.date).slice(0, 10)

    return reminderDate === calendarDate
  })
}

function hasReminder(date) {
  return getRemindersForDate(date).length > 0
}

function prevMonth() {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
  selectedDate.value = null
}

function nextMonth() {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
  selectedDate.value = null
}

function selectDate(day) {
  selectedDate.value = day.date
  emit("select-date", day.date)
}

function isCurrentMonth(date) {
  return (
    date.getMonth() === currentMonth.value &&
    date.getFullYear() === currentYear.value
  )
}

function getReminderColor(date) {
  const remindersForDate = getRemindersForDate(date)

  if (!remindersForDate.length) {
    return "#34A469"
  }

  return remindersForDate[0].color || "#34A469"
}
</script>