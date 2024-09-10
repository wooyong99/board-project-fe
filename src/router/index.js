import { createRouter, createWebHistory } from 'vue-router';

// 연결할 각 컴포넌트 import (src/views 폴더 아래 컴포넌트들 생성)
import SamplePage from '@/pages/SamplePage.vue';
// 라우터 설계
const routes = [
  {
    path: '/sample',
    component: SamplePage,
  },
];

// 라우터 생성
const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

// 라우터 추출 (main.js에서 import)
export default router;
