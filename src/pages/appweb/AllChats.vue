<template>
    <div class="flex">
        <NavMobile />

        <main class="flex-1 p-6">
            <div class="flex items-center justify-between gap-4 mb-6">
                <h1 class="font-['Outfit'] font-bold text-3xl text-gray-800 mb-2">Mis chats grupales</h1>
            </div>
            <p
                v-if="chats.length === 0"
                class="text-gray-500 text-sm italic"
            >
                Todavía no hay chats disponibles.
            </p>
            <div v-else>
                <ListChats :chats="allchats" />
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import NavMobile from '../../components/mobile/NavMobile.vue';
import Search from '../../components/mobile/Search.vue';
import ListChats from '../../components/mobile/ListChats.vue';
import { fetchOwnedGroups } from "../../services/groups";

const chats = ref([])

onMounted(async () => {
    chats.value = await fetchOwnedGroups()
})
</script>