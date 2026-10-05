<template>

    <div class="flex gap-4">
        <button
            class="px-6 py-2 rounded-lg font-semibold text-gray-800 bg-gray-200 hover:bg-gray-300 transition"
        >
            Seguimiento
        </button>

        <router-link
    :to="`/pomodorocomponent/${groupId}`"
            class="px-6 py-2 rounded-lg font-semibold text-gray-800 bg-gray-200 hover:bg-gray-300 transition"
        >
            Pomodoro
        </router-link>

        <router-link
            :to="`/flashcard/${groupId}`"
            class="px-6 py-2 rounded-lg font-semibold text-gray-800 bg-gray-200 hover:bg-gray-300 transition"
        >
            Flashcard
        </router-link>
        
        
        <div ref="moreMenu" class="relative">
            <button
                @click="showMore = !showMore"
                class="px-6 py-2 rounded-lg font-semibold text-gray-800 bg-gray-200 hover:bg-gray-300 transition"
            >
                Más
                <i
                    class="fa-solid fa-chevron-down ml-2 text-xs"
                    :class="{ 'rotate-180': showMore }"
                ></i>
            </button>

            <div
                v-if="showMore"
                class="absolute right-0 mt-2 w-48 bg-white
                border border-[#e8e2d9] rounded-xl shadow-lg
                overflow-hidden z-50"
            >
                <div class="p-1.5">
                    <button
                        @click="$emit('invite'); showMore = false"
                        class="w-full flex items-center gap-3
                        px-3 py-2.5 rounded-lg
                        text-sm text-[#4d4741]
                        hover:bg-[#f7f4ee]
                        transition-colors duration-200"
                    >
                        Invitar
                    </button>

                    <button
                        @click="$emit('leave'); showMore = false"
                        class="w-full flex items-center gap-3
                        px-3 py-2.5 rounded-lg
                        text-sm text-red-500
                        hover:bg-red-50
                        transition-colors duration-200"
                    >
                        Abandonar
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue"

const showMore = ref(false)
const moreMenu = ref(null)

defineProps({
    groupId: {
        type: String,
        required: true
    }
})

function handleClickOutside(event) {
    if (
        moreMenu.value &&
        !moreMenu.value.contains(event.target)
    ) {
        showMore.value = false
    }
}

onMounted(() => {
    document.addEventListener("click", handleClickOutside)
})

onBeforeUnmount(() => {
    document.removeEventListener("click", handleClickOutside)
})
</script>