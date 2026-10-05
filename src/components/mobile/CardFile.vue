<template>
  <div
    v-if="file"
    class="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden"
  >
    <img
      v-if="file.image"
      :src="imageUrl"
      class="w-full h-36 object-cover"
    />

    <div class="p-5 flex flex-col gap-3">

      <div class="flex justify-between items-start">
        <h4 class="font-['Outfit'] font-medium text-lg text-gray-900">
          {{ file.name }}
        </h4>

        <div class="flex items-center gap-1">

          <i
            class="fa-regular fa-star text-gray-400 cursor-pointer p-2 hover:text-yellow-500 transition"
            @click.stop="toggleFavorite"
          ></i>

          <div class="relative">

            <i
              class="fa-solid fa-ellipsis-vertical text-gray-400 cursor-pointer p-2 rounded hover:bg-gray-100"
              @click.stop="toggleMenu"
            ></i>

            <transition name="fade-scale">
              <div
                v-if="open"
                class="absolute right-0 mt-2 w-44 bg-white border border-gray-100 rounded-lg shadow-lg z-50"
              >
                <ul class="py-1 text-sm text-gray-700">

                  <li>
                    <button
                      class="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      @click="editFile"
                    >
                      Editar documento
                    </button>
                  </li>

                  <li>
                    <button
                      class="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      @click="ArchiveFile"
                    >
                      Archivar documento
                    </button>
                  </li>

                  <li>
                    <button
                      class="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      @click="duplicateFile"
                    >
                      Duplicar documento
                    </button>
                  </li>

                  <li>
                    <button
                      class="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                      @click="deleteFile"
                    >
                      Eliminar documento
                    </button>
                  </li>

                </ul>
              </div>
            </transition>

          </div>

        </div>
      </div>

      <p class="text-xs text-gray-400">
        Última edición: {{ file.updatedAt || "hace poco" }}
      </p>

      <div class="flex flex-wrap gap-2">
        <span
          v-for="(tag, index) in file.tags"
          :key="index"
          class="px-2 py-1 text-xs rounded-full bg-gray-200 text-gray-700"
        >
          {{ tag }}
        </span>
      </div>

    </div>
  </div>

  <button
    v-else
    type="button"
    @click="createFile"
    class="bg-white rounded-2xl shadow border border-gray-100
    min-h-[250px] flex flex-col items-center justify-center
    gap-3 text-gray-400
    hover:text-gray-700 hover:shadow-md hover:-translate-y-0.5
    transition-all duration-300"
  >
    <div
      class="w-12 h-12 rounded-full bg-gray-100
      flex items-center justify-center"
    >
      <i class="fa-solid fa-plus text-xl"></i>
    </div>

    <span class="font-['Outfit'] font-medium text-sm">
      Crear documento
    </span>
  </button>
</template>

<script setup>
import { ref, computed } from "vue"

const props = defineProps({
  file: {
    type: Object,
    default: null
  }
})

const emit = defineEmits([
  "create",
  "edit",
  "archive",
  "duplicate",
  "delete",
  "favorite"
])

const open = ref(false)

const imageUrl = computed(() => {
  if (!props.file?.image) return null
  return URL.createObjectURL(props.file.image)
})

function createFile() {
  emit("create")
}

function toggleMenu() {
  open.value = !open.value
}

function toggleFavorite() {
  emit("favorite", props.file)
}

function editFile() {
  open.value = false
  emit("edit", props.file)
}

function ArchiveFile() {
  open.value = false
  emit("archive", props.file)
}

function duplicateFile() {
  open.value = false
  emit("duplicate", props.file)
}

function deleteFile() {
  open.value = false
  emit("delete", props.file)
}
</script>

<style scoped>
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.15s ease;
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>