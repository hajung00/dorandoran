import axios from 'axios';
import { backUrl } from '../config/config';
import Cookies from 'js-cookie';

let token = Cookies.get('token');

const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json', // 요청의 Content-Type을 지정할 수 있음
};

const fetcher = (url: string) =>
  token &&
  axios
    .get(`${backUrl}${url}`, {
      headers,
    })
    .then((response) => {
      console.log(response);
      return response.data.data;
    })
    .catch((error) => console.error(error));

export default fetcher;
