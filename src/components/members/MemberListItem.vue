<template>
  <div class="w-2/12 flex justify-center">{{ memberId }}</div>
  <div class="flex-grow flex justify-center items-center border-x-2">
    <RouterLink :to="{ path: `/posts/${memberId}` }">{{
      props.email
    }}</RouterLink>
  </div>
  <div class="flex-grow flex justify-center items-center border-x-2">
    <RouterLink :to="{ path: `/posts/${memberId}` }">{{ nickname }}</RouterLink>
  </div>
  <div class="w-3/12 flex justify-center">
    {{ formatDate(createdAt) }}
  </div>
  <div class="w-3/12 flex justify-center items-center border-x-2">
    <button
      type="button"
      class="btn"
      :class="isBlock ? 'btn-primary' : 'btn-danger'"
      @click="isBlock ? unBlockMember() : blockMember()"
    >
      {{ isBlock ? '차단 해제' : '차단 하기' }}
    </button>
  </div>
</template>

<script setup>
import { fetchBlockMember, fetchUnBlockMember } from '@/api/adminApi';

const emit = defineEmits(['fetchMembers']);

const props = defineProps({
  memberId: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  createdAt: {
    type: [Date, String],
    required: true,
  },
  isBlock: {
    type: Boolean,
    required: true,
  },
});

const blockMember = async () => {
  try {
    const response = await fetchBlockMember(props.memberId);
    if (response.status == 200) {
      emit('fetchMembers');
    }
  } catch (error) {
    console.error("Failed to fetch update member's block status", error);
    alert('회원 차단 상태를를 변경하는데 실패했습니다.');
  }
};

const unBlockMember = async () => {
  try {
    const response = await fetchUnBlockMember(props.memberId);
    if (response.status == 200) {
      emit('fetchMembers');
    }
  } catch (error) {
    console.error("Failed to fetch update member's block status", error);
    alert('회원 차단 상태를를 변경하는데 실패했습니다.');
  }
};

// 날짜 포맷 함수
const formatDate = dateString => {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  };
  return new Date(dateString).toLocaleDateString('ko-KR', options);
};
</script>

<style lang="scss" scoped></style>
