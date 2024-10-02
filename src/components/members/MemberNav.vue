<template>
  <div class="flex justify-end gap-3 py-3">
    <RouterLink class="btn btn-primary" to="/posts/create"
      >게시글 작성</RouterLink
    >
    <RouterLink
      v-if="authStore.isAdmin === true"
      class="btn btn-danger"
      to="/inquiries"
      >문의 내역</RouterLink
    >
    <RouterLink
      v-if="authStore.isAdmin === true"
      class="btn btn-danger"
      to="/admins/search/members"
      >사용자 검색</RouterLink
    >
    <div class="flex-grow"></div>
    <p class="flex items-center">
      안녕하세요,
      <span>
        <strong>{{ authStore.nickname }}</strong> 사용자</span
      >님!
    </p>
    <RouterLink class="btn btn-primary" to="/members/profile"
      >마이페이지</RouterLink
    >
    <button class="btn btn-primary" type="button" @click="logout">
      로그아웃
    </button>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { fetchLogout } from '@/api/authApi';

const authStore = useAuthStore();
const router = useRouter();

const logout = async () => {
  try {
    const response = await fetchLogout();
    if (response.status === 200) {
      console.log('로그아웃 성공 !');
      authStore.init();
      console.log(authStore);
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // 로그인 실패 (401 응답 코드 경우)
      alert(error.response.data);
    } else {
      console.error('오류 발생 :', error);
    }
  } finally {
    router.push({
      path: '/home',
    });
  }
};
</script>

<style lang="scss" scoped></style>
