<template>
  <div class="container mx-auto flex justify-center my-20">
    <form class="form-control">
      <h1 class="flex justify-center text-4xl my-5">닉네임 변경 페이지</h1>
      <div class="mb-3">
        <label class="form-label">변경 닉네임</label>
        <input
          class="form-control"
          type="nickname"
          v-model="newNickname"
          placeholder="변경할 닉네임을 입력해주세요."
          maxlength="50"
        />
      </div>
      <div class="flex gap-3 my-4">
        <button
          class="btn btn-primary mt-5"
          type="button"
          @click="updateNickname"
        >
          변경
        </button>
        <button class="btn btn-primary mt-5" type="button" @click="formReset">
          초기화
        </button>
        <RouterLink to="/home" class="btn btn-primary mt-5">홈으로</RouterLink>
      </div>
    </form>
  </div>
</template>

<script setup>
import { fetchUpdateNickname, fetchUserProfile } from '@/api/memberApi';
import { ref, onMounted } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const router = useRouter();

// 반응형 상태 변수 선언
const newNickname = ref('');

const updateNickname = async () => {
  try {
    const response = await fetchUpdateNickname({
      newNickname: newNickname.value,
    });
    if (response.status === 204) {
      alert('회원 닉네임을 수정하였습니다 !');
      authStore.nickname = newNickname;
    }
  } catch (error) {
    console.error('Failed to fetch update member nickname :', error);
    alert('회원 닉네임을 수정하는데 실패했습니다.');
  } finally {
    router.push({ path: '/members/profile' });
  }
};
// 입력 값 초기화
const formReset = () => {
  newNickname.value = '';
};

onMounted(async () => {
  try {
    const response = await fetchUserProfile();
    newNickname.value = response.data.nickname;
  } catch (error) {
    console.error('Failed to fetch member profile:', error);
    alert('회원 정보를 불러오는데 실패했습니다.');
    router.push({ path: '/home' });
  }
});
</script>

<style lang="scss" scoped></style>
