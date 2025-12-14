<template>
  <div class="flex">
    <NavMobile />

    <main class="flex-1 p-6">

      <template v-if="!selectedGroupId && !selectedMemberId && !showSeguimiento">

        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <Welcome />

          <div class="flex items-center gap-1">
            <Search v-model="search" />
            <CreateGroupBtn @open="showCreateGroupModal = true" />
          </div>
        </div>

        <div class="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Reminder />
          <CalendarWidget :reminders="reminders" />
        </div>

        <div class="mt-6">
          <Group
            :search="search"
            @view-group="showGroupDetail"
          />
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
        <MemberDetail
          :id="selectedMemberId"
          @back="closeMemberDetail"
        />
      </template>

      <NewGroupModal
        v-if="showCreateGroupModal"
        @close="showCreateGroupModal = false"
        @created="refreshGroups"
      />

    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import NavMobile from "../../components/mobile/NavMobile.vue";
import Search from "../../components/mobile/Search.vue";
import CreateGroupBtn from "../../components/mobile/CreateGroupBtn.vue";
import Welcome from "../../components/mobile/Welcome.vue";
import Group from "../../components/mobile/Group.vue";
import Reminder from "../../components/mobile/Reminder.vue";
import CalendarWidget from "../../components/mobile/CalendarWidget.vue";
import GroupDetail from "../../components/mobile/GroupDetail.vue";
import Seguimiento from "../../components/mobile/Seguimiento.vue";
import MemberDetail from "../../components/mobile/MemberDetailPage.vue";
import NewGroupModal from "../../components/NewGroupModal.vue";

const selectedGroupId = ref(null);
const showSeguimiento = ref(false);
const selectedMemberId = ref(null);
const showCreateGroupModal = ref(false);
const search = ref("");
const reminders = ref([]);

function showGroupDetail(group) {
  selectedGroupId.value = group.id;
}

function goBackToHome() {
  selectedGroupId.value = null;
  showSeguimiento.value = false;
  selectedMemberId.value = null;
}

function openSeguimiento() {
  showSeguimiento.value = true;
}

function showMemberDetail(member) {
  selectedMemberId.value = member.id;
}

function closeMemberDetail() {
  selectedMemberId.value = null;
}

function refreshGroups() {
}
</script>
