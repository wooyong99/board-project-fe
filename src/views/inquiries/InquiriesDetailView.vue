<template>
  <div class="container mx-auto flex flex-column gap-3 border-b-2 pb-3 px-4">
    <div class="flex border-b-2 pl-5 pb-3 mt-4">
      <h1 class="text-3xl flex items-center">{{ inquiryInfo.id }}번 문의</h1>
      <div class="flex-grow"></div>
      <div class="flex items-center">
        <span class="badge text-bg-primary ml-3 mr-2">작성자</span>
        {{ inquiryInfo.author }}
      </div>
    </div>

    <div>
      <span class="btn btn-primary">내용</span> {{ inquiryInfo.content }}
    </div>
    <div class="justify-end">
      <span class="btn btn-primary">작성일자</span>
      {{ inquiryInfo.createdAt }}
    </div>
  </div>
  <div class="container mx-auto flex gap-3 justify-end my-4 items-center px-4">
    <RouterLink class="btn btn-success" type="button" to="/inquiries"
      >목록보기</RouterLink
    >
    <RouterLink class="btn btn-primary" type="button" to="/home"
      >홈으로</RouterLink
    >
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { fetchInquiry } from '@/api/inquiryApi';

const route = useRoute();
const router = useRouter();

const inquiryInfo = ref({
  id: '',
  content: '',
  createdAt: '',
  author: '',
});

const inquiryId = route.params.inquiryId;

const getInquiry = async () => {
  try {
    const response = await fetchInquiry(`${inquiryId}`);
    inquiryInfo.value = response.data;
    console.log(response.data);
  } catch (error) {
    if (error.response && error.response.status === 403) {
      // 로그인 실패 (401 응답 코드 경우)
      alert('로그인 후 이용해주세요.');
      router.push({
        path: '/home',
      });
    } else {
      console.error('Failed to fetch get inquiry detail', error);
      alert('게시글 정보를 불러오는데 실패했습니다.');
    }
  }
};

onMounted(() => {
  getInquiry();
});
</script>

<style lang="scss" scoped></style>
