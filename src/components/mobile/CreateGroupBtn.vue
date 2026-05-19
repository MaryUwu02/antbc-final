<template>
    <div class="relative" ref="menuWrapper">
        <button
            type="button"
            @click.stop="toggleMenu"
            class="flex items-center justify-center
            w-11 aspect-square rounded-full
            shadow hover:opacity-90 transition"
            style="background-color: #140E0C; color: white;"
            aria-label="Opciones de grupo"
            >
            <i class="fa-solid fa-plus text-lg"></i>
        </button>

        <transition name="fade-scale">
            <div
                v-if="isOpen"
                class="absolute right-0 mt-2 w-44 bg-white border border-gray-100 rounded-lg shadow-lg z-50"
            >
                <ul class="py-1 text-sm text-gray-700">
                    <li>
                        <button
                        class="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        @click="handleCreate"
                        >
                        Crear nuevo grupo
                        </button>
                    </li>

                    <li>
                        <button
                        class="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        @click="handleJoin"
                        >
                        Unirse a un grupo
                        </button>
                    </li>
                </ul>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const emit = defineEmits(["create", "join"]);

const isOpen = ref(false);
const menuWrapper = ref(null);

const toggleMenu = () => {
    isOpen.value = !isOpen.value;
};

const handleCreate = () => {
    emit("create");
    isOpen.value = false;
};

const handleJoin = () => {
    emit("join");
    isOpen.value = false;
};

const handleClickOutside = (e) => {
    if (menuWrapper.value && !menuWrapper.value.contains(e.target)) {
        isOpen.value = false;
    }
};

onMounted(() => {
    document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
    document.removeEventListener("click", handleClickOutside);
});
</script>