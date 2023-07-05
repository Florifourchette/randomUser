import { emptyUser } from '@/interface/emptyUser';
import type { User } from '../interface/UserInterface';

import { defineStore } from 'pinia';

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
    user: emptyUser,
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

      if (
        storedUsers !== null &&
        storedUsers !== undefined &&
        storedUsers !== 'undefined'
      ) {
        this.filteredUsers = JSON.parse(storedUsers);
      }
      return this.filteredUsers;
    },
    setGenderFilter(newFilter: String) {
      localStorage.setItem('genderFilter', JSON.stringify(newFilter));
      const storedFilter = localStorage.getItem('genderFilter');

      if (
        storedFilter !== null &&
        storedFilter !== undefined &&
        storedFilter !== 'undefined'
      ) {
        this.genderFilter = JSON.parse(storedFilter);
      }

      return this.filteredUsers;
    },
    setSearchFilter(newSearch: String) {
      localStorage.setItem('searchFilter', JSON.stringify(newSearch));

      const storedFilter = localStorage.getItem('searchFilter');

      if (
        storedFilter !== null &&
        storedFilter !== undefined &&
        storedFilter !== 'undefined'
      ) {
        this.searchFilter = JSON.parse(storedFilter);
      }

      return this.filteredUsers;
    },
    setUser(newUser: User) {
      localStorage.setItem('user', JSON.stringify(newUser));
      const storedUser = localStorage.getItem('user');
      if (
        storedUser !== null &&
        storedUser !== undefined &&
        storedUser !== 'undefined'
      ) {
        this.user = JSON.parse(storedUser);
      }
      return this.user;
    },
  },
  getters: {
    getAllUsers(): Array<User> {
      console.log('get AllUsers started');
      let displayedUsers: Array<User> = [];
      const storedUsers = localStorage.getItem('allUsers');
      if (
        storedUsers !== null &&
        storedUsers !== undefined &&
        storedUsers !== 'undefined'
      ) {
        displayedUsers = JSON.parse(storedUsers);
      } else {
        displayedUsers = this.allUsers;
      }

      console.log(displayedUsers);

      localStorage.setItem('this.filteredUsers', '');

      let storedFilteredUsers: string | null =
        localStorage.getItem('filteredUsers');
      console.log(storedFilteredUsers);

      if (
        storedFilteredUsers !== null &&
        storedFilteredUsers !== undefined &&
        storedFilteredUsers !== ''
      ) {
        console.log(
          "storedFilteredUsers !== null && storedFilteredUsers !== undefined &&storedFilteredUsers !== 'undefined'"
        );
        this.allUsers = JSON.parse(storedFilteredUsers);
      } else {
        console.log('else');
        this.allUsers = displayedUsers;
      }

      this.allUsers = displayedUsers;
      return this.allUsers;
    },
    getfilteredUsers(): Array<User> {
      const filteredUsersL = localStorage.getItem('filteredUsers');
      if (
        filteredUsersL !== null &&
        filteredUsersL !== undefined &&
        filteredUsersL !== 'undefined'
      ) {
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
      if (
        allStoredUsers !== null &&
        allStoredUsers !== undefined &&
        allStoredUsers !== 'undefined'
      ) {
        return JSON.parse(allStoredUsers);
      } else {
        return this.allUsers;
      }
    },
    getUser(): User {
      const user = localStorage.getItem('user');
      if (user !== null && user !== undefined) {
        this.user = JSON.parse(user);
      } else {
        this.user = emptyUser;
      }
      return this.user;
    },
  },
});
