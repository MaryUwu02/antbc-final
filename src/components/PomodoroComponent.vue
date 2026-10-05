<template>
    <div class="flex min-h-screen bg-[#f5f3ef]">
        <NavMobile />

        <main class="flex-1 min-w-0 p-4 md:p-6">
            <div
                class="w-full h-[calc(100vh-48px)]
                bg-white border border-[#e5dfd4]
                rounded-[24px] overflow-hidden
                flex flex-col lg:flex-row"
            >
                <div
                    class="flex-1 min-w-0 p-7 md:p-9 flex flex-col
                    items-center justify-center min-h-0"
                    :class="showTasks ? 'lg:border-r border-[#eee8dc]' : ''"
                >
                    <div class="w-full max-w-2xl">
                        <div class="text-center mb-6">
                            <h2
                                class="font-['Outfit'] text-lg tracking-[0.2em]
                                text-[#2d2926]"
                            >
                                Pomodoro
                            </h2>
                        </div>

                        <div
                            class="flex flex-col sm:flex-row items-stretch justify-center
                            max-w-lg w-full mx-auto gap-1 p-1.5
                            bg-[#f5f1e9] rounded-2xl mb-8"
                        >
                            <button
                                @click="changeMode('focus')"
                                class="flex-1 px-4 py-2.5 rounded-xl text-sm
                                whitespace-nowrap transition-all duration-300"
                                :class="mode === 'focus'
                                    ? 'bg-white text-[#2d2926] shadow-sm font-semibold'
                                    : 'text-[#958d82] hover:text-[#4d4741]'"
                            >
                                Concentración
                            </button>

                            <button
                                @click="changeMode('short')"
                                class="flex-1 px-4 py-2.5 rounded-xl text-sm
                                whitespace-nowrap transition-all duration-300"
                                :class="mode === 'short'
                                    ? 'bg-white text-[#2d2926] shadow-sm font-semibold'
                                    : 'text-[#958d82] hover:text-[#4d4741]'"
                            >
                                Descanso corto
                            </button>

                            <button
                                @click="changeMode('long')"
                                class="flex-1 px-4 py-2.5 rounded-xl text-sm
                                whitespace-nowrap transition-all duration-300"
                                :class="mode === 'long'
                                    ? 'bg-white text-[#2d2926] shadow-sm font-semibold'
                                    : 'text-[#958d82] hover:text-[#4d4741]'"
                            >
                                Descanso largo
                            </button>
                        </div>

                        <div class="flex items-center justify-center py-8">
                            <div
                                class="font-['Outfit'] text-7xl md:text-8xl
                                font-medium tracking-tight text-[#292522]"
                            >
                                {{ formattedTime }}
                            </div>
                        </div>

                        <div class="flex justify-center items-center gap-3 mt-8">
                            <div class="relative group">
                                <button
                                    @click="resetTimer"
                                    class="w-12 h-12 rounded-xl border border-[#e5dfd4]
                                    bg-white text-[#8e867b] hover:text-[#4d4741]
                                    hover:bg-[#faf8f3] transition-all duration-300"
                                >
                                    <i class="fa-solid fa-rotate-left"></i>
                                </button>

                                <span
                                    class="absolute top-full left-1/2 -translate-x-1/2 mt-3
                                    px-3 py-1.5 rounded-lg bg-black
                                    text-white text-sm opacity-0 group-hover:opacity-100
                                    pointer-events-none transition-all duration-200
                                    whitespace-nowrap z-50 shadow-md"
                                >
                                    Reiniciar
                                </span>
                            </div>

                            <button
                                @click="toggleTimer"
                                class="px-7 py-3 rounded-xl btn-primary text-white
                                font-semibold shadow-sm hover:shadow-md
                                hover:-translate-y-[1px] active:translate-y-0
                                transition-all duration-300"
                            >
                                <i
                                    class="fa-solid mr-2"
                                    :class="isRunning ? 'fa-pause' : 'fa-play'"
                                ></i>

                                {{ isRunning ? "Pausar" : "Empezar" }}
                            </button>

                            <div class="relative group">
                                <button
                                    @click="showTasks = !showTasks"
                                    class="w-12 h-12 rounded-xl border border-[#e5dfd4]
                                    bg-white text-[#8e867b] hover:bg-[#faf8f3]
                                    hover:text-[#4d4741] transition-all duration-300"
                                >
                                    <i class="fa-solid fa-list-check"></i>
                                </button>

                                <span
                                    class="absolute top-full left-1/2 -translate-x-1/2 mt-3
                                    px-3 py-1.5 rounded-lg bg-black
                                    text-white text-sm opacity-0 group-hover:opacity-100
                                    pointer-events-none transition-all duration-200
                                    whitespace-nowrap z-50 shadow-md"
                                >
                                    Tareas
                                </span>
                            </div>
                        </div>

                        <div class="flex justify-center items-center gap-2 mt-6">
                            <span
                                class="w-2 h-2 rounded-full transition-all duration-300"
                                :class="mode === 'focus'
                                    ? 'bg-[#F79C05] scale-125'
                                    : 'bg-[#d8d2c8]'"
                            ></span>

                            <span
                                class="w-2 h-2 rounded-full transition-all duration-300"
                                :class="mode === 'short'
                                    ? 'bg-[#F79C05] scale-125'
                                    : 'bg-[#d8d2c8]'"
                            ></span>

                            <span
                                class="w-2 h-2 rounded-full transition-all duration-300"
                                :class="mode === 'long'
                                    ? 'bg-[#F79C05] scale-125'
                                    : 'bg-[#d8d2c8]'"
                            ></span>
                        </div>
                    </div>
                </div>

                <Transition name="tasks">
                    <PomodoroTasks
                        v-if="showTasks"
                        :group-id="props.id"
                        class="w-full lg:w-[380px] lg:flex-shrink-0"
                        @close="showTasks = false"
                    />
                </Transition>
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from "vue"
import NavMobile from "./mobile/NavMobile.vue"
import PomodoroTasks from "./PomodoroTasks.vue"

const props = defineProps({
    id: {
        type: String,
        required: true
    }
})

const modes = {
    focus: 25 * 60,
    short: 5 * 60,
    long: 15 * 60
}

const mode = ref("focus")
const timeLeft = ref(modes.focus)
const isRunning = ref(false)
const showTasks = ref(false)

let timer = null

const formattedTime = computed(() => {
    const minutes = Math.floor(timeLeft.value / 60)
    const seconds = timeLeft.value % 60

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
})

function toggleTimer() {
    if (isRunning.value) {
        pauseTimer()
    } else {
        startTimer()
    }
}

function startTimer() {
    isRunning.value = true

    timer = setInterval(() => {
        if (timeLeft.value > 0) {
            timeLeft.value--
        } else {
            nextMode()
        }
    }, 1000)
}

function pauseTimer() {
    isRunning.value = false

    clearInterval(timer)

    timer = null
}

function resetTimer() {
    pauseTimer()

    timeLeft.value = modes[mode.value]
}

function changeMode(newMode) {
    pauseTimer()

    mode.value = newMode
    timeLeft.value = modes[newMode]
}

function nextMode() {
    pauseTimer()

    if (mode.value === "focus") {
        mode.value = "short"
    } else if (mode.value === "short") {
        mode.value = "focus"
    } else {
        mode.value = "focus"
    }

    timeLeft.value = modes[mode.value]
}

onUnmounted(() => {
    clearInterval(timer)
})
</script>
<style scoped>
.tasks-enter-active,
.tasks-leave-active {
    transition:
        transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
        opacity 0.3s ease;
}

.tasks-enter-from,
.tasks-leave-to {
    opacity: 0;
    transform: translateX(40px);
}
</style>