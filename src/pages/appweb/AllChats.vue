<template>
    <div class="flex">
        <NavMobile />

        <main class="flex-1 p-6">
            <div class="flex items-center justify-between gap-4 mb-6">
                <h2>Tus chats grupales</h2>
                <Search />
            </div>
        </main>
    </div>
</template>

<script setup>
import NavMobile from '../../components/mobile/NavMobile.vue';
import Search from '../../components/mobile/Search.vue';
</script>