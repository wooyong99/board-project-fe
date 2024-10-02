import { useAuthStore } from '@/stores/auth';

export function requireLogoutGuard(to, from, next) {
  const authStore = useAuthStore();
  console.log(authStore);
  if (authStore.token != '') {
    alert('로그인 상태입니다. 로그아웃 후 이용해주세요.');
    next('/home');
  } else {
    next();
  }
}
