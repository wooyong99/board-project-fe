<template>
  <div id="app">
    <div v-if="authStore.isLoading">로딩 중 ....</div>
    <div v-else>
      <TheHeader></TheHeader>
      <router-view></router-view>
      <TheFooter></TheFooter>
    </div>
  </div>
</template>

<script setup>
import TheHeader from './layout/TheHeader.vue';
import TheFooter from './layout/TheFooter.vue';
import { useAuthStore } from './stores/auth';

const authStore = useAuthStore();
</script>
