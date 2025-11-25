<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({ member: Object })
const emit = defineEmits(['click'])
const router = useRouter()

function goBack() {
  router.back()
}
</script>

<template>
  <div class="space-y-2">
    <div
      class="bg-green-100 p-3 rounded-xl flex justify-between items-center cursor-pointer"
      @click="$emit('click')"
    >
      <div>
        <h3 class="font-semibold">{{ member.name }}</h3>
        <p class="text-sm">Rol: {{ member.role }}</p>
        <div class="w-full bg-gray-200 h-2 rounded mt-2">
          <div class="bg-green-500 h-2 rounded" :style="{ width: member.progress + '%' }"></div>
        </div>
      </div>

      <div class="relative">
        <button class="text-gray-700">✖</button>
      </div>
    </div>
  </div>
</template>
