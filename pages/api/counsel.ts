import axios from 'axios';
import { backUrl } from '../../config/config';

// 상담 시작 요청
export const startCounselAPI = async (token: string) => {
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const result = await axios
    .post(`${backUrl}/api/counsel/start`, '', { headers })
    .then((response: any) => {
      return response.data.data;
    })
    .catch((error: any) => {
      // 에러 처리
      console.error('상담 시작 요청 API 실패', error);
    });
  console.log('상담 시작 요청', result);
  //   return result;
  return {
    counselId: 3,
    message:
      '안녕하세요 김하정님! 어떤 내용이든 좋으니, 저에게 마음편히 이야기해주세요.',
  };
};

// 상담 채팅 요청
export const chatCounselAPI = async (
  token: string,
  counselId: number,
  message: string
) => {
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const params = {
    counselId: counselId,
    message: message,
  };

  const result = await axios
    .post(`${backUrl}/api/counsel/chat`, params, { headers })
    .then((response: any) => {
      return response.state;
    })
    .catch((error: any) => {
      // 에러 처리
      console.error('상담 채팅 요청 API 실패', error);
    });
  console.log('상담 채팅 요청', result);
  //   return result;
  return 200;
};

// 상담 종료 요청
export const endCounselAPI = async (token: string, counselId: string) => {
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const result = await axios
    .post(`${backUrl}/api/counsel/end/${parseInt(counselId)}`, '', { headers })
    .then((response: any) => {
      return response.state;
    })
    .catch((error: any) => {
      // 에러 처리
      console.error('상담 종료 요청 API 실패', error);
    });
  console.log('상담 종료 요청', result);
  //   return result;
  return 200;
};
