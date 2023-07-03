import { defineStore } from 'pinia';

interface RootState {
  allUsers: Array<Object>;
  filteredUsers: Array<Object>;
  genderFilter: String;
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
    filteredUsers: [],
    genderFilter: '',
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
      if (localStorage.getItem('allUsers')) {
        localStorage.allUsers = JSON.stringify(
          JSON.parse(localStorage.allUsers).concat(newUsers)
        );
      } else {
        localStorage.setItem('allUsers', JSON.stringify(newUsers));
      }
    },
    setFilteredUsers(newUsers: Array<Object>) {
      localStorage.setItem('filteredUsers', JSON.stringify(newUsers));
      const storedUsers = localStorage.getItem('filteredUsers');

      if (storedUsers !== null && storedUsers !== undefined) {
        this.filteredUsers = JSON.parse(storedUsers);
      }

      return this.filteredUsers;
    },
    setGenderFilter(newFilter: String) {
      localStorage.setItem('genderFilter', JSON.stringify(newFilter));
      const storedFilter = localStorage.getItem('genderFilter');

      if (storedFilter !== null && storedFilter !== undefined) {
        this.genderFilter = JSON.parse(storedFilter);
      }

      return this.filteredUsers;
    },
  },
  getters: {
    getAllUsers(): Array<Object> {
      let displayedUsers: Array<Object> = [];
      const storedUsers = localStorage.getItem('allUsers');
      if (storedUsers !== null) {
        displayedUsers = JSON.parse(storedUsers);
      } else {
        displayedUsers = this.allUsers;
      }

      console.log(displayedUsers);
      console.log(localStorage.genderFilter);

      const genderFilter = parseInt(localStorage.genderFilter, 10);
      let filteredUsers: Array<Object> = [];
      console.log(
        localStorage.getItem('genderFilter') === null ||
          localStorage.getItem('genderFilter') === undefined
          ? 'not working'
          : 'all good'
      );
      if (localStorage.genderFilter === '1') {
        filteredUsers = displayedUsers.filter((user) => {
          return user.gender === 'male';
        });
      } else if (localStorage.genderFilter === '2') {
        filteredUsers = displayedUsers.filter(
          (user) => user.gender === 'female'
        );
      } else {
        filteredUsers = displayedUsers;
      }
      console.log(filteredUsers);
      this.allUsers = filteredUsers;
      console.log(this.allUsers);
      return this.allUsers;
    },
    getfilteredUsers(): Array<Object> {
      return this.filteredUsers;
    },
    getGenderFilter(): String {
      return this.genderFilter;
    },
    getUser(): Object {
      return this.user;
    },
  },
});
