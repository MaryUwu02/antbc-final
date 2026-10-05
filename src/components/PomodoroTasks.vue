<template>
  <div
    class="bg-[#fffdf8] p-6 flex flex-col
    min-h-[560px]"
  >
    <div class="flex items-start justify-between mb-6">

      <div>

        <h3 class="font-['Outfit'] text-2xl font-medium text-[#2d2926]">
          Mis tareas
        </h3>
      </div>

      <button
        @click="$emit('close')"
        class="w-10 h-10 rounded-xl text-[#958d82]
        hover:bg-[#f5f1e9] hover:text-[#4d4741]
        transition"
      >
        <i class="fa-solid fa-xmark"></i>
      </button>

    </div>

    <button
      @click="addTask"
      class="w-full flex items-center justify-center gap-2
      px-4 py-3 rounded-xl border border-dashed
      border-[#d8d0c3] text-[#7d756b]
      hover:bg-[#f8f5ee] hover:text-[#4d4741]
      transition mb-5"
    >
      <i class="fa-solid fa-plus text-sm"></i>
      Nueva tarea
    </button>

    <div class="flex-1 overflow-y-auto space-y-3 pr-1">

      <div
        v-for="task in tasks"
        :key="task.id"
        class="bg-white border border-[#eee8dc]
        rounded-2xl p-4 transition-all duration-300"
        :class="task.completed ? 'opacity-60' : ''"
      >

        <div class="flex items-start gap-3">

          <button
            @click="toggleTask(task)"
            class="flex-shrink-0 w-5 h-5 mt-1 rounded-full
            border-2 flex items-center justify-center
            transition-all duration-200"
            :class="task.completed
              ? 'bg-[#34A469] border-[#34A469] text-white'
              : 'border-[#cfc7ba] hover:border-[#34A469]'"
          >
            <i
              v-if="task.completed"
              class="fa-solid fa-check text-[10px]"
            ></i>
          </button>

          <div class="flex-1 min-w-0">

            <input
              v-model="task.title"
              @blur="saveTask(task)"
              type="text"
              placeholder="Título de la tarea"
              class="w-full bg-transparent border-none outline-none
              font-medium text-[#2d2926]
              placeholder:text-[#b4aca1]"
              :class="task.completed ? 'line-through' : ''"
            />

            <textarea
                v-model="task.description"
                @blur="saveTask(task)"
                rows="2"
                placeholder="Descripción"
                class="w-full mt-1 bg-transparent border-none
                outline-none resize-none text-sm text-[#8e867b]
                placeholder:text-[#c0b8ad]"
                :class="task.completed ? 'line-through' : ''"
            ></textarea>

          </div>

          <button
            @click="deleteTask(task.id)"
            class="flex-shrink-0 text-[#c0b8ad]
            hover:text-red-500 transition"
          >
          <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>

      <div
        v-if="tasks.length === 0"
        class="flex flex-col items-center justify-center
        text-center py-16 text-[#aaa196]"
      >
        <p class="text-gray-500 font-body text-sm italic">
          No tenés tareas todavía.
        </p>

        <p class="text-gray-500 font-body text-sm italic">
          Agregá una para comenzar.
        </p>
      </div>

    </div>

  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import {
    getPomodoroTasks,
    createPomodoroTask,
    updatePomodoroTask,
    deletePomodoroTask
} from "../services/pomodoroTask.js";

const props = defineProps({
    groupId: {
        type: String,
        required: true
    }
});

defineEmits(["close"]);

const tasks = ref([]);
const loading = ref(true);

onMounted(async () => {
    try {
        tasks.value = await getPomodoroTasks(props.groupId);
    } catch (error) {
        console.error("Error al cargar las tareas:", error);
    } finally {
        loading.value = false;
    }
});

async function addTask() {
    try {
        const task = await createPomodoroTask(props.groupId);

        tasks.value.push(task);
    } catch (error) {
        console.error("Error al crear la tarea:", error);
    }
}

async function toggleTask(task) {
    try {
        const completed = !task.completed;

        await updatePomodoroTask(task.id, {
            completed
        });

        task.completed = completed;
    } catch (error) {
        console.error("Error al actualizar la tarea:", error);
    }
}

async function saveTask(task) {
    try {
        await updatePomodoroTask(task.id, {
            title: task.title,
            description: task.description
        });
    } catch (error) {
        console.error("Error al guardar la tarea:", error);
    }
}

async function deleteTask(id) {
    try {
        await deletePomodoroTask(id);

        tasks.value = tasks.value.filter(
            task => task.id !== id
        );
    } catch (error) {
        console.error("Error al eliminar la tarea:", error);
    }
}
</script>