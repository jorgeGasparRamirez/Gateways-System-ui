import { defineStore } from 'pinia';

export const useAuthenticationStore = defineStore('user', {
  state: () => ({
    email: '',
    isLogged: false,
  }),
  getters: {
    getUserName: (state) => state.email.slice(0, state.email.indexOf('@') - 1),
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
      this.$reset;
    },
  },
  persist: {
    paths: ['isLogged'],
  },
});
