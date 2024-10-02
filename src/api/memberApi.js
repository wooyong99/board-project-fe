import instance from './http';

// 일반 사용자 회원가입
export function fetchSignup(data) {
  return instance.post('/members/signup', data);
}

// 프로필 조회 API 호출
export function fetchUserProfile() {
  return instance.get('/members/profile');
}

// 닉네임 수정 API 호출
export function fetchUpdateNickname(data) {
  return instance.put('/members/nickname', data);
}

// 비밀번호 수정 API 호출
export function fetchUpdatePassword(data) {
  return instance.put('/members/password', data);
}

// 회원 탈퇴 API 호출
export function fetchDeleteMember() {
  return instance.delete('/members');
}
