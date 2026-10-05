<template>
    <BaseModal
        maxWidth="max-w-2xl"
        @close="emit('close')"
    >
        <div
            class="bg-[#fffdf8] rounded-[24px] p-6 md:p-8
            border border-[#eee8dc]"
        >

            <div class="flex items-center justify-between mb-6">
                <div>
                    <p class="text-sm text-[#9b9387] mb-1">
                        Estudiando
                    </p>

                    <h2
                        class="font-['Outfit'] text-2xl font-semibold
                        text-[#2d2926]"
                    >
                        {{ flashcard.title }}
                    </h2>
                </div>

                <button
                    @click="emit('close')"
                    class="w-10 h-10 rounded-xl text-[#958d82]
                    hover:bg-[#f5f1e9] hover:text-[#2d2926] transition"
                >
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>

            <div v-if="!finished">

                <div class="flex items-center justify-between mb-3">
                    <span class="text-sm text-[#9b9387]">
                        Pregunta {{ currentIndex + 1 }} de {{ questions.length }}
                    </span>

                    <span class="text-sm font-semibold text-[#34A469]">
                        {{ score }} correctas
                    </span>
                </div>

                <div
                    class="w-full h-2 bg-[#eee8dc] rounded-full
                    overflow-hidden mb-6"
                >
                    <div
                        class="h-full bg-[#34A469] rounded-full
                        transition-all duration-300"
                        :style="{
                            width: `${((currentIndex + 1) / questions.length) * 100}%`
                        }"
                    ></div>
                </div>

                <div
                    class="bg-[#f5f1e9] rounded-2xl p-6 mb-6 text-center"
                >
                    <p class="text-sm text-[#9b9387] mb-3">
                        {{
                            currentQuestion.type === "term"
                                ? "¿Cuál es la definición correcta?"
                                : "¿Cuál es el término correcto?"
                        }}
                    </p>

                    <p
                        class="font-['Outfit'] text-xl md:text-2xl
                        font-semibold text-[#2d2926]"
                    >
                        {{ currentQuestion.question }}
                    </p>
                </div>

                <div class="grid gap-3">
                    <button
                        v-for="(option, index) in currentQuestion.options"
                        :key="index"
                        @click="selectAnswer(option)"
                        :disabled="selectedAnswer !== null"
                        class="w-full text-left px-5 py-4 rounded-xl
                        border transition duration-200"
                        :class="getOptionClass(option)"
                    >
                        <div class="flex items-center gap-3">

                            <span
                                class="w-8 h-8 flex-shrink-0 rounded-lg
                                flex items-center justify-center
                                font-semibold text-sm"
                                :class="getOptionNumberClass(option)"
                            >
                                {{ String.fromCharCode(65 + index) }}
                            </span>

                            <span class="text-sm md:text-base">
                                {{ option }}
                            </span>

                            <i
                                v-if="
                                    selectedAnswer !== null &&
                                    option === currentQuestion.correctAnswer
                                "
                                class="fa-solid fa-check ml-auto text-[#34A469]"
                            ></i>

                            <i
                                v-if="
                                    selectedAnswer !== null &&
                                    option === selectedAnswer &&
                                    option !== currentQuestion.correctAnswer
                                "
                                class="fa-solid fa-xmark ml-auto text-[#E3562B]"
                            ></i>

                        </div>
                    </button>
                </div>

                <div class="flex justify-end mt-6">
                    <button
                        v-if="selectedAnswer !== null"
                        @click="nextQuestion"
                        class="px-5 py-3 rounded-xl bg-[#34A469]
                        text-white font-semibold hover:bg-[#2f955e]
                        transition"
                    >
                        {{
                            currentIndex === questions.length - 1
                                ? "Ver resultado"
                                : "Siguiente"
                        }}

                        <i class="fa-solid fa-arrow-right ml-2"></i>
                    </button>
                </div>

            </div>

            <div
                v-else
                class="text-center py-8"
            >
                <p class="text-sm text-[#9b9387] mb-2">
                    ¡Terminaste!
                </p>

                <h3
                    class="font-['Outfit'] text-3xl font-semibold
                    text-[#2d2926] mb-2"
                >
                    {{ score }} / {{ questions.length }}
                </h3>

                <p class="text-[#6f6860] mb-7">
                    Acertaste el {{ percentage }}% de las preguntas.
                </p>

                <button
                    @click="emit('close')"
                    class="px-6 py-3 rounded-xl bg-[#34A469]
                    text-white font-semibold hover:bg-[#2f955e]
                    transition"
                >
                    Terminar
                </button>
            </div>

        </div>
    </BaseModal>
</template>

<script setup>
import { ref, computed } from "vue";
import BaseModal from "./BaseModal.vue";

const props = defineProps({
    flashcard: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(["close"]);

const currentIndex = ref(0);
const selectedAnswer = ref(null);
const score = ref(0);
const finished = ref(false);

function shuffle(array) {
    return [...array].sort(() => Math.random() - 0.5);
}

function createQuestions() {
    const items = props.flashcard.items || [];

    return shuffle(items).map(item => {

        const askForDefinition = Math.random() > 0.5;

        const otherItems = shuffle(
            items.filter(other => other.item_id !== item.item_id)
        );

        const options = askForDefinition
            ? [
                item.definition,
                ...otherItems
                    .slice(0, Math.min(3, items.length - 1))
                    .map(other => other.definition)
            ]
            : [
                item.term,
                ...otherItems
                    .slice(0, Math.min(3, items.length - 1))
                    .map(other => other.term)
            ];

        return {
            type: askForDefinition ? "term" : "definition",
            question: askForDefinition
                ? item.term
                : item.definition,
            correctAnswer: askForDefinition
                ? item.definition
                : item.term,
            options: shuffle(options)
        };
    });
}

const questions = ref(createQuestions());

const currentQuestion = computed(() => {
    return questions.value[currentIndex.value];
});

const percentage = computed(() => {
    if (!questions.value.length) {
        return 0;
    }

    return Math.round(
        (score.value / questions.value.length) * 100
    );
});

function selectAnswer(answer) {
    if (selectedAnswer.value !== null) {
        return;
    }

    selectedAnswer.value = answer;

    if (answer === currentQuestion.value.correctAnswer) {
        score.value++;
    }
}

function nextQuestion() {
    if (currentIndex.value < questions.value.length - 1) {
        currentIndex.value++;
        selectedAnswer.value = null;
    } else {
        finished.value = true;
    }
}

function getOptionClass(option) {
    if (selectedAnswer.value === null) {
        return "border-[#eee8dc] bg-white hover:border-[#34A469] hover:bg-[#f9fcfa]";
    }

    if (option === currentQuestion.value.correctAnswer) {
        return "border-[#34A469] bg-[#e9f7ef]";
    }

    if (
        option === selectedAnswer.value &&
        option !== currentQuestion.value.correctAnswer
    ) {
        return "border-[#E3562B] bg-[#fff0ed]";
    }

    return "border-[#eee8dc] bg-white opacity-60";
}

function getOptionNumberClass(option) {
    if (selectedAnswer.value === null) {
        return "bg-[#f5f1e9] text-[#6f6860]";
    }

    if (option === currentQuestion.value.correctAnswer) {
        return "bg-[#34A469] text-white";
    }

    if (
        option === selectedAnswer.value &&
        option !== currentQuestion.value.correctAnswer
    ) {
        return "bg-[#E3562B] text-white";
    }

    return "bg-[#f5f1e9] text-[#9b9387]";
}
</script>