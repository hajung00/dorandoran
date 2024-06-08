import axios from 'axios';
import { backUrl } from '../../config/config';
import Cookies from 'js-cookie';

// SMS 인증번호 요청
export const requestSMSAPI = async (name: string, phoneNumber: string) => {
  const params = {
    name: name,
    phoneNumber: phoneNumber,
  };

  const result = await axios
    .post(`${backUrl}/api/user/send-sms`, params)
    .then((response: any) => {
      if (response.status == 200) {
        return response.status;
      }
    })
    .catch((error: any) => {
      // 에러 처리
      if (error.response.status === 400) {
        return error.response.status;
      }
      console.error('SMS 인증번호 요청 API 실패', error);
    });
  console.log('SMS 인증번호 요청', result);
  return result;
};

// 회원가입, 로그인 요청
export const loginAPI = async (
  name: string,
  phoneNumber: string,
  verificationCode: string
) => {
  const params = {
    name: name,
    phoneNumber: phoneNumber,
    verificationCode: verificationCode,
    userAgency: 'VISION_TRAINING_CENTER',
  };

  const result = await axios
    .post(`${backUrl}/api/user/login`, params)
    .then((response: any) => {
      if (response.status == 200) {
        const token = response.headers.get('Authorization');
        if (token) {
          Cookies.set('token', token, { expires: 14 }); // 만료 날짜를 30일로 설정
        }
        return response.status;
      }
    })
    .catch((error: any) => {
      // 에러 처리
      if (error.response.status === 400) {
        return error.response.data.message;
      }
      console.error('회원가입/로그인 요청 API 실패', error);
    });
  console.log('회원가입/로그인 요청', result);
  return result;
};
