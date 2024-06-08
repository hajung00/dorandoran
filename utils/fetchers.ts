import axios from 'axios';
import { backUrl } from '../config/config';
import Cookies from 'js-cookie';

let token = Cookies.get('token');
console.log(token);

const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json', // 요청의 Content-Type을 지정할 수 있음
};

const fetcher = (url: string) =>
  axios
    .get(`${backUrl}${url}`, {
      headers,
    })
    .then((response) => response.data.data);

export default fetcher;
