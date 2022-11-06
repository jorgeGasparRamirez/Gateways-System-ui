import { defineStore } from 'pinia';

export const useAuthenticationStore = defineStore('user', {
  state: () => ({
    email: '',
    isLogged: false,
  }),
  getters: {
    getUserName: (state) => state.email.slice(0, state.email.indexOf('@') - 1),
    getIsLogged: (state) => state.isLogged,
  },
  actions: {
    async login(email: string, pass: string): Promise<boolean> {
      if (email === 'root@gmail.com' && pass === 'PeaceAndLove2022') {
        this.isLogged = true;
        return true;
      }
      return false;
    },
    logout() {
      localStorage.removeItem('user');
    },
  },
  persist: {
    paths: ['isLogged'],
  },
});
