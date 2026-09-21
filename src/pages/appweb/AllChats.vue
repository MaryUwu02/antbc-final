<template>
    <div class="flex h-screen overflow-hidden bg-[#FAFAFA]">

        <NavMobile />

        <main class="flex-1 min-w-0 min-h-0 overflow-hidden">
            <div class="grid grid-cols-1 md:grid-cols-[35%_65%] h-full min-h-0">
                <section class="min-h-0 flex flex-col bg-white px-5 py-7 md:px-6">
                    <div class="shrink-0 mb-7">
                        <h1 class="font-['Outfit'] font-bold text-3xl text-[#332926]">
                            Mis chats grupales
                        </h1>
                        <p class="mt-1 text-sm text-gray-500">
                            Seleccioná un grupo para ver la conversación.
                        </p>
                    </div>
                    <ListChats
                        :chats="chats"
                        :selected-chat="selectedChat"
                        @select-chat="selectChat"
                    />
                </section>
                <section class="hidden md:flex min-w-0 min-h-0 p-3">
                    <div class="flex-1 min-w-0 min-h-0 bg-white rounded-2xl overflow-hidden flex flex-col">
                        <div
                            v-if="selectedChat"
                            class="flex-1 min-h-0 flex flex-col"
                        >
                            <div class="shrink-0 px-6 py-5 flex items-center gap-3">
                                <div
                                    class="w-12 h-12 rounded-full bg-[#140E0C] text-white flex items-center justify-center font-semibold shrink-0"
                                >
                                    {{ selectedChat.name?.charAt(0).toUpperCase() }}
                                </div>
                                <div class="min-w-0">
                                    <h2
                                        class="font-['Outfit'] font-semibold text-xl text-[#332926] truncate"
                                    >
                                        {{ selectedChat.name }}
                                    </h2>
                                    <p class="text-sm text-gray-500">
                                        Chat grupal
                                    </p>
                                </div>
                            </div>
                            <div class="flex-1 min-h-0 overflow-hidden">
                                <Chats
                                    :group-id="selectedChat.group_id"
                                />
                            </div>
                        </div>
                        <div
                            v-else
                            class="flex-1 flex items-center justify-center"
                        >
                            <div class="text-center px-6">
                                <p class="text-sm text-gray-500">
                                    Seleccioná un grupo para ver la conversación.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <div
                v-if="selectedChat"
                class="md:hidden fixed inset-0 z-50 bg-white flex flex-col"
            >
                <div class="shrink-0 px-5 py-4 flex items-center gap-3">
                    <button
                        type="button"
                        @click="selectedChat = null"
                        class="w-9 h-9 flex items-center justify-center text-[#332926]"
                    >
                        ←
                    </button>
                    <div
                        class="w-10 h-10 rounded-full bg-[#140E0C] text-white flex items-center justify-center font-semibold"
                    >
                        {{ selectedChat.name?.charAt(0).toUpperCase() }}
                    </div>
                    <div class="min-w-0">
                        <h2 class="font-semibold text-[#332926] truncate">
                            {{ selectedChat.name }}
                        </h2>
                        <p class="text-sm text-gray-500">
                            Chat grupal
                        </p>
                    </div>
                </div>
                <div class="flex-1 min-h-0 overflow-hidden">
                    <Chats
                        :group-id="selectedChat.group_id"
                    />
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import NavMobile from '../../components/mobile/NavMobile.vue'
import ListChats from '../../components/mobile/ListChats.vue'
import Chats from '../../pages/appweb/Chats.vue'
import { fetchGroups } from '../../services/groups'

const chats = ref([])
const selectedChat = ref(null)
const loading = ref(true)

function selectChat(chat) {
    selectedChat.value = chat
}

async function loadChats() {
    try {
        loading.value = true
        chats.value = await fetchGroups()
    } catch (error) {
        console.error('Error al cargar los chats:', error)
    } finally {
        loading.value = false
    }
}

onMounted(loadChats)
</script>