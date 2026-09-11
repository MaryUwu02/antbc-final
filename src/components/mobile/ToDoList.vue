<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../../services/supabase.js'

const props = defineProps({ memberId: String })
const tasks = ref([])
const loading = ref(false)
const errorMsg = ref(null)

onMounted(async () => {
  await loadTasks()
})

async function loadTasks() {
  loading.value = true
  errorMsg.value = null
  try {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('member_id', props.memberId)

    if (error) throw error
    tasks.value = (data || []).map(t => ({
      ...t,
      completed: t.completed === true,
    }))
  } catch (err) {
    console.error('Error cargando tareas:', err)
    errorMsg.value = 'No se pudieron cargar las tareas.'
  } finally {
    loading.value = false
  }
}

async function toggleTask(task) {
  const prev = !!task.completed
  task.completed = !prev

  try {
    const { error } = await supabase
      .from('tasks')
      .update({ completed: task.completed })
      .eq('id', task.id)

    if (error) {
      task.completed = prev
      console.error('Error actualizando tarea:', error)
      errorMsg.value = 'No se pudo actualizar la tarea.'
    }
  } catch (err) {
    task.completed = prev
    console.error('Excepción al actualizar tarea:', err)
    errorMsg.value = 'Error inesperado al actualizar.'
  }
}
</script>

<template>
  <div class="space-y-3">
    <h3 class="font-bold text-lg">To Do List</h3>

    <div v-if="loading" class="text-sm text-gray-500">Cargando tareas...</div>
    <div v-if="errorMsg" class="text-sm text-red-600">{{ errorMsg }}</div>

    <div v-if="!loading && tasks.length === 0" class="text-sm text-gray-500">
      Este integrante no tiene tareas pendientes 
    </div>

    <div
      v-for="task in tasks"
      :key="task.id"
      class="bg-purple-100 p-3 rounded-xl flex justify-between items-center"
    >
      <div>
        <h4 class="font-semibold">{{ task.title }}</h4>
        <p class="text-sm">{{ task.description }}</p>
        <p class="text-xs text-gray-600">Fecha límite: {{ task.deadline }}</p>
      </div>

      <input
        type="checkbox"
        :checked="!!task.completed"
        @change="toggleTask(task)"
        class="accent-purple-500 w-5 h-5"
      />
    </div>
  </div>
</template>
