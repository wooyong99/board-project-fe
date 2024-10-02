import { useAuthStore } from '@/stores/auth';

export function requireAuthGuard(to, from, next) {
  const authStore = useAuthStore();
  if (!authStore.token) {
    alert('로그인 후 이용 가능한 페이지입니다.');
    next('/home');
  } else {
    next();
  }
}
