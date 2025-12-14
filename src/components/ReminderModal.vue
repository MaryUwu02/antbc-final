<template>
  <teleport to="body">
    <Transition name="modal" appear>
      <div class="fixed inset-0 z-50 flex items-center justify-center">

        <div 
        class="absolute inset-0 backdrop-blur-[2px] bg-black/20"
        @click="close"
        >
        </div>

        <div class="relative bg-white rounded-xl shadow-lg p-6 w-full max-w-md">

          <h2 class="text-xl font-bold text-gray-900 mb-4">
            Nuevo recordatorio
          </h2>

          <div class="flex flex-col gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">
                  Nombre del recordatorio
              </label>
              <input
                v-model="title"
                type="text"
                placeholder="Título"
                class="w-full px-4 py-2 rounded-lg border border-gray-300
                focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <p v-if="errors.title" class="text-red-600 text-sm mt-1">
                {{ errors.title }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">
                Descripción
              </label>
              <textarea
                v-model="description"
                placeholder="Descripción (opcional)"
                rows="3"
                class="w-full px-4 py-2 rounded-lg border border-gray-300
                focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">
                Fecha del recordatorio
              </label>
              <input
                v-model="date"
                type="date"
                class="w-full px-4 py-2 rounded-lg border border-gray-300
                focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <p v-if="errors.date" class="text-red-600 text-sm mt-1">
                {{ errors.date }}
              </p>
            </div>
          </div>

          <div class="flex justify-end gap-3 mt-6">
            <button
              @click="$emit('close')"
              class="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
            >
              Cancelar
            </button>

            <button
              @click="save"
              class="px-5 py-2 rounded-lg bg-green-600 text-white
              font-semibold hover:bg-green-700 transition"
            >
              Guardar
            </button>
          </div>

        </div>

      </div>
    </Transition>
  </teleport>
</template>

<script setup>
import { ref, watch } from "vue"
import { supabase } from "../services/supabase.js"
const emit = defineEmits(["close", "created"])

const props = defineProps({
  defaultDate: String
})

const title = ref("")
const description = ref("")
const date = ref("")
const errors = ref({})

watch(() => props.defaultDate, (v) => {
  if (v) date.value = v
})

function validate() {
  errors.value = {}

  if (!title.value.trim()) {
    errors.value.title = "El título es obligatorio"
  }

  if (!date.value) {
    errors.value.date = "La fecha es obligatoria"
  } else {
    const selected = new Date(date.value)
    const today = new Date()

    selected.setHours(0, 0, 0, 0)
    today.setHours(0, 0, 0, 0)

    if (selected < today) {
      errors.value.date = "No podés crear recordatorios en fechas pasadas"
    }
  }
  return Object.keys(errors.value).length === 0
}

async function save() {
  if (!validate()) return

  const { data: { user } } = await supabase.auth.getUser()

  const { data, error } = await supabase.from("reminders").insert({
    user_id: user.id,
    title: title.value,
    description: description.value,
    date: date.value
  }).select()

  if (error) {
    console.error(error)
    return
  }

  emit("created", data[0])
  emit("close")
}
</script>