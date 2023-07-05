import type { User } from './UserInterface';

export const emptyUser: User = {
  email: '',
  gender: '',
  location: {
    street: {
      name: '',
      number: 0,
    },
    country: '',
    postcode: 0,
    state: '',
    city: '',
  },
  name: {
    last: 'deleted',
    first: 'deleted',
    title: '',
  },
  phone: '',
  picture: {
    large: '',
    medium: '',
    thumbnail: '',
  },
  id: {
    name: '',
    value: '',
  },
};
