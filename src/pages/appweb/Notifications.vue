<template>
    <div class="flex">
        <NavMobile />

        <main class="flex-1 p-6">
            <h1 class="font-['Outfit'] font-bold text-3xl mb-4">
                Notificaciones
            </h1>

            <div v-if="loading">
                <p>Cargando...</p>
            </div>

            <div v-else-if="notifications.length === 0">
                <p class="text-gray-500 text-sm italic">
                    Todavía no hay notificaciones disponibles
                </p>
            </div>

            <div v-else class="space-y-3">
                <div
                    v-for="notification in notifications"
                    :key="notification.notification_id"
                    class="rounded-xl p-4 border border-gray-100 flex justify-between items-start"
                    style="background-color: #F9FAFE;"
                >
                    <div>
                        <p class="text-gray-800">
                            {{ notification.message }}
                        </p>

                        <p class="text-xs text-gray-400 mt-1">
                            {{ formatDate(notification.created_at) }}
                        </p>
                    </div>

                    <button
                        @click="removeNotification(notification.notification_id)"
                        class="text-gray-400 hover:text-red-500 transition"
                    >
                        ✕
                    </button>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import NavMobile from "../../components/mobile/NavMobile.vue";
import { fetchNotifications, deleteNotification } from "../../services/notification";

const notifications = ref([]);
const loading = ref(true);

function formatDate(date) {
    return new Date(date).toLocaleString();
}

async function removeNotification(id) {
    try {
        await deleteNotification(id);

        notifications.value = notifications.value.filter(
            n => n.notification_id !== id
        );
    } catch (error) {
        console.error(error);
    }
}

onMounted(async () => {
    try {
        notifications.value = await fetchNotifications();
    } catch (error) {
        console.error(error);
    } finally {
        loading.value = false;
    }
});
</script>