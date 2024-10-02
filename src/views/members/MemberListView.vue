<template>
  <div class="container mx-auto">
    <div class="flex my-5">
      <div class="flex-grow"></div>
      <!-- 회원 검색 -->
      <MemberSearch
        :params="params"
        @update:params="updateParams"
      ></MemberSearch>
      <div class="flex-grow"></div>
    </div>

    <div>
      <div class="flex justify-center border-b-2 bg-gray-200 py-2">
        <div class="w-2/12 flex justify-center">회원 번호</div>
        <div class="flex-grow flex justify-center border-x-2">이메일</div>
        <div class="flex-grow flex justify-center">닉네임</div>
        <div class="w-3/12 flex justify-center">생성일자</div>
        <div class="w-3/12 flex justify-center">차단 해제</div>
      </div>
      <!-- 회원 리스트 -->
      <div
        v-for="member in members"
        :key="member.memberId"
        class="flex justify-center border-b-2 py-2 hover:bg-gray-100 hover:cursor-pointer"
      >
        <MemberListItem
          :member-id="member.memberId"
          :email="member.email"
          :nickname="member.nickname"
          :created-at="member.createdAt"
          :is-block="member.isBlock"
          @fetch-members="search"
        ></MemberListItem>
      </div>
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
import { fetchMemberList } from '@/api/adminApi.js';
import MemberListItem from '@/components/members/MemberListItem.vue';
import MemberSearch from '@/components/members/MemberSearch.vue';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Pagination from '@/components/common/Pagination.vue';

const route = useRoute();
const router = useRouter();

const params = ref({
  keyword: route.query.keyword == undefined ? null : route.query.keyword,
  page: route.query.page == undefined ? 0 : parseInt(route.query.page),
  size: route.query.size == undefined ? 10 : parseInt(route.query.size),
});
const members = ref([]);
const totalPages = ref(0);
const currentPage = ref(params.value.page);

const search = async () => {
  const { data } = await fetchMemberList(params);
  members.value = data.content;
  totalPages.value = data.totalPages;
  currentPage.value = params.value.page;
};

// params가 변경되었을 때 이를 route.query에 반영
watch(params, newParams => {
  router.push({
    path: route.path,
    query: {
      keyword: newParams.keyword || null,
      page: newParams.page,
      size: newParams.size,
    },
  });
});

// route.query가 변경될 때 params 동기화
watch(
  () => route.query, // route.query 전체를 감시
  newQuery => {
    params.value = {
      keyword: newQuery.keyword || null,
      page: newQuery.page ? parseInt(newQuery.page) : 0,
      size: newQuery.size ? parseInt(newQuery.size) : 10,
    };
    search(); // 업데이트된 params를 이용해 fetchPosts 호출
  },
  { immediate: true },
);

const updateParams = newParams => {
  params.value = newParams;
};
</script>

<style lang="scss" scoped></style>
