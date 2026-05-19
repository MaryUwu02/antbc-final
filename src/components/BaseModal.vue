<template>
    <teleport to="body">
        <Transition name="modal" appear>

        <div class="fixed inset-0 z-50 flex items-center justify-center">

            <div
                class="absolute inset-0 bg-black/20 backdrop-blur-[2px]"
                @click="emit('close')"
            ></div>

            <div
                class="relative z-10 w-full mx-4"
                :class="maxWidth"
            >
            <slot />
            </div>

        </div>

        </Transition>
    </teleport>
</template>

<script setup>
const emit = defineEmits(["close"])

defineProps({
    maxWidth: {
        type: String,
        default: "max-w-md"
    }
})
</script>
<style>
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.25s ease, transform 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
    transform: scale(1);
}

.modal-enter-to,
.modal-leave-from {
    opacity: 1;
    transform: scale(1);
}
</style>