<template>
  <div class="container mx-auto flex justify-center my-20">
    <form id="signupForm" class="form-control">
      <h1 class="flex justify-center text-4xl my-5">관리자 회원가입 페이지</h1>
      <div class="mb-3">
        <label class="form-label">닉네임</label>
        <input
          v-model="signupForm.nickname"
          class="form-control"
          type="text"
          name="nickname"
          placeholder="닉네임을 입력해주세요."
          required
          maxlength="50"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">이메일</label>
        <input
          v-model="signupForm.email"
          class="form-control"
          type="text"
          name="email"
          placeholder="이메일을 입력해주세요."
          required
          maxlength="50"
        />
      </div>
      <div>
        <label class="form-label">비밀번호</label>
        <input
          v-model="signupForm.password"
          class="form-control"
          type="password"
          name="password"
          placeholder="비밀번호를 입력해주세요."
          required
          maxlength="50"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">역할 선택</label>
        <div class="form-check" v-for="role in availableRoles" :key="role">
          <input
            v-model="signupForm.roles"
            class="form-check-input"
            type="checkbox"
            :value="role"
          />
          <label class="form-check-label">{{ role }}</label>
        </div>
      </div>

      <div class="flex gap-3 my-4">
        <button class="btn btn-primary" type="button" @click="signup">
          회원가입
        </button>
        <button class="btn btn-primary" type="button" @click="formReset">
          초기화
        </button>
        <RouterLink to="/home" class="btn btn-primary" @click="goHomePage"
          >홈으로</RouterLink
        >
      </div>
    </form>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { fetchAdminSignup } from '../../api/adminApi';

const router = useRouter();

// 사용할 수 있는 역할 목록 정의
const availableRoles = ['EXERCISE_ADMIN', 'STUDY_ADMIN', 'ROMANTIC_ADMIN'];

const signupForm = ref({
  nickname: null,
  email: null,
  password: null,
  roles: [],
});

const validateEmail = () => {
  // 이메일 정규식 패턴
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailPattern.test(signupForm.value.email)) {
    alert('유효한 이메일 주소를 입력해주세요. 예: user@example.com');
    return false;
  }
  return true;
};

// 회원가입 api 요청
const signup = () => {
  if (!validateEmail()) {
    formReset();
  } else {
    try {
      fetchAdminSignup({
        ...signupForm.value,
      });
      goHomePage();
    } catch (error) {
      console.error(error);
    }
  }
};

// 입력 값 초기화
const formReset = () => {
  signupForm.value.nickname = '';
  signupForm.value.email = '';
  signupForm.value.password = '';
  signupForm.value.roles = [];
};

// 홈으로 돌아가기
const goHomePage = () => {
  router.push({
    path: '/home',
  });
};
</script>

<style lang="scss" scoped></style>
