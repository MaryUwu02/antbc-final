<template>
    <div class="flex-1 min-h-0 flex flex-col">
        <Search v-model="search" />
        <div
            v-if="filteredChats.length === 0"
            class="flex-1 flex items-center justify-center"
        >
            <p class="text-sm text-gray-400">
                No hay chats disponibles.
            </p>
        </div>

        <ul
            v-else
            class="flex-1 min-h-0 mt-5 overflow-y-auto space-y-2 pr-1"
        >
            <li
                v-for="chat in filteredChats"
                :key="chat.id"
            >
                <button
                    type="button"
                    @click="$emit('select-chat', chat)"
                    class="w-full flex items-center gap-3 p-3 rounded-xl text-left transition"
                    :class="selectedChat?.id === chat.id
                        ? 'bg-[#F7F7F7]'
                        : 'hover:bg-[#F7F7F7]'"
                >
                    <div
                        class="w-11 h-11 rounded-full bg-[#140E0C] text-white flex items-center justify-center font-semibold shrink-0"
                    >
                        {{ chat.name?.charAt(0).toUpperCase() }}
                    </div>

                    <div class="flex-1 min-w-0">
                        <div class="flex items-center justify-between gap-2">
                            <span
                                class="font-semibold text-[#332926] truncate"
                            >
                                {{ chat.name }}
                            </span>

                            <span
                                v-if="chat.last_message_at"
                                class="text-xs text-gray-400 shrink-0"
                            >
                                {{
                                    new Date(chat.last_message_at).toLocaleTimeString(
                                        'es-AR',
                                        {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: false
                                        }
                                    )
                                }}
                            </span>
                        </div>
                        <span
                            class="block text-sm text-gray-500 truncate mt-0.5"
                        >
                            {{ chat.last_message || 'Todavía no hay mensajes' }}
                        </span>
                    </div>
                </button>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Search from '../../components/mobile/Search.vue'

const props = defineProps({
    chats: {
        type: Array,
        default: () => []
    },
    selectedChat: {
        type: Object,
        default: null
    }
})

defineEmits(['select-chat'])
const search = ref('')

const filteredChats = computed(() => {
    if (!search.value.trim()) {
        return props.chats
    }

    return props.chats.filter(chat =>
        chat.name
            ?.toLowerCase()
            .includes(search.value.toLowerCase())
    )
})
</script>