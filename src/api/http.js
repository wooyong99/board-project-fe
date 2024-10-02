import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

const instance = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
});

// 요청 인터셉터 추가 (토큰 설정)
instance.interceptors.request.use(config => {
  const authStore = useAuthStore();

  if (authStore.token) {
    config.headers.Authorization = authStore.token;
  }
  return config;
});

export default instance;
