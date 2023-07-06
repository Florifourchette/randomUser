import type { User } from '@/interface/UserInterface';
import { useStore } from '@/stores/store';
import { callRandomUSers } from './Apicall';

export function handleAPI(): Promise<Array<User>> {
  const store = useStore();
  let users: Array<User> = [];
  console.log('handleAPI');
  return callRandomUSers()
    .then((data: Array<User>) => {
      console.log(data);
      store.addUsers(data);
      store.setAllUsersLS(data);
      return store.getAllUsers;
    })
    .then((data) => {
      users = data;
      return users;
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
}
