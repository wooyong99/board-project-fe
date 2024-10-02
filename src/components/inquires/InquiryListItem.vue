<template>
  <div class="w-1/12 flex justify-center">{{ id }}</div>
  <div class="flex-grow flex justify-center items-center border-x-2">
    <RouterLink to="/home">{{ nickname }}</RouterLink>
  </div>
  <div class="flex-grow flex justify-center items-center border-x-2">
    <RouterLink to="/home">{{ email }}</RouterLink>
  </div>
  <div class="w-2/12 flex justify-center items-center">
    {{ createdAt }}
  </div>
  <div class="w-2/12 flex justify-center items-center">
    <span v-if="isAuthorBlock">{{ blockedAt }}</span>
    <button v-else type="button" class="btn btn-danger" @click="blockMember">
      차단 하기
    </button>
  </div>

  <div class="w-1/12 flex justify-center items-center">
    <button
      class="btn btn-primary"
      type="button"
      @click="router.push({ path: `/inquiries/${props.id}` })"
    >
      상세보기
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { fetchBlockMember } from '@/api/adminApi';

const router = useRouter();
const emit = defineEmits(['fetchInquiries']);
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  createdAt: {
    type: [Date, String],
    required: true,
  },
  blockedAt: {
    type: [Date, String],
    required: true,
  },
  isAuthorBlock: {
    type: Boolean,
    required: true,
  },
  memberId: {
    type: Number,
    required: true,
  },
});

const blockMember = async () => {
  try {
    const response = await fetchBlockMember(props.memberId);
    if (response.status == 200) {
      emit('fetchInquiries');
    }
  } catch (error) {
    console.error("Failed to fetch update member's block status", error);
    alert('회원 차단 상태를를 변경하는데 실패했습니다.');
  }
};
</script>

<style lang="scss" scoped></style>
