import axios from 'axios';
import { backUrl } from '../../config/config';

// 심리검사 결과 분석
export const testAPI = async (answer: { [key: string]: any }) => {
  const params = [
    {
      category: 'BASIC',
      questionAnswers: answer.silce(0, 3),
    },
    {
      category: 'DEPRESSION',
      questionAnswers: answer.silce(3, 8),
    },
    {
      category: 'STRESS',
      questionAnswers: answer.silce(8, 13),
    },
    {
      category: 'ANXIETY',
      questionAnswers: answer.silce(13, 18),
    },
  ];

  console.log(params);

  //   const result = await axios
  //     .post(`${backUrl}/api/user/send-sms`, params)
  //     .then((response: any) => {
  //       if (response.status == 200) {
  //         return response.status;
  //       }
  //     })
  //     .catch((error: any) => {
  //       // 에러 처리
  //       if (error.response.status === 400) {
  //         return error.response.status;
  //       }
  //       console.error('SMS 인증번호 요청 API 실패', error);
  //     });
  //   console.log('SMS 인증번호 요청', result);
  //   return result;
};
