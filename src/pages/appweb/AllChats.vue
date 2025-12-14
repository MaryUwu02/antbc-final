<template>
    <div class="flex">
        <NavMobile />

        <main class="flex-1 p-6">
            <div class="flex items-center justify-between gap-4 mb-6">
                    <h1 class="text-2xl font-bold text-gray-800 mb-2">Mis chats grupales</h1>
                <Search />
            </div>
            <p class="text-gray-500 text-sm italic">Todavía no hay chats disponibles</p>
        </main>
    </div>
</template>

<script setup>
import NavMobile from '../../components/mobile/NavMobile.vue';
import Search from '../../components/mobile/Search.vue';
</script>