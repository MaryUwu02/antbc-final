<template>
  <div class="flex min-h-screen">
    <NavMobile />

    <main class="flex-1 p-6">
      <div class="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
        <WelcomeGroup />
        <Search />
      </div>

      <CodeModal
        v-if="showInviteModal && group"
        :code="group.invitation_code"
        @close="showInviteModal = false"
      />

      <NewFileModal
        v-if="showCreateFileModal"
        @close="showCreateFileModal = false"
        @created="addFile"
      />

      <div class="flex flex-col items-end mb-6 gap-4">
        <ButtonsGroup
          v-if="group"
          :group-id="group.group_id"
          @invite="showInviteModal = true"
          @new-file="showCreateFileModal = true"
          @leave="handleLeaveGroup"
        />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <CardFile
          :file="null"
          @create="createFile"
        />

        <CardFile
          v-for="file in files"
          :key="file.id"
          :file="file"
          @edit="editFile"
          @archive="archiveFile"
          @duplicate="duplicateFile"
          @delete="deleteFile"
          @favorite="toggleFavorite"
        />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { fetchGroupById, leaveGroup } from "../../services/groups.js";
import NavMobile from '../../components/mobile/NavMobile.vue';
import WelcomeGroup from '../../components/mobile/WelcomeGroup.vue';
import Search from '../../components/mobile/Search.vue';
import ButtonsGroup from '../../components/mobile/ButtonsGroup.vue';
import CardFile from '../../components/mobile/CardFile.vue';
import CodeModal from "../../components/CodeModal.vue";
import NewFileModal from "../../components/NewFileModal.vue";

const router = useRouter();
const route = useRoute();
const group = ref(null);
const files = ref([]);
const showInviteModal = ref(false);
const showCreateFileModal = ref(false);

function createFile() {
  showCreateFileModal.value = true;
}

function addFile(newFile) {
  files.value.unshift(newFile);
}

async function handleLeaveGroup() {
  try {
    await leaveGroup(group.value.group_id);

    router.push("/home");

  } catch (err) {
    console.error(err);
  }
}

onMounted(async () => {
  try {
    const groupId = route.params.id;
    group.value = await fetchGroupById(groupId);
  } catch (err) {
    console.error(err);
  }
});
</script>