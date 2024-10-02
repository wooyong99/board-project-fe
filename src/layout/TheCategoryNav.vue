<template>
  <div class="container mx-auto flex p-0">
    <div
      class="flex-grow flex justify-center border-t-2 py-3 hover:border-black transition-colors hover:cursor-pointer"
    >
      <RouterLink :to="{ path: '/home' }">전체 게시판</RouterLink>
    </div>
    <div
      class="flex-grow flex justify-center border-t-2 py-3 hover:border-black transition-colors hover:cursor-pointer"
    >
      <RouterLink :to="{ path: '/home', query: { categoryId: '1' } }"
        >운동 게시판</RouterLink
      >
    </div>
    <div
      class="flex-grow flex justify-center border-t-2 py-3 hover:border-black transition-colors hover:cursor-pointer"
    >
      <RouterLink :to="{ path: '/home', query: { categoryId: '2' } }">
        공부 게시판
      </RouterLink>
    </div>
    <div
      class="flex-grow flex justify-center border-t-2 py-3 hover:border-black transition-colors hover:cursor-pointer"
    >
      <RouterLink :to="{ path: '/home', query: { categoryId: '3' } }">
        연애 게시판
      </RouterLink>
    </div>
    <div
      class="flex-grow flex justify-center border-t-2 py-3 hover:border-black transition-colors hover:cursor-pointer"
    >
      <RouterLink :to="{ path: '/home', query: { categoryId: '4' } }">
        자유 게시판
      </RouterLink>
    </div>
  </div>
  <div
    class="container h-2/6 w-100 flex justify-center items-center overflow-hidden"
  >
    <img
      class="object-cover w-100 p-0"
      src="https://cdn.travie.com/news/photo/first/201705/img_19694_12.jpg"
    />
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<style lang="scss" scoped></style>
