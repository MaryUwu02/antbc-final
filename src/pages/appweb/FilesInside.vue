<template>
  <section class="p-6">
    <h1 class="text-xl font-bold mb-4">{{ subgroup?.name }}</h1>

    <div class="bg-white p-4 rounded-xl shadow mb-6">
      <input type="file" @change="uploadFile" class="block mb-3" multiple />
      <p class="text-sm text-gray-500">
        Se guarda automáticamente
      </p>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div
        v-for="file in files"
        :key="file.id"
        class="bg-white p-3 rounded-xl shadow flex flex-col"
      >

        <img
          v-if="file.type === 'image'"
          :src="getFileUrl(file.file_url)"
          class="w-full h-32 object-cover rounded"
        />

        <i
          v-else
          class="fa-regular fa-file-pdf text-red-600 text-4xl mb-2"
        ></i>

        <button
          @click="deleteFile(file.id)"
          class="mt-2 text-red-500 text-sm"
        >
          Eliminar
        </button>
      </div>
    </div>

    <div class="flex gap-4 mt-6">
      <button
        @click="undo"
        class="px-4 py-2 bg-gray-200 rounded-xl"
      >
        Deshacer
      </button>
      <button
        @click="redo"
        class="px-4 py-2 bg-gray-200 rounded-xl"
      >
        Rehacer
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { supabase } from "../supabase.js";

const route = useRoute();
const subgroupId = route.params.id;

const subgroup = ref(null);
const files = ref([]);

const history = ref([]);
const historyIndex = ref(-1);

onMounted(async () => {
  const { data: sub } = await supabase
    .from("subgroups")
    .select("*")
    .eq("id", subgroupId)
    .single();
  subgroup.value = sub;

  await loadFiles();
});

async function loadFiles() {
  const { data } = await supabase
    .from("files")
    .select("*")
    .eq("subgroup_id", subgroupId);

  files.value = data;
}

async function uploadFile(e) {
  const uploadedFiles = e.target.files;

  for (const file of uploadedFiles) {
    const fileName = `${Date.now()}-${file.name}`;

    const { data: storageData, error: uploadErr } = await supabase.storage
      .from("user-files")
      .upload(fileName, file);

    if (uploadErr) continue;

    const type = file.type.includes("pdf") ? "pdf" : "image";

    await supabase.from("files").insert({
      subgroup_id: subgroupId,
      file_url: storageData.path,
      type,
    });
  }

  saveHistory();
  await loadFiles();
}

async function deleteFile(id) {
  await supabase.from("files").delete().eq("id", id);
  saveHistory();
  await loadFiles();
}

function saveHistory() {
  history.value.push(JSON.stringify(files.value));
  historyIndex.value = history.value.length - 1;
}

function undo() {
  if (historyIndex.value <= 0) return;

  historyIndex.value--;
  files.value = JSON.parse(history.value[historyIndex.value]);
}

function redo() {
  if (historyIndex.value >= history.value.length - 1) return;

  historyIndex.value++;
  files.value = JSON.parse(history.value[historyIndex.value]);
}

function getFileUrl(path) {
  return supabase.storage.from("user-files").getPublicUrl(path).data.publicUrl;
}
</script>
