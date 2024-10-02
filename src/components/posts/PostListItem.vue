<template>
  <div class="w-2/12 flex justify-center">{{ post.id }}</div>
  <div class="flex-grow flex justify-center items-center border-x-2">
    <a>{{ post.title }}</a>
    &nbsp;-&nbsp;<span class="text-red-500"
      >[<span>{{ post.commentSize }}</span
      >]</span
    >
    <span
      v-if="isNew"
      class="badge bg-red-500 ml-2 flex items-center rounded-pill"
      >NEW</span
    >
  </div>
  <div class="w-3/12 flex justify-center">{{ post.createdAt }}</div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  createdAt: {
    type: [Date, String],
    required: true,
  },
  commentSize: {
    type: Number,
    required: true,
  },
});

const post = ref({
  id: props.id,
  title: props.title,
  createdAt: props.createdAt,
  commentSize: props.commentSize,
});

const isNew = computed(() => {
  const createdAt = new Date(post.value.createdAt);
  const now = new Date();
  const oneDayAgo = new Date(now.setDate(now.getDate() - 1));
  return createdAt >= oneDayAgo; // createdAt이 1일 이내인지 체크
});
</script>

<style lang="scss" scoped></style>
