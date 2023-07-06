import type { User } from '@/interface/UserInterface';

export function getLSFilteredUsers(): Array<User> {
  let storedFilteredUsers: string | null =
    localStorage.getItem('filteredUsers');

  if (
    storedFilteredUsers !== null &&
    storedFilteredUsers !== undefined &&
    storedFilteredUsers !== ''
  ) {
    return JSON.parse(storedFilteredUsers);
  } else {
    return [];
  }
}
