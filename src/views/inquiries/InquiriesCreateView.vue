<template>
  <div class="container mx-auto">
    <h1 class="my-5 text-3xl">차단 해제 문의</h1>
    <form class="form-control my-5">
      <div class="mb-3">
        <label class="form-label">이메일</label>
        <input
          class="form-control"
          type="text"
          name="email"
          v-model="inquiryForm.email"
          placeholder="이메일을 입력해주세요."
          required
          maxlength="50"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">비밀번호</label>
        <input
          class="form-control"
          type="password"
          name="password"
          placeholder="비밀번호를 입력해주세요."
          v-model="inquiryForm.password"
          required
          maxlength="50"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">문의 내용</label>
        <textarea
          class="form-control"
          name="content"
          placeholder="내용을 입력해주세요."
          v-model="inquiryForm.content"
          maxlength="200"
        ></textarea>
      </div>
      <div class="flex gap-3 my-3">
        <button class="btn btn-primary" type="button" @click="inquire">
          문의하기
        </button>
        <button class="btn btn-danger" type="button" @click="formReset">
          초기화
        </button>
        <RouterLink to="/home" class="btn btn-primary">홈으로</RouterLink>
      </div>
    </form>
  </div>
</template>

<script setup>
import { fetchInquire } from '@/api/inquiryApi';
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

const router = useRouter();
const inquiryForm = ref({
  email: null,
  password: null,
  content: null,
});

const inquire = async () => {
  try {
    const response = await fetchInquire({ ...inquiryForm.value });
    if (response.status === 204) {
      alert('등록 성공!');
      router.push({ path: '/home' });
    }
  } catch (error) {
    if (error.response && error.response.status === 403) {
      // 로그인 실패 (401 응답 코드 경우)
      alert('로그인 후 이용해주세요.');
      router.push({
        path: '/home',
      });
    } else if (error.response && error.response.status === 401) {
      alert('존재하지 않는 사용자입니다.');
      return;
    } else {
      console.error('Failed to fetch get post detail', error);
      alert('게시글 정보를 불러오는데 실패했습니다.');
    }
  }
};

const formReset = () => {
  inquiryForm.value.email = '';
  inquiryForm.value.password = '';
  inquiryForm.value.content = '';
};
</script>

<style lang="scss" scoped></style>
