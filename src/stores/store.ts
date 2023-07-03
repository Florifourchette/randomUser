import { defineStore } from 'pinia';

interface RootState {
  allUsers: Array<Object>;
  user: Object;
  // {
  //   first: String;
  //   last: String;
  //   email: String;
  //   picture: String;
  //   id: Number;
  //   location: {
  //     city: String;
  //     country: String;
  //     postcode: Number;
  //     state: String;
  //     street: {
  //       name: String;
  //       number: Number;
  //     };
  //   };
  //   phone: String;
  // };
}

export const useStore = defineStore({
  id: 'counter',
  state: (): RootState => ({
    allUsers: [],
    user: {},
    // {
    //   first: '',
    //   last: '',
    //   email: '',
    //   picture: '',
    //   id: 0,
    //   location: {
    //     city: '',
    //     country: '',
    //     postcode: 0,
    //     state: '',
    //     street: {
    //       name: '',
    //       number: 0,
    //     },
    //   },
    //   phone: '',
    // },
  }),
  actions: {
    // setAllUsers(newUsers: Array<Object>) {
    //   this.allUsers = newUsers;
    //   console.log(this.allUsers);
    //   return this.allUsers;
    // },
    addUsers(newUsers: Array<Object>) {
      this.allUsers = this.allUsers.concat(newUsers);
      return this.allUsers;
    },
    setUser(newUser: Object) {
      this.user = newUser;
      return newUser;
    },
    setAllUsersLS(newUsers: Array<Object>) {
      console.log(newUsers);
      const currentStorage = JSON.parse(localStorage.allUsers);
      localStorage.allUsers = JSON.stringify(
        currentStorage.concat(newUsers)
      );
    },
  },
  getters: {
    getAllUsers(): Array<Object> {
      return this.allUsers;
    },
    getUser(): Object {
      return this.user;
    },
  },
});
