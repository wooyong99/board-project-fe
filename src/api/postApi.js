import instance from './http';
import { useAuthStore } from '@/stores/auth';

// 게시글 생성
export function fetchCreatePost(data) {
  return instance.post('/posts', data);
}

// 게시글 수정
export function fetchUpdatePost(postId, data) {
  return instance.put(`/posts/${postId}`, data);
}

// 게시글 상세 조회
export function fetchPostDetail(id) {
  return instance.get(`/posts/${id}`);
}

// 게시글 리스트 조회
export function fetchPosts(data) {
  const params = {};

  if (data?.value?.keyword != null && data?.value?.keyword !== '') {
    params.keyword = data.value.keyword;
  }

  if (data?.value?.page != null && data.value.page !== 0) {
    params.page = data.value.page;
  }

  if (data?.value?.categoryId != null && data.value.categoryId !== 0) {
    params.categoryId = data.value.categoryId;
  }

  return instance.get('/posts/search', { params });
}

// 게시글 삭제
export function fetchDeletePost(id) {
  return instance.delete(`/posts/${id}`);
}

// 좋아요 증가
export function fetchIncreaseLike(id) {
  return instance.post(`/posts/${id}/like`);
}

// 게시글 신고
export function fetchDeclarationPost(id) {
  return instance.put(`/posts/${id}/declaration`);
}
