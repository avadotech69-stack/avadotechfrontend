<template>
  <Navbar />
  <router-view />
</template>

<script setup>
import Navbar from './components/Navbar.vue';
</script>

<style>
body {
  margin: 0;
  padding: 0 ;  /* এই 20px ই white space */
}
</style>
