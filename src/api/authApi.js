import instance from './http';

// 로그인 API 호출
export function fetchLogin(data) {
  return instance.post('/auth/login', data);
}

// 로그아웃 API 호출
export function fetchLogout() {
  return instance.post('/auth/logout');
}

// 토큰 재발급 API 호출
export function reissue() {
  return instance.get('/auth/reissue');
}
