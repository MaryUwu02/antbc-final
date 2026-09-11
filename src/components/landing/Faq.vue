<template>
  <section ref="sectionRef" class="py-16">
    <div class="max-w-3xl mx-auto px-6">

      <!-- 🧠 TITULO -->
      <h2
        :class="[
          'text-color text-3xl md:text-4xl font-extrabold text-center mb-10 opacity-0',
          isVisible && 'animate-fade-up'
        ]"
      >
        Preguntas frecuentes
      </h2>

      <!-- ❓ LISTA FAQ -->
      <div>

        <div
          v-for="(faq, index) in faqs"
          :key="index"
          :class="[
            'border-b border-gray-200 py-4 opacity-0',
            isVisible && 'animate-fade-up'
          ]"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <!-- PREGUNTA -->
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

          <!-- RESPUESTA (ANIMADA) -->
          <Transition name="faq">
            <div
              v-if="openIndex === index"
              class="overflow-hidden"
            >
              <p class="mt-2 text-gray-600 text-base leading-relaxed">
                {{ faq.answer }}
              </p>
            </div>
          </Transition>

        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const faqs = [
  {
    question: "¿Qué es AntBC?",
    answer: "Es una plataforma para organizar proyectos, equipos y tareas en un solo lugar."
  },
  {
    question: "¿Puedo usarlo gratis?",
    answer: "Sí, tenemos un plan gratuito con funciones básicas."
  },
  {
    question: "¿Funciona en equipo?",
    answer: "Sí, podés invitar miembros y colaborar en tiempo real."
  }
];

const openIndex = ref(null);
const toggle = (index) => {
  openIndex.value = openIndex.value === index ? null : index;
};

// 👇 Intersection Observer
const sectionRef = ref(null);
const isVisible = ref(false);

let observer = null;

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true;
        observer.disconnect();
      }
    },
    { threshold: 0.2 }
  );

  if (sectionRef.value) observer.observe(sectionRef.value);
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});
</script>

<style scoped>

/* 🔼 ENTRADA GENERAL */
@keyframes fadeUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-up {
  animation: fadeUp 0.7s ease-out forwards;
}

/* 🔽 ANIMACIÓN FAQ (APERTURA SUAVE) */
.faq-enter-active,
.faq-leave-active {
  transition: all 0.35s ease;
}

.faq-enter-from,
.faq-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-5px);
}

.faq-enter-to,
.faq-leave-from {
  max-height: 200px; /* suficiente para el contenido */
  opacity: 1;
  transform: translateY(0);
}

</style>