import { reissue } from '@/api/authApi';
import { defineStore } from 'pinia';

// 다른 컴포넌트에서 사용할 수 있게 export 해주고
// 가져온 defineStore()에 첫번째 파라미터로 다른 컴포넌트에서 쓸 이름을 설정해준다. (='token')
// 두번째 파라미터로 store에 관련된 옵션을 정의해주면 된다.
export const useAuthStore = defineStore('auth', {
  // 상태
  state: () => ({
    email: '',
    nickname: '',
    isBlocked: false,
    isAdmin: false,
    token: '',
    isLoading: true,
  }),
  // computed
  getters: {},
  // method
  actions: {
    save(data) {
      this.email = data.email;
      this.nickname = data.nickname;
      this.isBlocked = data.isBlocked;
      this.isAdmin = data.isAdmin;
      this.token = data.accessToken;
      // console.log(this.email);
      // console.log(this.nickname);
      // console.log(this.isBlocked);
      // console.log(this.isAdmin);
      // console.log(this.token);
    },
    init() {
      this.email = '';
      this.nickname = '';
      this.isBlocked = false;
      this.isAdmin = false;
      this.token = '';
      // console.log(this.email);
      // console.log(this.nickname);
      // console.log(this.isBlocked);
      // console.log(this.isAdmin);
      // console.log(this.token);
    },
    async fetchUserInfo() {
      try {
        const response = await reissue();

        if (response.status === 200) {
          this.save(response.data);
          // this.email = response.data.email;
          // this.nickname = response.data.nickname;
          // this.isBlocked = response.data.blocked;
          // this.isAdmin = response.data.admin;
          // this.token = response.data.accessToken;
          // console.log(this.email);
          // console.log(this.nickname);
          // console.log(this.isBlocked);
          // console.log(this.isAdmin);
          // console.log(this.token);
        }
      } catch (error) {
        this.email = '';
        this.nickname = '';
        this.isBlocked = false;
        this.isAdmin = false;
        this.token = '';
      } finally {
        this.isLoading = false;
      }
    },
  },
});
