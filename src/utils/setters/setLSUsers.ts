import type { User } from '@/interface/UserInterface';

export function setLSUsers(key: string, users: User[]) {
  localStorage.setItem(key, JSON.stringify(users));
  const storedUsers = localStorage.getItem(key);

  if (
    storedUsers !== null &&
    storedUsers !== undefined &&
    storedUsers !== ''
  ) {
    return JSON.parse(storedUsers);
  } else {
    return [];
  }
}
