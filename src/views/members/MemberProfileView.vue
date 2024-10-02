<template>
  <div class="container mx-auto flex flex-column gap-3 border-b-2 pb-3 px-4">
    <div class="flex border-b-2 pl-5 pb-3 mt-4">
      <h1 class="text-3xl flex items-center">
        <strong>{{ memberInfo.nickname }}</strong> 사용자의 마이페이지
      </h1>
    </div>
    <div>
      <span class="btn btn-primary">회원번호 </span> &nbsp;&nbsp;
      {{ memberInfo.memberId }}
    </div>
    <div>
      <span class="btn btn-primary">닉네임 </span> &nbsp;&nbsp;
      {{ memberInfo.nickname }}
    </div>
    <div>
      <span class="btn btn-primary">이메일</span> &nbsp;&nbsp;
      {{ memberInfo.email }}
    </div>
    <div>
      <span class="btn btn-primary">권한</span>
      &nbsp;&nbsp;{{ memberInfo.role }}
    </div>
    <div class="justify-end">
      <span class="btn btn-primary">생성일자</span>
      &nbsp;&nbsp;{{ formatDate(memberInfo.createdAt) }}
    </div>
  </div>
  <div class="container mx-auto flex justify-end my-5 gap-2">
    <RouterLink class="btn btn-danger" to="/members/update/nickname">
      닉네임 변경
    </RouterLink>
    <RouterLink class="btn btn-danger" to="/members/update/password"
      >비밀번호 변경</RouterLink
    >
    <RouterLink to="/home" class="btn btn-primary">홈으로</RouterLink>
    <button class="btn btn-danger" type="button" @click="deleteMember">
      회원 탈퇴
    </button>
  </div>
</template>

<script setup>
import { fetchDeleteMember, fetchUserProfile } from '@/api/memberApi';
import { ref, onMounted } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

// 반응형 상태 변수 선언
const memberInfo = ref({
  memberId: '',
  nickname: '',
  email: '',
  role: '',
  createdAt: '',
});

const deleteMember = async () => {
  try {
    const response = await fetchDeleteMember();
    if (response.status === 204) {
      alert('회원 탈퇴 성공 !');
      authStore.init();
    }
  } catch (error) {
    console.error('Failed to fetch member delete :', error);
    alert('회원 탈퇴하는데 실패했습니다.');
  } finally {
    router.push({ path: '/home' });
  }
};
// 날짜 포맷 함수
// const formatDate = dateString => {
//   const options = {
//     year: 'numeric',
//     month: '2-digit',
//     day: '2-digit',
//     hour: '2-digit',
//     minute: '2-digit',
//   };
//   return new Date(dateString).toLocaleDateString('ko-KR', options);
// };
const formatDate = dateString => {
  const date = new Date(dateString);

  // 날짜 부분 포맷 (YYYY-MM-DD)
  const dateOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };
  const formattedDate = date
    .toLocaleDateString('ko-KR', dateOptions)
    .replace(/\./g, '-')
    .trim();

  // 시간 부분 포맷 (HH:mm)
  const timeOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // 24시간 형식 사용
  };
  const formattedTime = date.toLocaleTimeString('ko-KR', timeOptions);

  // 날짜와 시간 합치기 (YYYY-MM-DD HH:mm)
  return `${formattedDate} ${formattedTime}`;
};

onMounted(async () => {
  try {
    const response = await fetchUserProfile();
    memberInfo.value = response.data;
  } catch (error) {
    console.error('Failed to fetch member profile:', error);
    alert('회원 정보를 불러오는데 실패했습니다.');
    router.push({ path: '/home' });
  }
});
</script>

<style lang="scss" scoped></style>
