<template>
  <BaseModal @close="$emit('close')">

    <div class="bg-white rounded-xl shadow-lg p-6">

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
            rows="3"
            placeholder="Descripción"
            class="w-full px-4 py-2 rounded-lg border border-gray-300
            focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">
            Fecha
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
          class="px-4 py-2 text-sm font-medium text-gray-600"
        >
          Cancelar
        </button>

        <button
          @click="save"
          class="px-5 py-2 rounded-lg btn-primary text-white"
        >
          Guardar
        </button>

      </div>

    </div>

  </BaseModal>
</template>

<script setup>
import { ref, watch } from "vue"
import BaseModal from "./BaseModal.vue"
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
  }

  return Object.keys(errors.value).length === 0
}

async function save() {
  if (!validate()) return

  const { data: { user } } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from("reminders")
    .insert({
      user_id: user.id,
      title: title.value,
      description: description.value,
      date: date.value
    })
    .select()

  if (error) {
    console.error(error)
    return
  }

  emit("created", data[0])
  emit("close")
}
</script>