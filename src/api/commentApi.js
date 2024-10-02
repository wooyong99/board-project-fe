import instance from './http';

// 특정 게시글의 댓글 리스트 조회
export function fetchCommentByPost(postId) {
  return instance.get(`/posts/${postId}/comments`);
}

// 특정 게시글에 댓글 작성
export function fetchSaveComment(postId, data) {
  return instance.post(`/posts/${postId}/comments`, data);
}

// 특정 게시글의 특정 댓글 수정
export function fetchUpdateComment(postId, commentId, data) {
  return instance.put(`/posts/${postId}/comments/${commentId}`, data);
}

// 특정 게시글의 특정 댓글 삭제
export function fetchDeleteComment(postId, commentId) {
  return instance.delete(`/posts/${postId}/comments/${commentId}`);
}
