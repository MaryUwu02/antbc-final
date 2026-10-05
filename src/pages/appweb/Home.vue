<template>
  <div class="flex min-h-screen">
    <NavMobile />

    <main class="flex-1 p-4 md:p-6 pt-20 pb-20 md:pt-6 md:pb-6">

      <template v-if="!selectedGroupId && !selectedMemberId && !showSeguimiento">

        <div class="flex flex-col gap-4">
          <div class="flex items-center justify-between gap-2 w-full">
            <div class="flex-1">
              <Search v-model="search" />
            </div>

            <CreateGroupBtn
              @create="showCreateGroupModal = true"
              @join="showJoinModal = true"
            />
          </div>

          <transition name="fade-slide">
            <Welcome v-if="showWelcomeMessage" />
          </transition>
        </div>
        <div class="mt-6">
          <Group
            :key="groupsKey"
            :search="search"
            @view-group="showGroupDetail"
          />
        </div>

        <div class="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">

          <div>
            <Reminder
              :reminders="reminders"
              @updated="handleUpdatedReminder"
              @deleted="handleDeletedReminder"
            />

            <div class="mt-6 flex gap-3">
              <button
                @click="openReminderModal()"
                class="btn-primary px-6 py-2 rounded-xl text-white font-semibold hover:bg-green-800 transition"
              >
                Nuevo recordatorio
              </button>

              <router-link
                to="/allreminders"
                class="btn-outline-primary px-6 py-2 rounded-xl bg-gray-100 text-gray-800 font-semibold transition"
              >
                Ver todo
              </router-link>
            </div>
          </div>

          <CalendarWidget
            :reminders="reminders"
            @select-date="openReminderModal"
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
        <Seguimiento
          @view-member="showMemberDetail"
        />
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
        @created="onGroupCreated"
      />

      <BaseModal
        v-if="showJoinModal"
        @close="showJoinModal = false"
      >
        <JoinGroupModal
          @close="showJoinModal = false"
          @created="refreshGroups"
        />
      </BaseModal>

      <ReminderModal
        v-if="showReminderModal"
        :key="selectedDate"
        :defaultDate="selectedDate"
        @close="closeReminderModal"
        @created="onReminderCreated"
      />

    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "../../services/supabase";
import { getReminders } from "../../services/reminder.js";
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
import JoinGroupModal from "../../components/JoinGroupModal.vue";
import ReminderModal from "../../components/ReminderModal.vue";

const selectedGroupId = ref(null);
const showSeguimiento = ref(false);
const selectedMemberId = ref(null);
const showCreateGroupModal = ref(false);
const showJoinModal = ref(false);
const search = ref("");
const reminders = ref([]);
const showReminderModal = ref(false);
const selectedDate = ref(null);
const groupsKey = ref(0);
const showWelcomeMessage = ref(false);

async function loadReminders() {
  try {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) return;

    reminders.value = await getReminders(user.id);
  } catch (error) {
    console.error("Error cargando recordatorios:", error);
  }
}

function openReminderModal(date = null) {
  selectedDate.value = date;
  showReminderModal.value = true;
}

function closeReminderModal() {
  showReminderModal.value = false;
  selectedDate.value = null;
}

function onReminderCreated(reminder) {
  reminders.value.unshift(reminder);

  closeReminderModal();
}

function handleUpdatedReminder(updatedReminder) {
  reminders.value = reminders.value.map(reminder => {
    if (reminder.id === updatedReminder.id) {
      return updatedReminder;
    }

    return reminder;
  });
}

function handleDeletedReminder(id) {
  reminders.value = reminders.value.filter(
    reminder => reminder.id !== id
  );
}

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
  groupsKey.value++;
}

function onGroupCreated() {
  refreshGroups();
}

onMounted(() => {
  const hasSeenWelcome = sessionStorage.getItem("hasSeenWelcome");

  if (!hasSeenWelcome) {
    showWelcomeMessage.value = true;

    sessionStorage.setItem("hasSeenWelcome", "true");

    setTimeout(() => {
      showWelcomeMessage.value = false;
    }, 4500);
  }

  loadReminders();
});
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}
</style>