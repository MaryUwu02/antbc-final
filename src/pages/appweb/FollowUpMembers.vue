<template>
    <div class="flex h-screen">
        <NavMobile />

        <div class="w-80 border-r bg-white p-4">
            <div class="flex items-center justify-between gap-4 mb-6">
                <h1 class="font-['Outfit'] font-bold text-3xl text-gray-800">
                    Seguimiento
                </h1>
            </div>
            
            <ul class="space-y-3 mt-4">

                <li class="p-3 hover:bg-gray-50 cursor-pointer transition">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                            J
                        </div>

                        <div>
                            <p class="font-semibold text-gray-800">
                                Juan Pérez
                            </p>
                            <p class="text-sm text-gray-500">
                                juan@gmail.com
                            </p>
                        </div>
                    </div>
                </li>

                <li class="p-3 hover:bg-gray-50 cursor-pointer transition">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">
                            M
                        </div>

                        <div>
                            <p class="font-semibold text-gray-800">
                                María Gómez
                            </p>
                            <p class="text-sm text-gray-500">
                                maria@gmail.com
                            </p>
                        </div>
                    </div>
                </li>

                <li class="p-3 hover:bg-gray-50 cursor-pointer transition">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold">
                            L
                        </div>

                        <div>
                            <p class="font-semibold text-gray-800">
                                Lucas Fernández
                            </p>
                            <p class="text-sm text-gray-500">
                                lucas@gmail.com
                            </p>
                        </div>
                    </div>
                </li>

            </ul>
            
        </div>
        <FollowUp />
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import NavMobile from '../../components/mobile/NavMobile.vue';
import FollowUp from '../../components/mobile/FollowUp.vue';
import { fetchGroupMembers } from "../../services/followup";

const route = useRoute();
const members = ref([]);

onMounted(async () => {

    try {
        const groupId = route.params.id;
        members.value = await fetchGroupMembers(groupId);
    } catch(error) {
        console.error(error);
    }

});

</script>