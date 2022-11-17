import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { resSuccessUser, resFailedUser } from 'components/models';

export const useAuthenticationStore = defineStore('user', {
  state: () => ({
    email: '',
    token: '',
    isLogged: false,
  }),
  getters: {
    getUserName: (state) => state.email.slice(0, state.email.indexOf('@') - 1),
    getToken: (state) => state.token,
    getIsLogged: (state) => state.isLogged,
  },
  actions: {
    login(
      email: string,
      password: string
    ): Promise<resSuccessUser | resFailedUser> {
      return api
        .post('/login', { email: email, password: password })
        .then((res) => <resSuccessUser | resFailedUser>res.data);
    },
    logout() {
      localStorage.removeItem('user');
    },
  },
  persist: {
    paths: ['isLogged'],
  },
});
