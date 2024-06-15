import axios from 'axios';
import { backUrl } from '../config/config';
import Cookies from 'js-cookie';

// let token = Cookies.get('token');
let token =
  'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMyIsInJvbGUiOiJST0xFX1VTRVIiLCJpYXQiOjE3MTgyNjUwNDIsImV4cCI6MTcxOTQ3NDY0Mn0.fwmTq0K5AOQoS7ceDbCI-2hoqKPbHDTxe1jDI3kx9PqJP0DYLPdaqyKhGS4wrfiXkXey2PTFdDPUx6-DZXv50w';

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
    .then((response) => response.data.data)
    .catch((error) => console.error(error));

export default fetcher;
