<template>
    <section class="h-full min-h-0 flex flex-col bg-white">
        <div
            ref="chatContainer"
            class="chatScroll flex-1 min-h-0 overflow-y-auto px-6 py-5 space-y-4"
        >
            <div
                v-for="(message, index) in messages"
                :key="message.id"
            >
                <div
                    v-if="isDifferentDay(message, messages[index - 1])"
                    class="flex justify-center my-5"
                >
                    <span
                        class="px-4 py-2 bg-[#F5F5F5] rounded-lg text-xs text-gray-500"
                    >
                        {{ formatMessageDate(message.created_at) }}
                    </span>
                </div>

                <div
                    class="flex"
                    :class="isMyMessage(message)
                        ? 'justify-end'
                        : 'justify-start'"
                >
                    <div
                        class="max-w-[70%] px-4 py-3 rounded-2xl break-words shadow-sm"
                        :class="isMyMessage(message)
                            ? 'bg-[#140E0C] text-white rounded-br-md'
                            : 'bg-[#F5F5F5] text-[#332926] rounded-bl-md'"
                    >
                        <p
                            v-if="!isMyMessage(message)"
                            class="text-xs font-bold mb-1 text-[#FF5A3C]"
                        >
                            {{ message.profiles?.[0]?.username || 'Usuario' }}
                        </p>

                        <p class="text-sm leading-relaxed">
                            {{ message.text }}
                        </p>

                        <p
                            class="text-[11px] mt-1 text-right"
                            :class="isMyMessage(message)
                                ? 'text-gray-300'
                                : 'text-gray-400'"
                        >
                            {{
                                new Date(message.created_at).toLocaleTimeString(
                                    'es-AR',
                                    {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: false
                                    }
                                )
                            }}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <form
            @submit.prevent="handleSubmit"
            class="shrink-0 flex gap-3 px-6 py-5 bg-white"
        >
            <input
                v-model="newMessage"
                type="text"
                placeholder="Escribí un mensaje..."
                class="flex-1 min-w-0 px-5 py-3 bg-[#F7F7F7] rounded-full text-sm text-[#332926] outline-none focus:ring-2 focus:ring-[#E5E5E5]"
            />
            <button
                type="submit"
                class="w-12 h-12 shrink-0 rounded-full bg-[#140E0C] text-white flex items-center justify-center hover:bg-[#332926] transition"
            >
                <i class="fa-solid fa-paper-plane"></i>
            </button>
        </form>
    </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { fetchGroupMessages, sendMessage, subscribeToNewMessage } from '../../services/chatService'
import { supabase } from '../../services/supabase.js'

const props = defineProps({
    groupId: {
        type: String,
        required: true
    }
})

const messages = ref([])
const newMessage = ref('')
const chatChannel = ref(null)
const currentUserId = ref(null)
const chatContainer = ref(null)

const scrollToBottom = async () => {
    await nextTick()
    if (chatContainer.value) {
        chatContainer.value.scrollTop =
            chatContainer.value.scrollHeight
    }
}

const isMyMessage = (message) => {
    return message.user_id === currentUserId.value
}

const isDifferentDay = (currentMessage, previousMessage) => {

    if (!previousMessage) {
        return true
    }
    const currentDate = new Date(currentMessage.created_at)
    const previousDate = new Date(previousMessage.created_at)

    return (
        currentDate.getFullYear() !== previousDate.getFullYear() ||
        currentDate.getMonth() !== previousDate.getMonth() ||
        currentDate.getDate() !== previousDate.getDate()
    )
}

const formatMessageDate = (date) => {

    const messageDate = new Date(date)
    const today = new Date()
    const yesterday = new Date()
    yesterday.setDate(today.getDate() - 1)

    if(
        messageDate.getDate() === today.getDate() &&
        messageDate.getMonth() === today.getMonth() &&
        messageDate.getFullYear() === today.getFullYear()
    ){
        return 'Hoy'
    }

    if(
        messageDate.getDate() === yesterday.getDate() &&
        messageDate.getMonth() === yesterday.getMonth() &&
        messageDate.getFullYear() === yesterday.getFullYear()
    ){
        return 'Ayer'
    }

    return messageDate.toLocaleDateString(
        'es-AR',
        {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }
    )
}

const loadChat = async () => {
    try {
        if (chatChannel.value) {
            chatChannel.value.unsubscribe()
            chatChannel.value = null
        }
        messages.value = []
        messages.value = await fetchGroupMessages(props.groupId)
        await scrollToBottom()

        chatChannel.value =
            subscribeToNewMessage(
                props.groupId,
                async (newMessage) => {
                    const alreadyExists =
                        messages.value.some(
                            message => message.id === newMessage.id
                        )
                        if (alreadyExists) {
                            return
                        }

                        const { data: profile } =
                            await supabase
                            .from('profiles')
                            .select('username')
                            .eq('id', newMessage.user_id)
                            .single()

                            newMessage.profiles = [profile]
                            messages.value.push(newMessage)
                        await scrollToBottom()
                    }
                )
        } catch (error) {
            console.error(
                'Error al cargar el chat:',
                error
            )
        }
}

const handleSubmit = async () => {
    const text = newMessage.value.trim()

    if (!text) {
        return
    }

    try {
        await sendMessage(
            props.groupId,
            text
        )
        newMessage.value = ''
        messages.value =
            await fetchGroupMessages(props.groupId)
            await scrollToBottom()

    } catch (error) {
        console.error(
            'Error al enviar:',
            error
        )
    }
}

onMounted(async () => {
    try {
        const {
            data: { user },
            error
        } = await supabase.auth.getUser()

        if (error) {
            throw error
        }

        if (!user) {
            console.error(
                'No hay usuario autenticado'
            )
            return
        }
        currentUserId.value = user.id
        await loadChat()
    } catch (error) {
        console.error(
            'Error al iniciar el chat:',
            error
        )
    }
})

watch(
    () => props.groupId,
    async (newGroupId, oldGroupId) => {
        if (
            newGroupId &&
            newGroupId !== oldGroupId
        ) {
            await loadChat()
        }
    }
)

onBeforeUnmount(() => {
    if (chatChannel.value) {
        chatChannel.value.unsubscribe()
        chatChannel.value = null
    }
})
</script>