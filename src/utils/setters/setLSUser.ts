import type { User } from '@/interface/UserInterface';

export function setLSUser(user: User): User {
  localStorage.setItem('user', JSON.stringify(user));
  const storedUser = localStorage.getItem('user');
  if (
    storedUser !== null &&
    storedUser !== undefined &&
    storedUser !== ''
  ) {
    return JSON.parse(storedUser);
  }
  return user;
}
