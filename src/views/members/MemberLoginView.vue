<template>
  <div class="container mx-auto flex justify-center my-20">
    <form class="form-control">
      <h1 class="flex justify-center text-4xl my-5">로그인 페이지</h1>
      <div class="mb-3">
        <label class="form-label">이메일</label>
        <input
          v-model="loginForm.email"
          class="form-control"
          type="text"
          name="email"
          placeholder="이메일을 입력해주세요."
          maxlength="50"
        />
      </div>
      <div>
        <label class="form-label">비밀번호</label>
        <input
          v-model="loginForm.password"
          class="form-control"
          type="password"
          name="password"
          placeholder="비밀번호를 입력해주세요."
          maxlength="50"
        />
      </div>
      <div class="flex gap-3 my-4">
        <button class="btn btn-primary" type="button" @click="login">
          로그인
        </button>
        <button class="btn btn-primary" type="button" @click="formReset">
          초기화
        </button>
        <RouterLink to="/home" class="btn btn-primary">홈으로</RouterLink>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { fetchLogin } from '@/api/authApi';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const router = useRouter();

const loginForm = ref({
  email: null,
  password: null,
});

const login = async () => {
  try {
    const response = await fetchLogin({ ...loginForm.value });
    if (response.status === 200) {
      const { data } = response;
      authStore.save(data);
      console.log('액세스 토큰 저장됨 ! ');
      router.push({
        path: '/home',
      });
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // 로그인 실패 (401 응답 코드 경우)
      alert(error.response.data);
      router.push({
        path: '/login',
      });
    } else if (error.response && error.response.status === 403) {
      let userConfirm = confirm(
        '차단 해제 문의를 하시겠습니까 ? 동의하면 문의 접수 페이지로 이동됩니다.',
      );
      if (userConfirm) {
        router.push({ path: '/inquiries/create' });
      }
    } else {
      console.error('오류 발생 :', error);
      alert('오류가 발생했습니다. 나중에 다시 시도해주세요.');
      router.push({
        path: '/home',
      });
    }
    formReset();
  }
};

// 입력 값 초기화
const formReset = () => {
  loginForm.value.email = '';
  loginForm.value.password = '';
};
</script>

<style lang="scss" scoped></style>
