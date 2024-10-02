<template>
  <div class="container mx-auto my-20">
    <h1 class="my-5 text-3xl">게시글 등록</h1>
    <form class="form-control">
      <div class="mb-3">
        <label class="form-label">제목</label>
        <input
          class="form-control"
          type="text"
          v-model="postInfo.title"
          placeholder="제목을 입력해주세요."
          maxlength="50"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">내용</label>
        <textarea
          class="form-control"
          v-model="postInfo.content"
          placeholder="내용을 입력해주세요."
          maxlength="200"
        ></textarea>
      </div>

      <div class="mb-3">
        <label class="form-label" for="type">카테고리</label>
        <select
          class="form-control"
          id="type"
          v-model="postInfo.categoryId"
          required
        >
          <option value="0" disabled selected>게시판 카테고리</option>
          <option value="1">운동 게시판</option>
          <option value="2">공부 게시판</option>
          <option value="3">연애 게시판</option>
          <option value="4">자유 게시판</option>
        </select>
      </div>
      <div class="flex gap-3 my-3">
        <button class="btn btn-primary" type="button" @click="createPost">
          게시글 생성
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
import { ref } from 'vue';
import { fetchCreatePost } from '@/api/postApi';
import { useRouter } from 'vue-router';

const router = useRouter();

const postInfo = ref({
  title: '',
  content: '',
  categoryId: 0,
});

const createPost = async () => {
  try {
    console.log(postInfo.value);
    const response = await fetchCreatePost({ ...postInfo.value });
    if (response.status === 200) {
      alert('게시글 생성 완료');
      router.push({ path: '/home' });
    }
  } catch (error) {
    if (error.response && error.response.status === 403) {
      // 로그인 실패 (401 응답 코드 경우)
      alert('로그인 후 이용해주세요.');
      router.push({
        path: '/home',
      });
    } else {
      console.error('Failed to fetch create post :', error);
      alert('게시글을 생성하는데 실패했습니다.');
      router.push({ path: '/posts/create' });
    }
  }
};

const formReset = () => {
  postInfo.value.title = '';
  postInfo.value.content = '';
  postInfo.value.categoryId = 0;
};
</script>

<style lang="scss" scoped></style>
