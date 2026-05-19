<template>
    <div class="flex min-h-screen bg-gray-50">

        <NavMobile />

        <main class="flex-1 p-6">

            <div class="mb-6">
                <h1 class="text-3xl font-bold text-gray-800 mb-2">
                    Todos mis recordatorios
                </h1>

                <p class="text-gray-500 text-sm">
                    Creá, editá y eliminá los recordatorios de tus grupos.
                </p>
            </div>

            <div class="mb-8">
                <CalendarWidget />
            </div>

            <div class="bg-white rounded-2xl shadow p-6">
                <Reminder
                    :limit="Infinity"
                    @create-reminder="showReminderModal = true"
                />
            </div>

            <BaseModal
                v-if="showReminderModal"
                @close="showReminderModal = false"
                >

                <ReminderModal
                @close="showReminderModal = false"
                />
            </BaseModal>

        </main>
    </div>
</template>

<script setup>
import { ref } from "vue"

import NavMobile from '../../components/mobile/NavMobile.vue'
import CalendarWidget from '../../components/mobile/CalendarWidget.vue'
import Reminder from '../../components/mobile/Reminder.vue'

import BaseModal from '../../components/BaseModal.vue'
import ReminderModal from '../../components/ReminderModal.vue'

const showReminderModal = ref(false)
</script>