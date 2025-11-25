<template>
  <section class="bg-gray-50 py-16 px-6">
    <div class="max-w-3xl mx-auto">
      <h2 class="text-color text-3xl font-extrabold text-center mb-10">
        Preguntas Frecuentes
      </h2>

      <div v-for="(faq, index) in faqs" :key="index" class="border-b border-gray-200 py-4">
        <button
          @click="toggle(index)"
          class="w-full flex justify-between items-center text-left"
        >
          <span class="font-semibold text-gray-800 text-lg">
            {{ faq.question }}
          </span>
          <span
            class="text-green-900 text-2xl transform transition-transform duration-300"
            :class="{ 'rotate-45': openIndex === index }"
          >
            +
          </span>
        </button>

        <div
          v-if="openIndex === index"
          class="mt-2 text-gray-600 text-base leading-relaxed transition-all duration-300"
        >
          {{ faq.answer }}
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const openIndex = ref(null);

const toggle = (index) => {
  openIndex.value = openIndex.value === index ? null : index;
};

const faqs = [
  {
    question: "¿AntBC es gratuito?",
    answer:
      "Sí. Podés usar la versión gratuita con funciones básicas. También ofrecemos una versión Premium con herramientas avanzadas y espacio ilimitado.",
  },
  {
    question: "¿Puedo invitar a otros miembros a mi grupo?",
    answer:
      "Claro. AntBC permite crear grupos de trabajo e invitar integrantes o visitantes mediante un enlace único.",
  },
  {
    question: "¿Necesito descargar algo?",
    answer:
      "AntBC cuenta con una aplicación para utilizar en dispositivos mobile, pero también puede utilizarse la web en escritorio.",
  },
  {
    question: "¿Qué beneficios tiene el plan Premium?",
    answer:
      "Los usuarios Premium cuentan con proyectos ilimitados, panel de métricas, automatizaciones personalizadas, plantillas y uso ilimitado del chatbot.",
  },
];
</script>
