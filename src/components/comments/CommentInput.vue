<template>
  <div class="container mx-auto my-5">
    <form class="form-control">
      <div class="mb-3">
        <textarea
          class="form-control"
          v-model="inputContent"
          placeholder="댓글 내용을 입력해주세요."
          maxlength="200"
        ></textarea>
      </div>
      <div class="flex gap-3 my-3">
        <button class="btn btn-primary" type="button" @click="saveComment">
          댓글 생성
        </button>
        <button class="btn btn-danger" type="button" @click="resetContent">
          초기화
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { fetchSaveComment } from '@/api/commentApi';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const inputContent = ref('');
const emit = defineEmits(['fetchComments']);

const saveComment = async () => {
  try {
    const postId = route.params.postId;
    const response = await fetchSaveComment(postId, {
      content: inputContent.value,
    });
    if (response.status === 200) {
      console.log('댓글 작성 완료 !');
      emit('fetchComments');
      resetContent();
    }
  } catch (error) {
    console.error('Failed to fetch save comment', error);
    alert('댓글 작성에 실패했습니다.');
  }
};
const resetContent = () => {
  inputContent.value = '';
};
</script>

<style lang="scss" scoped></style>
