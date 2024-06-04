import axios from 'axios';
import { backUrl } from '../../config/config';

// SMS 인증번호 요청
export const requestSMSAPI = async (name: string, phoneNumber: string) => {
  const params = {
    name: name,
    phoneNumber: phoneNumber,
  };

  const result = await axios
    .post(`${backUrl}/api/user/send-sms`, params)
    .then((response: any) => {
      console.log(response);
      if (response.status == '200') {
        return response.status;
      } else if (response.status == '400') {
        return response.status;
      }
    })
    .catch((error: any) => {
      // 에러 처리
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
  };

  const result = await axios
    .post(`${backUrl}/api/user/login`, params)
    .then((response: any) => {
      console.log(response);
      if (response.status == '200') {
        return response.status;
      } else if (response.status == '400') {
        return response.data.message;
      }
    })
    .catch((error: any) => {
      // 에러 처리
      console.error('회원가입/로그인 요청 API 실패', error);
    });
  console.log('회원가입/로그인 요청', result);
  return result;
};
