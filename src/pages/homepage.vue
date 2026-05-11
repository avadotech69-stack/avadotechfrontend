<template>
  <div class="homepage" id="home">

    <!-- 🟣 Hero Banner Section -->
    <HeroBanner />

    <!-- 🟣 Services Section -->
    <Services />

    <!-- 🟣 Works Showcase Section -->
    <Works />

    <!-- 🟣 Pricing Section -->
    <Pricing />

  </div>
</template>

<script setup>
import HeroBanner from "../components/HeroPortfolioBanner.vue";
import Services from "../components/Services.vue";
import Works from "../components/Works.vue";
import Pricing from "../components/Pricing.vue";
</script>

<style scoped>
/* 🔥 Full Black / Dark Theme Background */
.homepage {
  background-color: #060617; /* Primary Dark Black */
  min-height: 100vh;
  color: #FFFFFF;
}
</style>
