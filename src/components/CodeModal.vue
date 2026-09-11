<template>
  <BaseModal @close="close">
    <div
      class="bg-white rounded-2xl shadow-xl w-full max-w-sm z-10 p-6 relative"

    >
      <button
        @click="close"
        class="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
      >
        ✕
      </button>

      <h2 class="text-lg font-semibold text-gray-900 mb-1">
        Invitar al grupo
      </h2>

      <p class="text-sm text-gray-500 mb-4">
        Compartí este código con quien quieras invitar.
      </p>

      <div
        class="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 flex items-center justify-between gap-3"
      >
        <span class="font-mono text-lg font-semibold tracking-widest text-gray-900">
          {{ code }}
        </span>

        <button
          type="button"
          @click="copyCode"
          class="text-sm px-3 py-1.5 rounded-md bg-gray-200 hover:bg-gray-300 transition"
        >
          {{ copied ? "Copiado!" : "Copiar" }}
        </button>
      </div>
    </div>
  </BaseModal>
</template>

<script setup>
import { ref, watch } from "vue";
import BaseModal from "./BaseModal.vue";

const props = defineProps({
  modelValue: Boolean,
  code: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const copied = ref(false);

function close() {
  emit("close");
}

async function copyCode() {
  try {
    await navigator.clipboard.writeText(props.code);
    copied.value = true;

    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err) {
    console.error("Error copiando:", err);
  }
}

watch(
  () => props.modelValue,
  (val) => {
    if (val) copied.value = false;
  }
);
</script>