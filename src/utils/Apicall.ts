import axios from 'axios';

export function callRandomUSers(): Promise<Array<Object>> {
  return axios
    .get('https://randomuser.me/api/?results=2')
    .then((response) => {
      return response.data.results;
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
}
