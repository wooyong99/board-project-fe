<template>
  <div class="container mx-auto flex justify-center my-20">
    <form class="form-control">
      <h1 class="flex justify-center text-4xl my-5">비밀번호 변경 페이지</h1>
      <div class="mb-3">
        <label class="form-label">기존 비밀번호</label>
        <input
          class="form-control"
          type="password"
          v-model="request.originPassword"
          placeholder="기존 비밀번호를 입력해주세요."
          maxlength="50"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">변경 비밀번호</label>
        <input
          class="form-control"
          type="password"
          v-model="request.newPassword"
          placeholder="변경 비밀번호를 입력해주세요."
          maxlength="50"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">변경 비밀번호 확인</label>
        <input
          class="form-control"
          type="password"
          v-model="request.newPasswordConfirm"
          placeholder="변경 비밀번호를 다시 입력해주세요."
          maxlength="50"
        />
      </div>
      <div class="flex gap-3">
        <button
          class="btn btn-primary mt-5"
          type="button"
          @click="updatePassword"
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
import { fetchUpdatePassword } from '@/api/memberApi';
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

const router = useRouter();

// 반응형 상태 변수 선언
const request = ref({
  originPassword: '',
  newPassword: '',
  newPasswordConfirm: '',
});

const validate = () => {
  if (request.value.newPassword === request.value.originPassword) {
    alert('이전 비밀번호가 동일합니다.');
    return false;
  } else if (
    !(request.value.newPassword === request.value.newPasswordConfirm)
  ) {
    alert('변경 비밀번호와 변경 비밀번호 확인 값일 일치하지 않습니다.');
    return false;
  }
  return true;
};

const updatePassword = async () => {
  try {
    if (validate()) {
      const response = await fetchUpdatePassword({
        ...request.value,
      });
      if (response.status === 204) {
        alert('비밀번호를 변경하였습니다 !');
        router.push({ path: '/members/profile' });
      }
    }
  } catch (error) {
    // 오류 응답이 존재하고, 상태 코드가 400인 경우
    if (error.response && error.response.status === 400) {
      console.error(
        'Bad Request: Invalid input or request format',
        error.response.data,
      );
      alert(
        `비밀번호 변경 실패: ${error.response.data || '잘못된 요청입니다.'}`,
      );
    } else {
      // 다른 오류에 대한 처리
      console.error('Failed to update password:', error);
      alert(
        `비밀번호 변경 실패 이유: ${error.response ? error.response.data : error.message}`,
      );
    }
  } finally {
    formReset();
  }
};
// 입력 값 초기화
const formReset = () => {
  request.value.originPassword = '';
  request.value.newPassword = '';
  request.value.newPasswordConfirm = '';
};
</script>

<style lang="scss" scoped></style>
