<template>
  <Search
    :params="params"
    placeholder="이메일로 검색해주세요."
    buttonText="회원 검색"
    @update:params="updateParams"
  />
</template>

<script setup>
import { ref } from 'vue';
import Search from '@/components/common/Search.vue'; // Search 컴포넌트 임포트

// 부모 컴포넌트의 검색 파라미터
const params = ref({
  keyword: '',
});

// Search 컴포넌트로부터 전달된 파라미터 업데이트
const updateParams = newParams => {
  params.value = newParams;
  // 필요 시 API 호출 등의 작업 수행
};
</script>
