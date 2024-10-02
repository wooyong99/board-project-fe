<template>
  <TheCategoryNav></TheCategoryNav>
  <h1 class="container mx-auto text-4xl my-10">
    {{ postInfo.id }}번 게시글 수정하기
  </h1>
  <div class="container mx-auto my-20">
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
        <label class="form-label" for="type">Type</label>
        <select class="form-control" id="type" name="type">
          <option value="" disabled selected>{{ postInfo.category }}</option>
        </select>
      </div>
      <div class="flex gap-3 my-3">
        <button class="btn btn-primary" type="button" @click="updatePost">
          수정 완료
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
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { fetchPostDetail, fetchUpdatePost } from '@/api/postApi';
import router from '@/router';

const route = useRoute();

const postInfo = ref({
  id: '',
  title: '',
  content: '',
  category: '',
});

const updatePost = async () => {
  try {
    const postId = route.params.postId;
    console.log(postId);
    const response = await fetchUpdatePost(postId, {
      title: postInfo.value.title,
      content: postInfo.value.content,
    });
    if (response.status === 200) {
      alert('게시글 수정 완료 !');
      router.push({ path: `/posts/${postId}` });
    }
  } catch (error) {
    console.error('Failed to fetch update post', error);
    alert('게시글을 수정하는데 실패했습니다.');
    formReset();
  }
};

const formReset = () => {
  postInfo.value.title = '';
  postInfo.value.content = '';
};

onMounted(async () => {
  try {
    const postId = route.params.postId;
    const response = await fetchPostDetail(`${postId}`);
    postInfo.value = response.data;
    console.log(response.data);
  } catch (error) {
    if (error.response && error.response.status === 403) {
      // 로그인 실패 (401 응답 코드 경우)
      alert('로그인 후 이용해주세요.');
      router.push({
        path: '/home',
      });
    } else {
      console.error('Failed to fetch get post detail', error);
      alert('게시글 정보를 불러오는데 실패했습니다.');
    }
  }
});
</script>

<style lang="scss" scoped></style>
