<template>
    <BaseModal @close="onCancel">

        <div class="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6">

            <h3 class="text-lg font-semibold text-gray-900 mb-2">
                {{ title }}
            </h3>

            <p class="text-sm text-gray-600 mb-6">
                <slot>
                ¿Estás seguro de que querés eliminar este grupo?
                </slot>
            </p>

            <div class="flex justify-end gap-3">

                <button
                    class="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
                    @click="onCancel"
                    :disabled="loading"
                >
                Cancelar
                </button>

                <button
                    class="px-4 py-2 rounded-md text-white bg-red-600 hover:bg-red-700"
                    @click="onConfirm"
                    :disabled="loading"
                >
                <span v-if="!loading">Eliminar</span>
                <span v-else>Eliminando…</span>
                </button>

            </div>

        </div>

    </BaseModal>
</template>

<script>
import BaseModal from "./BaseModal.vue";

export default {
    name: "DeleteModal",

    components: {
        BaseModal
    },

    props: {
        title: {
        type: String,
        default: "Confirmar eliminación"
        },

        loading: {
        type: Boolean,
        default: false
        }
    },

    emits: ["close", "confirm"],

    methods: {
        onConfirm() {
        this.$emit("confirm");
        },

        onCancel() {
        this.$emit("close");
        }
    }
};
</script>