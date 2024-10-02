<template>
  <div class="container mx-auto">
    <GuestNav v-if="authStore.token == ''"></GuestNav>
    <MemberNav v-else></MemberNav>
  </div>
</template>

<script setup>
import GuestNav from '@/components/members/GuestNav.vue';
import MemberNav from '@/components/members/MemberNav.vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
</script>

<style lang="scss" scoped></style>
