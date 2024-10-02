<template>
  <div class="px-4 border-b-2 py-2 hover:bg-gray-100 hover:cursor-pointer">
    <div v-if="!isEditing">
      <div class="text-base mb-1">작성자 : {{ props.author }}</div>
      <div class="text-sm">내용 : {{ props.content }}</div>
    </div>
    <div v-else>
      <!-- 댓글 수정 폼 -->
      <div v-show="isEditing">
        <form class="form-control my-3">
          <textarea
            v-model="editContent"
            class="form-control mt-3"
            rows="3"
          ></textarea>
        </form>
      </div>
    </div>
    <div class="flex justify-end gap-2 mt-2">
      <button
        v-show="isEditing"
        class="btn btn-primary text-xs"
        type="button"
        @click="editComment"
      >
        수정 완료
      </button>
      <button
        class="btn btn-warning text-xs"
        type="button"
        :disabled="!canModify"
        @click="toggleEdit"
      >
        {{ isEditing ? '댓글 수정 취소' : '댓글 수정' }}
      </button>
      <button
        class="btn btn-danger text-xs"
        type="button"
        :disabled="!canModify"
        @click="deleteComment"
      >
        댓글 삭제
      </button>
      <button class="btn btn-success text-xs" type="button">댓글 신고</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRoute } from 'vue-router';
import { fetchDeleteComment, fetchUpdateComment } from '@/api/commentApi';

const route = useRoute();
const emit = defineEmits(['fetchComments']);
const postId = route.params.postId;

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const authStore = useAuthStore();

// 댓글 수정 상태 관리
const isEditing = ref(false);
const editContent = ref(props.content); // 수정할 내용

// 댓글 수정 폼 토글 함수
const toggleEdit = () => {
  isEditing.value = !isEditing.value;
  editContent.value = props.content;
};

// 수정 및 삭제 가능 여부를 판별하는 computed 속성
const canModify = computed(() => {
  return authStore.email === props.author || authStore.isAdmin;
});

const editComment = async () => {
  try {
    const response = await fetchUpdateComment(postId, props.id, {
      content: editContent.value,
    });
    if (response.status === 204) {
      console.log('댓글 수정 완료');
      isEditing.value = !isEditing.value;
      emit('fetchComments');
    }
  } catch (error) {
    console.error('Failed to fetch update comments ', error);
    alert('댓글을 수정하는데 실패했습니다.');
  }
};

const deleteComment = async () => {
  try {
    const response = await fetchDeleteComment(postId, props.id);
    if (response.status === 200) {
      console.log('댓글 삭제 성공 !');
      emit('fetchComments');
    }
  } catch (error) {
    console.error('Failed to fetch delete comments ', error);
    alert('댓글을 삭제하는데 실패했습니다.');
  }
};
</script>

<style lang="scss" scoped></style>
