<template>
  <nav class="container mx-auto flex justify-center my-10">
    <ul class="pagination">
      <li
        class="page-item"
        :class="{ disabled: !hasPreviousPage }"
        @click="goToPage(currentPage)"
      >
        <span class="page-link">Previous</span>
      </li>
      <li
        v-for="page in totalPages"
        :key="page"
        class="page-item"
        :class="{ active: page === currentPage + 1 }"
        @click="goToPage(page)"
      >
        <span class="page-link">{{ page }}</span>
      </li>
      <li
        class="page-item"
        :class="{ disabled: !hasNextPage }"
        @click="goToPage(currentPage + 2)"
      >
        <span class="page-link">Next</span>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps({
  totalPages: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
  params: {
    type: Object,
    required: true,
  },
});

const route = useRoute();
const router = useRouter();
const page = ref(props.currentPage);

const hasPreviousPage = computed(() => page.value > 0);
const hasNextPage = computed(() => page.value + 1 < props.totalPages);

const goToPage = targetPage => {
  if (targetPage >= 1 && targetPage <= props.totalPages) {
    router.push({
      path: route.path,
      query: {
        ...props.params,
        page: targetPage - 1,
      },
    });
  }
};

watch(
  () => props.currentPage,
  newPage => {
    page.value = newPage;
  },
);
</script>

<style lang="scss" scoped></style>
