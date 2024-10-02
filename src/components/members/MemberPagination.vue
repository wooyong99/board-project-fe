<template>
  <Pagination
    :totalPages="totalPages"
    :currentPage="currentPage"
    :params="params"
    @update:params="updateParams"
  />
</template>

<script setup>
import { ref } from 'vue';
import Pagination from '@/components/common/Pagination.vue';

const totalPages = ref(10);
const currentPage = ref(0);
const params = ref({});

const updateParams = newParams => {
  params.value = newParams;
};
</script>
