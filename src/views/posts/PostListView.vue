<template>
  <TheCategoryNav></TheCategoryNav>
  <div class="flex">
    <div class="flex-grow"></div>
    <!-- 게시글 검색 -->
    <PostSearch :params="params" @update:params="updateParams"></PostSearch>
    <div class="flex-grow"></div>
  </div>
  <div class="container mx-auto my-10">
    <div class="flex justify-center border-b-2 bg-gray-200 py-2">
      <div class="w-2/12 flex justify-center">번호</div>
      <div class="flex-grow flex justify-center border-x-2">제목</div>
      <div class="w-3/12 flex justify-center">작성일</div>
    </div>
    <!-- 게시글 리스트  -->
    <div
      v-for="post in posts"
      :key="post.id"
      class="flex justify-center border-b-2 py-2 hover:bg-gray-100 hover:cursor-pointer"
      @click="router.push(`/posts/${post.id}`)"
    >
      <PostListItem
        :id="post.id"
        :title="post.title"
        :created-at="post.createdAt"
        :comment-size="post.commentSize"
      ></PostListItem>
    </div>
    <!-- 페이지네이션 -->
    <Pagination
      :totalPages="totalPages"
      :currentPage="currentPage"
      :params="params"
      @update:params="updateParams"
    />
  </div>
</template>

<script setup>
import TheCategoryNav from '@/layout/TheCategoryNav.vue';
import PostListItem from '@/components/posts/PostListItem.vue';
import { fetchPosts } from '@/api/postApi';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PostSearch from '@/components/posts/PostSearch.vue';
import Pagination from '@/components/common/Pagination.vue';

const route = useRoute();
const router = useRouter();

const params = ref({
  keyword: route.query.keyword == undefined ? null : route.query.keyword,
  page: route.query.page == undefined ? 0 : parseInt(route.query.page),
  size: route.query.size == undefined ? 10 : parseInt(route.query.size),
  categoryId:
    route.query.categoryId == undefined ? null : route.query.categoryId,
});

const posts = ref([]);
const totalPages = ref(0);
const currentPage = ref(params.value.page);

const getPosts = async () => {
  const { data } = await fetchPosts(params);
  posts.value = data.content;
  totalPages.value = data.totalPages;
  currentPage.value = params.value.page;
};

// params가 변경되었을 때 이를 route.query에 반영
watch(
  params,
  newParams => {
    router.push({
      path: route.path,
      query: {
        keyword: newParams.keyword || null,
        page: newParams.page,
        size: newParams.size,
        categoryId: newParams.categoryId,
      },
    });
  },
  { deep: true },
);

// route.query가 변경될 때 params를 동기화
watch(
  () => route.query,
  newQuery => {
    params.value = {
      keyword: newQuery.keyword || null,
      page: newQuery.page ? parseInt(newQuery.page) : 0,
      size: newQuery.size ? parseInt(newQuery.size) : 10,
      categoryId: newQuery.categoryId || null,
    };
    getPosts();
  },
  { immediate: true },
);

const updateParams = newParams => {
  params.value = newParams;
};
</script>

<style lang="scss" scoped></style>
