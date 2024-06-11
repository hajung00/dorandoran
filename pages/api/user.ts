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

// 인증번호 확인, 로그인 요청
export const loginAPI = async (
  phoneNumber: string,
  verificationCode: string
) => {
  const params = {
    phoneNumber: phoneNumber,
    verificationCode: verificationCode,
  };

  const result = await axios
    .post(`${backUrl}/api/user/verify-code`, params)
    .then((response: any) => {
      if (response.status == 200) {
        const token = response.headers.get('Authorization')
          ? response.headers.get('Authorization')
          : null;
        if (token) {
          Cookies.set('token', token, { expires: 14 }); // 만료 날짜를 30일로 설정
        }
        return { status: response.status, token: token };
      }
    })
    .catch((error: any) => {
      // 에러 처리
      if (error.response.status === 400) {
        return error.response.status;
      }
      console.error('회원가입/로그인 요청 API 실패', error);
    });
  console.log('회원가입/로그인 요청', result);
  return result;
};

// 회원가입
export const joinAPI = async (
  name: string,
  phoneNumber: string,
  userAgency: string
) => {
  const params = {
    name: name,
    phoneNumber: phoneNumber,
    userAgency: userAgency,
  };

  const result = await axios
    .post(`${backUrl}/api/user/join`, params)
    .then((response: any) => {
      if (response.status == 200) {
        const token = response.headers.get('Authorization')
          ? response.headers.get('Authorization')
          : null;
        if (token) {
          Cookies.set('token', token, { expires: 14 }); // 만료 날짜를 30일로 설정
        }
        return response.status;
      }
    })
    .catch((error: any) => {
      // 에러 처리
      if (error.response.status === 400) {
        return error.response.status;
      }
      console.error('회원가입 API 실패', error);
    });
  console.log('회원가입', result);
  return result;
};

// 회원 탈퇴
export const dropOutAPI = async (token: string) => {
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json', // 요청의 Content-Type을 지정할 수 있음
  };

  const result = await axios
    .post(`${backUrl}/api/mypage/sign-out`, '', { headers })
    .then((response: any) => {
      if (response.status == 200) {
        Cookies.remove('token');
        return response.status;
      }
    })
    .catch((error: any) => {
      // 에러 처리
      if (error.response.status === 400) {
        return error.response.status;
      }
      console.error('회원 탈퇴 API 실패', error);
    });
  console.log('회원 탈퇴', result);
  return result;
};

// 로그아웃
export const logoutAPI = async (token: string) => {
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json', // 요청의 Content-Type을 지정할 수 있음
  };

  const result = await axios
    .post(`${backUrl}/api/mypage/logout`, '', { headers })
    .then((response: any) => {
      if (response.status == 200) {
        Cookies.remove('token');
        return response.status;
      }
    })
    .catch((error: any) => {
      // 에러 처리
      if (error.response.status === 400) {
        return error.response.status;
      }
      console.error('로그아웃 API 실패', error);
    });
  console.log('로그아웃', result);
  return result;
};
