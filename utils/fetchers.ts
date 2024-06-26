import axios from 'axios';
import { backUrl } from '../config/config';

const fetcher = (url: string, token: string) => {
  const headers = token
    ? {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', // 요청의 Content-Type을 지정할 수 있음
      }
    : {};

  return axios
    .get(`${backUrl}${url}`, {
      headers,
    })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => console.error(error));
};

export default fetcher;
