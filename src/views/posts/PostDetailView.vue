<template>
  <div class="container mx-auto flex flex-column gap-3 border-b-2 pb-3 px-4">
    <div class="flex border-b-2 pl-5 pb-3 mt-4">
      <h1 class="text-3xl flex items-center">{{ postInfo.id }}번 게시글</h1>
      <div class="flex-grow"></div>
      <div class="flex items-center">
        <span class="badge text-bg-primary mr-2">카테고리</span>
        {{ postInfo.category }}
      </div>
      <div class="flex items-center">
        <span class="badge text-bg-primary ml-3 mr-2">작성자</span>
        {{ postInfo.author }}
      </div>
    </div>

    <div><span class="btn btn-primary">제목</span> {{ postInfo.title }}</div>
    <div><span class="btn btn-primary">내용</span> {{ postInfo.content }}</div>
    <div class="justify-end">
      <span class="btn btn-primary">작성일자</span>
      {{ postInfo.createdAt }}
    </div>

    <div class="self-center">
      <button
        class="btn btn-danger text-lg"
        type="button"
        @click="increaseLike"
      >
        좋아요 : {{ postInfo.likes }}
      </button>
    </div>
  </div>
  <div class="container mx-auto flex gap-3 justify-end my-4 items-center px-4">
    <button
      class="btn btn-warning"
      @click="navigateEditPost"
      :disabled="!canModify"
    >
      수정하기
    </button>
    <button
      class="btn btn-danger"
      type="button"
      :disabled="!canModify"
      @click="deletePost"
    >
      삭제하기
    </button>
    <button
      v-if="postInfo.author != authStore.email"
      class="btn btn-success"
      type="button"
      @click="declarationPost"
      :disabled="authStore.token == ''"
    >
      게시글 신고
    </button>
    <RouterLink class="btn btn-primary" to="/home">홈으로</RouterLink>
  </div>
  <div
    v-for="comment in comments"
    :key="comment.id"
    class="container mx-auto my-10"
  >
    <CommentListItem
      :id="comment.commentId"
      :author="comment.author"
      :content="comment.content"
      @fetchComments="getComments"
    ></CommentListItem>
  </div>
  <!-- 댓글 입력 폼 -->
  <CommentInput @fetch-comments="getComments"></CommentInput>
</template>

<script setup>
import { fetchCommentByPost } from '@/api/commentApi';
import {
  fetchDeletePost,
  fetchIncreaseLike,
  fetchDeclarationPost,
  fetchPostDetail,
} from '@/api/postApi';
import CommentListItem from '@/components/comments/CommentListItem.vue';
import { onMounted, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import CommentInput from '@/components/comments/CommentInput.vue';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const postInfo = ref({
  id: '',
  title: '',
  content: '',
  createdAt: '',
  category: '',
  author: '',
  likes: 0,
});

const comments = ref([]);

const postId = route.params.postId;

const navigateEditPost = () => {
  router.push({ path: `${route.path}/update` });
};

// 수정 및 삭제 가능 여부를 판별하는 computed 속성
const canModify = computed(() => {
  return authStore.email === postInfo.value.author || authStore.isAdmin;
});

const getPost = async () => {
  try {
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
};

const increaseLike = async () => {
  try {
    const response = await fetchIncreaseLike(`${postId}`);
    if (response.status === 200) {
      postInfo.value.likes = response.data;
    }
  } catch (error) {
    console.error('Failed to fetch increase like count ', error);
    alert('좋아요 수를 증가시키는데 실패했습니다.');
  }
};

const getComments = async () => {
  try {
    const response = await fetchCommentByPost(`${postId}`);
    comments.value = response.data;
    console.log(response.data);
  } catch (error) {
    console.error('Failed to fetch get comments ', error);
    alert('댓글 리스트 정보를 불러오는데 실패했습니다.');
  }
};

const deletePost = async () => {
  try {
    const response = await fetchDeletePost(`${postId}`);
    if (response.status === 204) {
      alert('게시글 삭제 성공 !');
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
      console.error('Failed to fetch delete post ', error);
      alert('게시글을 삭제하는데 실패했습니다.');
    }
  }
};

const declarationPost = async () => {
  const isConfirmed = confirm(
    '정말 해당 게시글을 신고하시겠습니까 ? 게시글 신고 시, 해당 게시글은 삭제됩니다.',
  );

  if (!isConfirmed) {
    return;
  }

  try {
    const response = await fetchDeclarationPost(postId);

    if (response.status === 204) {
      alert('게시글 신고 성공');
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
      console.error('Failed to fetch delete post ', error);
      alert('게시글을 신고하는데 실패했습니다.');
    }
  }
};

onMounted(() => {
  getPost();
  getComments();
});
</script>
<style lang="scss" scoped></style>
