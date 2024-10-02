<template>
  <div class="container mx-auto">
    <div class="my-5">
      <div class="flex justify-center border-b-2 bg-gray-200 py-2">
        <div class="w-1/12 flex justify-center">문의 번호</div>
        <div class="flex-grow flex justify-center border-x-2">회원 닉네임</div>
        <div class="flex-grow flex justify-center border-x-2">회원 이메일</div>
        <div class="w-2/12 flex justify-center">차단 날짜</div>
        <div class="w-2/12 flex justify-center">사용자 차단여부</div>
        <div class="w-1/12 flex justify-center">상세보기</div>
      </div>

      <div
        v-for="inquiry in inquiries"
        :key="inquiry.id"
        class="flex justify-center border-b-2 py-2 hover:bg-gray-100 hover:cursor-pointer"
      >
        <InquiryListItem
          :id="inquiry.id"
          :nickname="inquiry.nickname"
          :email="inquiry.email"
          :created-at="inquiry.createdAt"
          :blocked-at="inquiry.blockedAt"
          :is-author-block="inquiry.isAuthorBlock"
          :member-id="inquiry.memberId"
          @fetch-inquiries="search"
        ></InquiryListItem>
      </div>
    </div>
  </div>
</template>

<script setup>
import { fetchInquiryList } from '@/api/inquiryApi';
import InquiryListItem from '@/components/inquires/InquiryListItem.vue';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const params = ref({
  keyword: route.query.keyword == undefined ? null : route.query.keyword,
  page: route.query.page == undefined ? null : route.query.page,
  size: route.query.size == undefined ? null : route.query.size,
});
const inquiries = ref([]);

const search = async () => {
  try {
    const response = await fetchInquiryList(params);
    console.log(response);
    inquiries.value = response.data.content;
  } catch (error) {
    console.error('Failed to fetch get inquiries ', error);
    alert('문의 검색 정보를 불러오는데 실패했습니다.');
  }
};

// 특정 속성들을 watch로 감시
watch(
  () => route.query, // route.query 전체를 감시
  newQuery => {
    params.value = {
      keyword: newQuery.keyword || null,
      page: newQuery.page || null,
      size: newQuery.size || null,
    };
    search();
  },
  { immediate: true },
);
</script>

<style lang="scss" scoped></style>
