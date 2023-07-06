import type { User } from '@/interface/UserInterface';

export function getLSUsers(): Array<User> {
  const storedUsers = localStorage.getItem('allUsers');
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
