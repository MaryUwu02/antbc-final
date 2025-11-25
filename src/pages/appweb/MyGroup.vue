<template>
    <div class="flex min-h-screen">
        <NavMobile />
        <main class="flex-1 p-6">
            <div class="flex items-center justify-between gap-4 mb-6">
                <WelcomeGroup />
                <Search />
            </div>
            <div class="flex justify-end mb-6">
                <ButtonsGroup />
            </div>
            <div class="flex flex-col md:flex-row gap-6">
                <div class="flex">
                    <ListOptionsGroup />
                </div>
                <div class="flex-1">
                    <CardFile />
                </div>
            </div>
        </main>
    </div>
</template>


<script setup>
import NavMobile from '../../components/mobile/NavMobile.vue';
import WelcomeGroup from '../../components/mobile/WelcomeGroup.vue';
import Search from '../../components/mobile/Search.vue';
import ButtonsGroup from '../../components/mobile/ButtonsGroup.vue';
import ListOptionsGroup from '../../components/mobile/ListOptionsGroup.vue';
import CardFile from '../../components/mobile/CardFile.vue';
</script>