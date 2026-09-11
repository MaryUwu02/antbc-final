<template>
    <Navbar />
    <main>
        <Hero />
        <Features />
        <Plans />
        <Faq />
    </main>
    <Footer />
</template>

<script setup>
import Navbar from '../components/landing/Navbar.vue';
import Hero from '../components/landing/Hero.vue';
import Features from '../components/landing/Features.vue';
import Faq from '../components/landing/Faq.vue';
import Footer from '../components/landing/Footer.vue';
import Plans from '../components/landing/Plans.vue';
</script>