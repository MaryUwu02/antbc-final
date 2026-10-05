<template>
  <BaseModal
    @close="emit('close')"
  >
    <div class="bg-white rounded-2xl shadow-xl p-6">
      <div class="flex items-center justify-between mb-4">
        <h2 class="font-['Outfit'] font-semibold text-xl text-gray-900">
          Nuevo recordatorio
        </h2>

      </div>

      <div class="flex flex-col gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Recordatorio para
          </label>

          <div class="grid grid-cols-2 gap-2">
            <button
              type="button"
              @click="reminderType = 'personal'"
              class="px-4 py-2.5 rounded-xl border text-sm font-medium transition-all"
              :class="reminderType === 'personal'
                  ? 'border-[#34A469] bg-[#34A469]/10 text-[#34A469]'
                  : 'border-gray-200 text-gray-500 hover:border-gray-300'"
            >
              <i class="fa-solid fa-user mr-2"></i>
              Solo para mí
            </button>

            <button
              type="button"
              @click="reminderType = 'group'"
              class="px-4 py-2.5 rounded-xl border text-sm font-medium transition-all"
              :class="reminderType === 'group'
                  ? 'border-[#0A88C4] bg-[#0A88C4]/10 text-[#0A88C4]'
                  : 'border-gray-200 text-gray-500 hover:border-gray-300'"
            >
              <i class="fa-solid fa-users mr-2"></i>
              Un grupo
            </button>
          </div>
        </div>

        <div v-if="reminderType === 'group'">
          <label
            for="group"
            class="block text-sm font-medium text-gray-700 mb-2"
          >
            Seleccioná un grupo
          </label>

          <select
            id="group"
            v-model="selectedGroupId"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-300
            bg-white text-gray-700
            focus:outline-none focus:ring-2 focus:ring-gray-300
            focus:border-gray-400 focus:shadow-md
            transition-all duration-300 ease-out"
          >
            <option value="" disabled>
              Seleccioná un grupo
            </option>

            <option
              v-for="group in groups"
              :key="group.group_id"
              :value="group.group_id"
            >
              {{ group.name }}
            </option>
          </select>

          <p
            v-if="groups.length === 0 && !loadingGroups"
            class="text-xs text-gray-400 mt-2"
          >
            No pertenecés a ningún grupo.
          </p>

          <p
            v-if="loadingGroups"
            class="text-xs text-gray-400 mt-2"
          >
            Cargando grupos...
          </p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Nombre del recordatorio
          </label>
  
          <div>
            <input
              v-model="title"
              type="text"
              placeholder="Título"
              class="w-full px-4 py-2 rounded-lg border border-gray-300
              focus:outline-none focus:ring-2 focus:ring-gray-300
              focus:border-gray-400 focus:shadow-md
              focus:-translate-y-0.5
              transition-all duration-300 ease-out"
            />
  
            <p
              v-if="errors.title"
              class="text-xs text-red-500 mt-1"
            >
              {{ errors.title }}
            </p>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Descripción
          </label>

          <textarea
            v-model="description"
            rows="3"
            placeholder="Descripción"
            class="w-full px-4 py-2 rounded-lg border border-gray-300
            focus:outline-none focus:ring-2 focus:ring-gray-300
            focus:border-gray-400 focus:shadow-md
            focus:-translate-y-0.5
            transition-all duration-300 ease-out
            resize-none"
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Fecha
          </label>

          <input
            v-model="date"
            type="date"
            :min="getToday()"
            class="w-full px-4 py-2 rounded-lg border border-gray-300
            focus:outline-none focus:ring-2 focus:ring-gray-300
            focus:border-gray-400 focus:shadow-md
            focus:-translate-y-0.5
            transition-all duration-300 ease-out"
          />

          <p
            v-if="errors.date"
            class="text-xs text-red-500 mt-1"
          >
            {{ errors.date }}
          </p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Color
          </label>

          <div class="flex items-center gap-3">
            <button
              v-for="colorOption in colors"
              :key="colorOption"
              type="button"
              @click="color = colorOption"
              class="w-7 h-7 rounded-full transition-all duration-200"
              :style="{ backgroundColor: colorOption }"
              :class="
                color === colorOption
                  ? 'ring-2 ring-offset-2 ring-gray-400 scale-110'
                  : 'hover:scale-105'
              "
            ></button>
          </div>
        </div>

      </div>

      <div class="flex justify-end gap-3 mt-6">
        <button
          @click="emit('close')"
          type="button"
          class="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700
          font-semibold text-sm hover:bg-gray-200 transition-colors"
        >
          Cancelar
        </button>

        <button
          @click="save"
          type="button"
          class="btn-primary px-5 py-2.5 rounded-xl text-white
          font-semibold text-sm transition-all duration-300"
        >
          Guardar
        </button>
      </div>
    </div>
  </BaseModal>
</template>

<script setup>
import { ref, watch, onMounted } from "vue"
import { supabase } from "../services/supabase"
import { fetchGroups } from "../services/groups.js"
import BaseModal from "./BaseModal.vue"

const props = defineProps({
  defaultDate: {
    type: [String, Date],
    default: null
  }
})

const emit = defineEmits(["close", "created"])

const title = ref("")
const description = ref("")
const date = ref("")
const color = ref("#34A469")

const reminderType = ref("personal")
const selectedGroupId = ref("")

const groups = ref([])
const loadingGroups = ref(false)

const errors = ref({
  title: "",
  date: ""
})

const colors = [
  "#34A469",
  "#F79C05",
  "#0A88C4",
  "#E3562B"
]

function getToday() {
  const today = new Date()

  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, "0")
  const day = String(today.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}

function getDateValue(value) {
  if (!value) return ""

  if (typeof value === "string") {
    return value.slice(0, 10)
  }

  const year = value.getFullYear()
  const month = String(value.getMonth() + 1).padStart(2, "0")
  const day = String(value.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}

watch(
  () => props.defaultDate,
  (newDate) => {
    if (newDate) {
      date.value = getDateValue(newDate)
    }
  },
  { immediate: true }
)

watch(reminderType, (newType) => {
  if (newType === "personal") {
    selectedGroupId.value = ""
  }
})

async function loadGroups() {
  try {
    loadingGroups.value = true

    const data = await fetchGroups()

    groups.value = data || []
  } catch (error) {
    console.error("Error cargando grupos:", error)
    groups.value = []
  } finally {
    loadingGroups.value = false
  }
}

function validate() {
  errors.value = {
    title: "",
    date: ""
  }

  let valid = true

  if (!title.value.trim()) {
    errors.value.title = "El título es obligatorio"
    valid = false
  }

  if (!date.value) {
    errors.value.date = "La fecha es obligatoria"
    valid = false
  } else if (date.value < getToday()) {
    errors.value.date = "No podés seleccionar una fecha pasada"
    valid = false
  }

  if (
    reminderType.value === "group" &&
    !selectedGroupId.value
  ) {
    valid = false
  }

  return valid
}

async function save() {
  if (!validate()) return

  try {
    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (!user) {
      console.error("Usuario no autenticado")
      return
    }

    const { data, error } = await supabase
      .from("reminders")
      .insert({
        user_id: user.id,
        group_id:
          reminderType.value === "group"
            ? selectedGroupId.value
            : null,
        title: title.value.trim(),
        description: description.value.trim(),
        date: date.value,
        color: color.value
      })
      .select()
      .single()

    if (error) {
      console.error("Error creando recordatorio:", error)
      return
    }

    emit("created", data)
    emit("close")
  } catch (error) {
    console.error("Error creando recordatorio:", error)
  }
}

onMounted(() => {
  loadGroups()
})
</script>