<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../../services/supabase.js'
import MemberCard from '../../components/mobile/MemberCard.vue'

const router = useRouter()
const emit = defineEmits(['view-member'])
const members = ref([])

onMounted(async () => {
  const { data } = await supabase.from('group_members').select('*')
  members.value = data
})

function goBack() {
  router.push('/group-detail')
}
</script>

<template>
  <div class="p-4">
    <h2 class="text-lg font-semibold mb-3">Seguimiento de integrantes</h2>

    <div class="space-y-3">
      <MemberCard
        v-for="member in members"
        :key="member.id"
        :member="member"
        @click="$emit('view-member', member)"
      />
    </div>
  </div>
</template>
