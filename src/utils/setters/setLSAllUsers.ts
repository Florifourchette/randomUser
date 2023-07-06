import type { User } from '@/interface/UserInterface';
import { setLSUsers } from './setLSUsers';

export function setLSAllUsers(users: User[]) {
  if (localStorage.getItem('allUsers')) {
    localStorage.allUsers = JSON.stringify(
      JSON.parse(localStorage.allUsers).concat(users)
    );
  } else {
    setLSUsers('allUsers', users);
  }
}
