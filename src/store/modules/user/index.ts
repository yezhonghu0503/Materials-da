import { defineStore } from 'pinia';
import {
  login as userLogin,
  logout as userLogout,
  LoginData,
} from '@/api/user';
import { setToken, clearToken, setuserInfo, setRoleList } from '@/utils/auth';
import { getRoleDetailed } from '@/api/form';
import { UserState } from './types';

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    name: undefined,
    avatar: undefined,
    job: undefined,
    organization: undefined,
    location: undefined,
    email: undefined,
    introduction: undefined,
    personalWebsite: undefined,
    jobName: undefined,
    organizationName: undefined,
    locationName: undefined,
    phone: undefined,
    registrationDate: undefined,
    accountId: undefined,
    certification: undefined,
    role: '',
  }),

  getters: {
    userInfo(state: UserState): UserState {
      return { ...state };
    },
  },

  actions: {
    switchRoles() {
      return new Promise((resolve) => {
        this.role = this.role === 'user' ? 'admin' : 'user';
        resolve(this.role);
      });
    },
    // Set user's information
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial);
    },

    // Reset user's information
    resetInfo() {
      this.$reset();
    },

    // Get user's information
    async info() {
      // const res = await getUserInfo();
      // this.setInfo(res.data);
    },
    // 权限列表
    async roleList(id: any) {
      const res = await getRoleDetailed({ roleId: id });
      setRoleList(res.data.hasIds);
      // localStorage.setItem('roleList', JSON.stringify(res.data.hasIds));
    },

    // Login
    async login(loginForm: LoginData) {
      try {
        const res = await userLogin(loginForm);
        setToken(res.data.token);
        setuserInfo(JSON.stringify(res.data));
        // console.log(res.data);
      } catch (err) {
        clearToken();
        throw err;
      }
    },

    // Logout
    async logout() {
      await userLogout();

      this.resetInfo();
      clearToken();
    },
  },
});

export default useUserStore;
