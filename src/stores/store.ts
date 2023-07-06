import { emptyUser } from '@/interface/emptyUser';
import type { User } from '../interface/UserInterface';

import { defineStore } from 'pinia';
import { getLSUsers } from '@/utils/getters/getLSUsers';
import { getLSFilteredUsers } from '@/utils/getters/getLSFilteredUsers';
import { getLSFilter } from '@/utils/getters/getLSFilter';
import { getLSUser } from '@/utils/getters/getLSUser';
import { setLSUsers } from '@/utils/setters/setLSUsers';
import { setLSAllUsers } from '@/utils/setters/setLSAllUsers';
import { setLSFilter } from '@/utils/setters/setLSFilter';
import { setLSUser } from '@/utils/setters/setLSUser';

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

  //All setters are setting the local storage before returning the values from Pinia store (expect for addUsers)
  actions: {
    addUsers(newUsers: Array<User>) {
      this.allUsers = this.allUsers.concat(newUsers);
      return this.allUsers;
    },

    setAllUsersLS(newUsers: Array<User>) {
      setLSAllUsers(newUsers);
    },
    setFilteredUsers(newUsers: Array<User>) {
      this.filteredUsers = setLSUsers('filteredUsers', newUsers);
      return this.filteredUsers;
    },
    setGenderFilter(newFilter: String) {
      this.genderFilter = setLSFilter('genderFilter', newFilter);
      return this.genderFilter;
    },
    setSearchFilter(newSearch: String) {
      this.genderFilter = setLSFilter('searchFilter', newSearch);
      return this.genderFilter;
    },
    setUser(newUser: User) {
      this.user = setLSUser(newUser);
      return this.user;
    },
  },
  getters: {
    //All getters follow the same process. Retrieve data from Local Storage, check if data is correct, modify the Pinia store data and returning the Pinia store data
    getAllUsers(): Array<User> {
      //retrieve data from local storage if there is a filter, then the filtered data will be displaying otherwise the complete array of users will be showing if none of them is in the local storage then the users from Pinia store will be showing

      let displayedUsers: Array<User> = [];
      let filteredUsers: Array<User> = [];

      displayedUsers = getLSUsers();
      filteredUsers = getLSFilteredUsers();

      filteredUsers.length === 0
        ? displayedUsers
        : (this.allUsers = filteredUsers);

      displayedUsers.length === 0
        ? this.allUsers
        : (this.allUsers = displayedUsers);

      return this.allUsers;
    },
    getfilteredUsers(): Array<User> {
      //trying to get the filtered array from the Local Storage, if no array, the return the filtered users from the Pinia store - particularly important for the search bar upon refreshing
      let filteredUsers: Array<User> = [];

      filteredUsers = getLSFilteredUsers();

      filteredUsers.length === 0
        ? this.filteredUsers
        : (this.filteredUsers = filteredUsers);

      return this.filteredUsers;
    },
    getGenderFilter(): String {
      let genderFilter: String = '';
      genderFilter = getLSFilter('genderFilter');
      genderFilter === ''
        ? this.genderFilter
        : (this.genderFilter = genderFilter);
      return this.genderFilter;
    },
    getSearchFilter(): String {
      let searchFilter: String = '';
      searchFilter = getLSFilter('searchFilter');

      searchFilter === ''
        ? this.searchFilter
        : (this.searchFilter = searchFilter);
      return this.searchFilter;
    },
    getAllStoredUsers(): Array<User> {
      let allUsers: Array<User> = [];
      allUsers = getLSUsers();
      allUsers.length === 0
        ? this.allUsers
        : (this.allUsers = allUsers);
      return this.allUsers;
    },
    getUser(): User {
      this.user = getLSUser(this.user);
      return this.user;
    },
  },
});
