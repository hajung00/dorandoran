import axios from 'axios';
import { backUrl } from '../../config/config';

// 심리검사 결과 분석
export const testAPI = async (
  token: string,
  basicAnswer: { [key: string]: any }[],
  depression: { [key: string]: any }[],
  stress: { [key: string]: any }[],
  anxiety: { [key: string]: any }[]
) => {
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json', // 요청의 Content-Type을 지정할 수 있음
  };

  const params = [
    {
      category: 'BASIC',
      questionAnswers: basicAnswer.map((answer) => {
        delete answer.type;
        delete answer.id;
        return answer;
      }),
    },
    {
      category: 'DEPRESSION',
      questionAnswers: depression.map((answer) => {
        delete answer.type;
        delete answer.id;
        return answer;
      }),
    },
    {
      category: 'STRESS',
      questionAnswers: stress.map((answer) => {
        delete answer.type;
        delete answer.id;
        return answer;
      }),
    },
    {
      category: 'ANXIETY',
      questionAnswers: anxiety.map((answer) => {
        delete answer.type;
        delete answer.id;
        return answer;
      }),
    },
  ];

  const result = await axios
    .post(`${backUrl}/api/assessment/analysis`, params, { headers })
    .then((response: any) => {
      if (response.status == 200) {
        return response.data.data;
      }
    })
    .catch((error: any) => {
      // 에러 처리
      console.error('심리검사 결과 분석 API 실패', error);
    });
  console.log('심리검사 결과 분석', result);
  return result;
};
