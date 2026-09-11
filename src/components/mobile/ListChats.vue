
<template>
  <div class="flex h-screen">

    <div class="w-80 border-r p-4">

      <Search v-model="search" />

      <ul class="space-y-2 mt-4">
        <li
          v-for="chat in filteredChats"
          :key="chat.id"
        >
          <router-link
            :to="`/group/${chat.id}`"
            class="flex items-center gap-3 p-3 hover:bg-gray-100 transition"
          >
            <div class="w-10 h-10 rounded-full bg-[#140E0C] text-white flex items-center justify-center font-semibold">
              {{ chat.name.charAt(0).toUpperCase() }}
            </div>

            <div class="flex flex-col">
              <span class="font-semibold text-[#332926]">
                {{ chat.name }}
              </span>

              <span class="text-sm text-gray-500">
                Mensaje...
              </span>
            </div>
          </router-link>
        </li>
      </ul>
    </div>

    <div class="flex-1 flex flex-col">
      <div class="border-b p-4 font-semibold">
        nombre del chat
      </div>

      <div class="flex-1 p-4 overflow-y-auto">
        aca van los chats funcionales
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { fetchOwnedGroups } from '../../services/groups'
import Search from '../../components/mobile/Search.vue';

const search = ref('')
const chats = ref([])
const loading = ref(true)

const filteredChats = computed(() => {
  if (!search.value) return chats.value

  return chats.value.filter(chat =>
    chat.name
      .toLowerCase()
      .includes(search.value.toLowerCase())
  )
})

async function loadChats() {
  loading.value = true
  chats.value = await fetchOwnedGroups()
  loading.value = false
}

onMounted(loadChats)

</script>