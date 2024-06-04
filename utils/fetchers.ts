import axios from 'axios';
import { backUrl } from '../config/config';

const fetcher = (url: string) =>
  axios
    .get(`${backUrl}${url}`, {
      withCredentials: true,
    })
    .then((response) => response.data);

export default fetcher;
