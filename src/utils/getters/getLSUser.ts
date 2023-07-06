import type { User } from '@/interface/UserInterface';
import { emptyUser } from '@/interface/emptyUser';

export function getLSUser(newUser: User): User {
  const user = localStorage.getItem('user');
  if (user !== null && user !== undefined) {
    newUser = JSON.parse(user);
  } else {
    newUser = emptyUser;
  }
  return newUser;
}
