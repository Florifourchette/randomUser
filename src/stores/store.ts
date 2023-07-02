import { defineStore } from 'pinia';

interface RootState {
  allUsers: Array<Object>;
}

export const useStore = defineStore({
  id: 'counter',
  state: (): RootState => ({
    allUsers: [],
  }),
  actions: {
    setAllUsers(newUsers: Array<Object>) {
      this.allUsers = newUsers;
      console.log(this.allUsers);
      return this.allUsers;
    },
    addUsers(newUsers: Array<Object>) {
      this.allUsers = this.allUsers.concat(newUsers);
      return this.allUsers;
    },
  },
  getters: {
    getAllUsers(): Array<Object> {
      return this.allUsers;
    },
  },
});
