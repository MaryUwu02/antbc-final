<template>
  <div class="flex">
    <NavMobile />

    <main class="flex-1 p-6">
    
      <template v-if="!selectedGroupId && !selectedMemberId && !showSeguimiento">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <Welcome />
          <div class="flex items-center gap-1">
            <Search />
            <CreateGroupBtn />
          </div>
        </div>

        <div class="mt-6">
          <Reminder />
        </div>

        <div class="mt-6">
          <Group @view-group="showGroupDetail" />
        </div>
      </template>

      <template v-else-if="selectedGroupId && !showSeguimiento && !selectedMemberId">
        <GroupDetail
          :id="selectedGroupId"
          @back="goBackToHome"
          @open-seguimiento="openSeguimiento"
        />
      </template>

      <template v-else-if="showSeguimiento && !selectedMemberId">
        <Seguimiento @view-member="showMemberDetail" />
      </template>

      <template v-else-if="selectedMemberId">
        <MemberDetail :id="selectedMemberId" @back="closeMemberDetail" />
      </template>

    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import NavMobile from '../../components/mobile/NavMobile.vue'
import Search from '../../components/mobile/Search.vue'
import CreateGroupBtn from '../../components/mobile/CreateGroupBtn.vue'
import Welcome from '../../components/mobile/Welcome.vue'
import Group from '../../components/mobile/Group.vue'
import Reminder from '../../components/mobile/Reminder.vue'
import GroupDetail from '../../components/mobile/GroupDetail.vue'
import Seguimiento from '../../components/mobile/Seguimiento.vue'
import MemberDetail from '../../components/mobile/MemberDetailPage.vue'

const selectedGroupId = ref(null)
const showSeguimiento = ref(false)
const selectedMemberId = ref(null)

function showGroupDetail(group) {
  selectedGroupId.value = group.id
}

function goBackToHome() {
  selectedGroupId.value = null
  showSeguimiento.value = false
  selectedMemberId.value = null
}

function openSeguimiento() {
  showSeguimiento.value = true
}

function showMemberDetail(member) {
  selectedMemberId.value = member.id
}

function closeMemberDetail() {
  selectedMemberId.value = null
}
</script>
