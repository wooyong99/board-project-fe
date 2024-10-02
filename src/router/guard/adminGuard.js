import { useAuthStore } from '@/stores/auth';

export function adminGuard(to, from, next) {
  const authStore = useAuthStore();
  if (!authStore.isAdmin) {
    alert('관리자 회원만 접근 가능한 페이지입니다.');
    next('/home');
  } else {
    next();
  }
}
