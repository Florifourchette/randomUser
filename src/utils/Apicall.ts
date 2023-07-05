import axios from 'axios';
import type { User } from '@/interface/UserInterface';

export function callRandomUSers(): Promise<Array<User>> {
  return axios
    .get(
      'https://randomuser.me/api/?results=25&inc=name,email,picture,location,id,phone,gender'
    )
    .then((response) => {
      return response.data.results;
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
}
