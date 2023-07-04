import { defineStore } from 'pinia';

interface User {
  email: string;
  gender: string;
  location: Object;
  name: string;
  phone: string;
  picture: Object;
}

interface RootState {
  allUsers: Array<User>;
  filteredUsers: Array<User>;
  genderFilter: String;
  searchFilter: String;
  user: User;
}

export const useStore = defineStore({
  id: 'counter',
  state: (): RootState => ({
    allUsers: [],
    user: {
      email: '',
      gender: '',
      location: {},
      name: '',
      phone: '',
      picture: {},
    },
    filteredUsers: [],
    genderFilter: '',
    searchFilter: '',
  }),
  actions: {
    addUsers(newUsers: Array<User>) {
      this.allUsers = this.allUsers.concat(newUsers);
      return this.allUsers;
    },

    setAllUsersLS(newUsers: Array<User>) {
      if (localStorage.getItem('allUsers')) {
        localStorage.allUsers = JSON.stringify(
          JSON.parse(localStorage.allUsers).concat(newUsers)
        );
      } else {
        localStorage.setItem('allUsers', JSON.stringify(newUsers));
      }
    },
    setFilteredUsers(newUsers: Array<User>) {
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
    setUser(newUser: User) {
      localStorage.setItem('user', JSON.stringify(newUser));
      const storedUser = localStorage.getItem('user');
      if (storedUser !== null && storedUser !== undefined) {
        this.user = JSON.parse(storedUser);
      }
      return this.user;
    },
  },
  getters: {
    getAllUsers(): Array<User> {
      let displayedUsers: Array<User> = [];
      const storedUsers = localStorage.getItem('allUsers');
      if (storedUsers !== null) {
        console.log('storedUsers !== null');
        console.log(storedUsers);
        displayedUsers = JSON.parse(storedUsers);
        console.log(displayedUsers);
      } else {
        console.log('storedUsers === null');
        displayedUsers = this.allUsers;
      }

      let storedFilteredUsers: string | null =
        localStorage.getItem('filteredUsers');
      if (
        storedFilteredUsers !== null &&
        storedFilteredUsers !== undefined
      ) {
        console.log(
          'storedFilteredUsers !== null && storedFilteredUsers !== undefined'
        );
        this.allUsers = JSON.parse(storedFilteredUsers);
      } else {
        this.allUsers = displayedUsers;
      }
      return this.allUsers;
    },
    getfilteredUsers(): Array<User> {
      const filteredUsersL = localStorage.getItem('filteredUsers');
      if (filteredUsersL !== null && filteredUsersL !== undefined) {
        this.filteredUsers = JSON.parse(filteredUsersL);
      }
      return this.filteredUsers;
    },
    getGenderFilter(): String {
      return this.genderFilter;
    },
    getSearchFilter(): String {
      return this.searchFilter;
    },
    getAllStoredUsers(): Array<User> {
      const allStoredUsers = localStorage.getItem('allUsers');

      if (allStoredUsers !== null && allStoredUsers !== undefined) {
        return JSON.parse(allStoredUsers);
      }
    },
    getUser(): User {
      const user = localStorage.getItem('user');
      if (user !== null && user !== undefined) {
        this.user = JSON.parse(user);
      }
      return this.user;
    },
  },
});
