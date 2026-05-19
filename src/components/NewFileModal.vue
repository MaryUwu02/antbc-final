<template>
    <BaseModal @close="close">

        <div class="relative bg-white rounded-2xl shadow p-6 w-full max-w-md z-10">

            <h2 class="font-['Outfit'] font-medium text-xl text-gray-900 mb-4"">
                Crear nuevo archivo
            </h2>

            <form @submit.prevent="onSubmit" class="space-y-4">

                <div>
                    <label class="block text-sm font-medium text-gray-700">
                        Nombre
                    </label>
                    <input
                        v-model="form.name"
                        type="text"
                        class="w-full px-4 py-2 rounded-lg border border-gray-300
                        focus:outline-none focus:ring-2 focus:ring-blue-300"
                        :class="{ 'border-red-500': errors.name }"
                    />
                    <p v-if="errors.name" class="text-red-500 text-sm mt-1">
                        {{ errors.name }}
                    </p>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700">
                        Etiquetas
                    </label>

                    <input
                        v-model="tagsInput"
                        type="text"
                        placeholder="Separa por comas; wireframes, speech, entrega..."
                        class="w-full px-4 py-2 rounded-lg border border-gray-300
                        focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />

                    <div class="flex flex-wrap gap-2 mt-2">
                        <span
                        v-for="(tag, index) in form.tags"
                        :key="index"
                        class="px-2 py-1 text-xs rounded-full bg-gray-200"
                        >
                        {{ tag }}
                        </span>
                    </div>
                </div>

                <div>
                <label class="block text-sm font-medium text-gray-700">
                    Imagen (opcional)
                </label>

                <input
                    type="file"
                    accept="image/*"
                    @change="onImageChange"
                    class="w-full"
                />

                <div v-if="imagePreview" class="mt-2">
                    <img
                    :src="imagePreview"
                    class="w-full h-40 object-cover rounded-lg border"
                    />
                </div>
                </div>

                <div class="flex justify-end gap-3">
                    <button
                        type="button"
                        @click="close"
                        class="px-4 py-2 text-sm text-gray-600"
                    >
                        Cancelar
                    </button>

                <button
                    type="submit"
                    :disabled="loading"
                    class="px-5 py-2 rounded-lg btn-primary text-white font-semibold transition"
                >
                    {{ loading ? "Creando..." : "Crear" }}
                </button>
                </div>

            </form>

        </div>

    </BaseModal>
</template>

<script setup>
import { ref, watch } from "vue"
import BaseModal from "./BaseModal.vue"

const emit = defineEmits(["close", "created"])

const loading = ref(false)

const form = ref({
    name: "",
    tags: [],
    image: null
})

const tagsInput = ref("")
const imagePreview = ref(null)

const errors = ref({
    name: null
})

function close() {
    emit("close")
}

watch(tagsInput, (val) => {
    form.value.tags = val
        .split(",")
        .map(t => t.trim())
        .filter(t => t.length > 0)
})

function onImageChange(e) {
    const file = e.target.files[0]

    if (!file) return

    form.value.image = file
    imagePreview.value = URL.createObjectURL(file)
}

async function onSubmit() {
    errors.value.name = null

    if (!form.value.name.trim()) {
        errors.value.name = "El nombre es obligatorio"
        return
    }

    loading.value = true

    try {
        console.log("DATA:", form.value)

        emit("created", form.value)
        close()

    } finally {
        loading.value = false
    }
}
</script>