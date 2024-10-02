import { createRouter, createWebHistory } from 'vue-router';

// 연결할 각 컴포넌트 import (src/views 폴더 아래 컴포넌트들 생성)
import PostCreateView from '@/views/posts/PostCreateView.vue';
import PostUpdateView from '@/views/posts/PostUpdateView.vue';
import Signup from '@/views/members/MemberSignupView.vue';
import MainView from '@/views/posts/PostListView.vue';
import LoginView from '@/views/members/MemberLoginView.vue';
import MyPageView from '@/views/members/MemberProfileView.vue';
import NicknameUpdateView from '@/views/members/NicknameUpdateView.vue';
import PasswordUpdateView from '@/views/members/PasswordUpdateView.vue';
import PostDetailView from '@/views/posts/PostDetailView.vue';
import MemberListView from '@/views/members/MemberListView.vue';
import InquiriesListView from '@/views/inquiries/InquiriesListView.vue';
import InquiriesCreateView from '@/views/inquiries/InquiriesCreateView.vue';
import { useAuthStore } from '@/stores/auth';
import { adminGuard } from './guard/adminGuard';
import { requireAuthGuard } from './guard/requireAuthGuard';
import { requireLogoutGuard } from './guard/requireLogoutGuard';
import InquiriesDetailView from '@/views/inquiries/InquiriesDetailView.vue';
import AdminSignupView from '@/views/members/AdminSignupView.vue';

// 라우터 설계
const routes = [
  {
    path: '/',
    component: MainView,
  },
  {
    path: '/home',
    name: 'home',
    component: MainView,
  },
  {
    path: '/admins/signup',
    component: AdminSignupView,
  },
  {
    path: '/signup',
    component: Signup,
    beforeEnter: requireLogoutGuard,
  },
  {
    path: '/login',
    component: LoginView,
    beforeEnter: requireLogoutGuard,
  },
  {
    path: '/posts/create',
    component: PostCreateView,
    beforeEnter: requireAuthGuard,
  },
  {
    path: '/posts/:postId',
    component: PostDetailView,
  },
  {
    path: '/posts/:postId/update',
    component: PostUpdateView,
    beforeEnter: requireAuthGuard,
  },
  {
    path: '/members/profile',
    component: MyPageView,
    beforeEnter: requireAuthGuard,
  },
  {
    path: '/members/update/nickname',
    component: NicknameUpdateView,
    beforeEnter: requireAuthGuard,
  },
  {
    path: '/members/update/password',
    component: PasswordUpdateView,
    beforeEnter: requireAuthGuard,
  },
  {
    path: '/admins/search/members',
    component: MemberListView,
    beforeEnter: adminGuard,
  },
  {
    path: '/inquiries',
    component: InquiriesListView,
    beforeEnter: adminGuard,
  },
  {
    path: '/inquiries/:inquiryId',
    component: InquiriesDetailView,
    beforeEnter: adminGuard,
  },
  {
    path: '/inquiries/create',
    component: InquiriesCreateView,
  },
];

// 라우터 생성
const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

// 전역 가드 설정
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  // const excludedPaths = ['/login', '/signup', '/inquires/create'];

  // if (excludedPaths.includes(to.path)) {
  //   return next();
  // }
  // 사용자 정보를 가져오기
  try {
    await authStore.fetchUserInfo();
  } catch (error) {
    console.log();
  }

  // 다음 라우트로 이동
  next();
});

// 라우터 추출 (main.js에서 import)
export default router;
