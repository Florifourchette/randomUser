import { defineStore } from 'pinia';

interface RootState {
  allUsers: Array<Object>;
  filteredUsers: Array<Object>;
  genderFilter: String;
  searchFilter: String;
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
    searchFilter: '',
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
    addUsers(newUsers: Array<Object>) {
      this.allUsers = this.allUsers.concat(newUsers);
      return this.allUsers;
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
    setSearchFilter(newSearch: String) {
      localStorage.setItem('searchFilter', JSON.stringify(newSearch));

      const storedFilter = localStorage.getItem('searchFilter');

      if (storedFilter !== null && storedFilter !== undefined) {
        this.searchFilter = JSON.parse(storedFilter);
      }

      return this.filteredUsers;
    },
    setUser(newUser: Object) {
      localStorage.setItem('user', JSON.stringify(newUser));
      const storedUser = localStorage.getItem('user');
      if (storedUser !== null && storedUser !== undefined) {
        this.user = JSON.parse(storedUser);
      }
      return this.user;
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
      let storedFilteredUsers: string | null =
        localStorage.getItem('filteredUsers');
      if (
        storedFilteredUsers !== null &&
        storedFilteredUsers !== undefined
      ) {
        this.allUsers = JSON.parse(storedFilteredUsers);
      }

      console.log(storedFilteredUsers);
      console.log(this.allUsers);
      return this.allUsers;
    },
    getfilteredUsers(): Array<Object> {
      return this.filteredUsers;
    },
    getGenderFilter(): String {
      return this.genderFilter;
    },
    getSearchFilter(): String {
      return this.searchFilter;
    },
    getAllStoredUsers(): Array<Object> {
      const allStoredUsers = localStorage.getItem('allUsers');

      if (allStoredUsers !== null && allStoredUsers !== undefined) {
        return JSON.parse(allStoredUsers);
      }
    },
    getUser(): Object {
      const user = localStorage.getItem('user');
      if (user !== null && user !== undefined) {
        this.user = JSON.parse(user);
      }
      return this.user;
    },
  },
});
