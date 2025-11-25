<template>
    <transition name="fade">
        <div
            v-if="modelValue"
            class="fixed inset-0 z-50 flex items-center justify-center"
            aria-modal="true"
            role="dialog"
        >
            <div class="absolute inset-0 bg-black/50" @click="onCancel"></div>

            <div class="relative bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6 z-10">
                <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ title }}</h3>
                <p class="text-sm text-gray-600 mb-4">
                    <slot>
                        ¿Estás seguro de que querés eliminar este elemento?
                    </slot>
                </p>

                <div class="flex justify-end gap-3">
                    <button
                        class="px-4 py-2 rounded-md border hover:bg-gray-50"
                        @click="onCancel"
                        :disabled="loading"
                    >
                        Cancelar
                    </button>

                    <button
                        class="px-4 py-2 rounded-md text-white bg-red-600 hover:bg-red-700 flex items-center gap-2"
                        @click="onConfirm"
                        :disabled="loading"
                    >
                        <span v-if="!loading">Eliminar</span>
                        <span v-else>Eliminando…</span>
                    </button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: "DeleteModal",
    props: {
        modelValue: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: "Confirmar eliminación"
        },
        loading: {
            type: Boolean,
            default: false
        },
    },
    emits: ["update:modelValue", "confirm", "cancel"],
    methods: {
        onConfirm() {
            this.$emit("confirm");
        },
        onCancel() {
            this.$emit("update:modelValue", false);
            this.$emit("cancel");
        },
    },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>