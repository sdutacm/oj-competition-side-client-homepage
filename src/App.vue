<template>
  <NavBar />
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup>
import NavBar from "./components/NavBar.vue";
</script>

<style scoped></style>
