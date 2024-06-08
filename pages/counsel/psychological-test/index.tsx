'use client';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

// import svg
import XSVG from '../../../public/icons/x.svg';
import CheckSVG from '../../../public/icons/check.svg';
import Loading from '@/components/Loading';
import { useRouter } from 'next/router';
import { testAPI } from '@/pages/api/psychological-test';
import { getCookieValue } from '@/utils/getCookieValue';
import useTestResult from '@/hooks/useTestResult';

const Header = styled.header`
  padding: 60px 20px 0 20px;
  color: #222;

  .icon-wrapper {
    padding: 12px 8px;
  }
`;

const Point = styled.div`
  color: var(--doranblue, #565bff);
  margin-left: 8px;
`;

const ProgressBarSection = styled.div`
  padding: 0 20px;
  margin-top: 24px;

  .progress-info {
    justify-content: end;
    margin-top: 8px;
    display: flex;
    font-family: 'Pretendard';
    font-size: 15px;
    font-weight: 400;
  }
`;

const ProgressBar = styled.div`
  border-radius: 100px;
  background: var(--doranblue02, #e1e2ff);
  height: 10px;
  margin-top: 20px;
  overflow: hidden;
`;

const Progress = styled.div<{ width: number }>`
  width: ${(props: any) => props.width}%;
  height: 10px;
  padding: 0;
  text-align: center;
  border-radius: 100px;
  background: var(--doranblue, #565bff);
`;

const Content = styled.div`
  padding: 0 20px;

  .question-type {
    margin-top: 12px;
    color: var(--gray09, #222);
    font-family: 'Pretendard';
    font-size: clamp(24px, 6vw, 26px);
    font-weight: 600;
    line-height: 140%; /* 36.4px */
  }
  .description {
    margin-top: 8px;
    color: var(--gray07, #666);
    font-family: 'Pretendard';
    font-size: clamp(16px, 4vw, 20px);
    font-weight: 400;
    line-height: 140%; /* 28px */
  }
  .question-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 24px;

    .question-number {
      margin-top: 32px;
      display: flex;
      padding: 8px 12px;
      justify-content: center;
      align-items: center;
      border-radius: 100px;
      background: var(--doranblue02, #e1e2ff);
      color: var(--doranblue, #565bff);
      font-family: 'Pretendard';
      font-size: clamp(16px, 4vw, 18px);
      font-weight: 600;
      line-height: 140%; /* 25.2px */
      letter-spacing: -0.36px;
    }
    .question {
      padding: 63px 0;
      color: var(--gray09, #222);
      text-align: center;
      font-family: 'Pretendard';
      font-size: clamp(18px, 4vw, 20px);
      font-weight: 500;
      line-height: 150%; /* 30px */
      letter-spacing: -0.4px;
    }
    .question-description {
      margin-top: 28px;
      color: var(--gray07, #666);
      font-family: 'Pretendard';
      font-size: clamp(16px, 4vw, 18px);
      font-weight: 400;
      line-height: 140%; /* 25.2px */
    }
  }
  .answer-container {
    margin-top: 32px;

    & > ul {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    & > ul > li {
      display: flex;
      height: 60px;
      padding: 0 20px;

      align-items: center;
      gap: 16px;
      border-radius: 18px;
      background: var(--gray01, #f7f7f7);
      color: var(--gray09, #222);
      font-family: 'Pretendard';
      font-size: clamp(16px, 4vw, 18px);
      font-weight: 500;
      letter-spacing: -0.36px;

      & > div {
        width: 28px;
        height: 28px;
        border: 1px solid #e3e3e3;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .active {
      border: 1px solid var(--doranblue, #565bff);
      color: var(--doranblue, #565bff);

      & > div {
        border: 1px solid #e565BFF;
        background: #565bff;
      }
    }
  }
`;

const ButtonSection = styled.div`
  margin-top: 70px;
  margin-bottom: 64px;
  padding: 0 20px;

  & > button {
    width: 100%;
    height: 66px;
    border-radius: 18px;
    border: none;
    font-family: 'Pretendard';
    font-size: clamp(18px, 4vw, 20px);
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.4px;
  }

  .enable {
    background: var(--doranblue, #565bff);
    color: var(--white, #fff);
  }

  .disable {
    background: var(--gray03, #e3e3e3);
    color: #b2b2b2;
  }

  .prev-next-button-wrapper {
    gap: 12px;
    display: flex;

    & > button {
      width: 50%;
      height: 66px;
      border-radius: 18px;
      border: none;
      font-family: 'Pretendard';
      font-size: clamp(16px, 4vw, 20px);
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      letter-spacing: -0.4px;
    }
    .prev-button {
      border: 1px solid var(--doranblue, #565bff);
      background: var(--white, #fff);
      color: var(--doranblue, #565bff);
    }
  }
`;
interface Props {
  token: string;
  testItmes: { [key: string]: any }[];
}

const PsychologicalTest = ({ token, testItmes }: Props) => {
  const router = useRouter();

  const { initializeTestResult } = useTestResult();
  const [currentNumber, setCurrnetNumber] = useState(1); // 현재 심리검사 항목 번호
  const [currentAnswer, setCurrentAnswer] = useState<number>(-1); // 현재 심리검사 항목 답변
  const [allAnswer, setAllAnswer] = useState<{ [key: string]: any }[]>([]); // 검사 모든 항목에 대한 답변
  const [analysisTestLoading, setAnalysisTestLoading] = useState(false);

  // 답변 클릭 이벤트
  const onClickAnswer = useCallback(
    (type: string, id: number, questionId: number, answerId: number) => {
      setCurrentAnswer(answerId - 1);

      // 답변한 모든 항목 번호
      const completeId = allAnswer.map(
        (answer: { [key: string]: number }) => answer.id
      );

      // 이전에 답변한 항목이 아닌 경우, 선택한 답변 추가
      if (!completeId.includes(currentNumber)) {
        setAllAnswer((prev) => [
          ...prev,
          {
            type: type,
            id: id,
            questionId: questionId,
            answerId: answerId,
          },
        ]);
      } else {
        // 이전에 답변한 항목인 경우, 기존 답변 제거 후 새로운 답변 추가
        const newAllAnswer = allAnswer.filter(
          (answer: { [key: string]: number }) => answer.id !== currentNumber
        );
        setAllAnswer(() => [
          ...newAllAnswer,
          {
            type: type,
            id: id,
            questionId: questionId,
            answerId: answerId,
          },
        ]);
      }
    },
    [currentNumber, allAnswer]
  );

  // 기존에 답변한 항목인 경우 선택한 항목 표시
  useEffect(() => {
    for (let i = 0; i < allAnswer.length; i++) {
      if (allAnswer[i].id === currentNumber) {
        setCurrentAnswer(allAnswer[i].answerId - 1);
        break;
      } else {
        setCurrentAnswer(-1);
      }
    }
  }, [currentNumber, allAnswer]);

  // 다음 문항 넘어가기 클릭 이벤트
  const nextQuestionHandler = useCallback(() => {
    if (currentAnswer !== -1) {
      setCurrnetNumber((prev) => prev + 1);
    }
  }, [currentAnswer]);

  // 이전 항목으로 넘어가기 클릭 이벤트
  const prevQuestionHandler = useCallback(() => {
    setCurrnetNumber((prev) => prev - 1);
  }, []);

  // 심리 결과 분석하기 클릭 이벤트
  const analysisTestHandler = useCallback(async () => {
    setAnalysisTestLoading((prev) => !prev);

    const basicAnswer = allAnswer
      .filter((item) => item.type === '기본질문')
      .sort((a, b) => a.id - b.id);
    const depression = allAnswer
      .filter((item) => item.type === '우울척도 검사')
      .sort((a, b) => a.id - b.id);
    const stress = allAnswer
      .filter((item) => item.type === '스트레스척도 검사')
      .sort((a, b) => a.id - b.id);
    const anxiety = allAnswer
      .filter((item) => item.type === '불안척도 검사')
      .sort((a, b) => a.id - b.id);

    const result = await testAPI(
      token,
      basicAnswer,
      depression,
      stress,
      anxiety
    );

    if (result) {
      setAnalysisTestLoading(false);
      initializeTestResult(result);
      router.push('/counsel/psychological-test-result');
    }
  }, [allAnswer]);

  return (
    <div>
      {currentNumber < 19 && (
        <>
          <Header>
            <div
              className='icon-wrapper'
              onClick={() => router.push('/counsel')}
            >
              <XSVG width={18} height={18} alt={'closed'} />
            </div>
          </Header>
          <ProgressBarSection>
            <ProgressBar>
              <Progress width={5.55 * currentNumber} />
            </ProgressBar>
            <div className='progress-info'>
              총 <Point>18</Point>개 문항 중 <Point>{currentNumber}</Point>개
              진행중
            </div>
          </ProgressBarSection>
          <Content>
            <div className='question-type'>
              {currentNumber < 19 && testItmes[currentNumber - 1].type}
            </div>
            <p className='description'>
              지난 2주동안 느꼈던 감정으로 선택해주세요.
            </p>
            <div className='question-container'>
              <div className='question-number'>문항 {currentNumber}</div>
              <div className='question'>
                {currentNumber < 19 && testItmes[currentNumber - 1].question}
              </div>
              <p className='question-description'>
                아래 답변중 하나를 선택해주세요.
              </p>
            </div>
            <div className='answer-container'>
              <ul>
                {currentNumber < 19 &&
                  testItmes[currentNumber - 1].answer.map(
                    (item: string, idx: number) => (
                      <li
                        key={idx}
                        className={currentAnswer === idx ? 'active' : ''}
                        onClick={() => {
                          onClickAnswer(
                            testItmes[currentNumber - 1].type,
                            testItmes[currentNumber - 1].id,
                            testItmes[currentNumber - 1].number,
                            idx + 1
                          );
                        }}
                      >
                        <div>
                          <CheckSVG
                            width={19}
                            height={19}
                            alt={'check'}
                            color={'#e3e3e3'}
                          />
                        </div>
                        {item}
                      </li>
                    )
                  )}
              </ul>
            </div>
          </Content>
          <ButtonSection>
            {currentNumber === 1 ? (
              <button
                className={currentAnswer !== -1 ? 'enable' : 'disable'}
                onClick={nextQuestionHandler}
              >
                다음 문항으로 넘어가기
              </button>
            ) : (
              <div className='prev-next-button-wrapper'>
                <button className='prev-button' onClick={prevQuestionHandler}>
                  이전 문항으로 돌아가기
                </button>
                {currentNumber !== 18 ? (
                  <button
                    className={currentAnswer !== -1 ? 'enable' : 'disable'}
                    onClick={nextQuestionHandler}
                  >
                    다음 문항으로 넘어가기
                  </button>
                ) : (
                  <button
                    className={currentAnswer !== -1 ? 'enable' : 'disable'}
                    onClick={analysisTestHandler}
                  >
                    심리 결과 분석하기
                  </button>
                )}
              </div>
            )}
          </ButtonSection>
        </>
      )}

      {analysisTestLoading && (
        <Loading text={`상담 결과를 분석중이에요. 잠시만 기다려주세요!`} />
      )}
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  // 로그인 여부 확인
  const cookie = context.req ? context.req.headers.cookie : '';

  let token = cookie ? getCookieValue(cookie, 'token') : null;

  const testItmes = (await import('../../../public/test_items/test_item.json'))
    .default;

  return {
    props: {
      token,
      testItmes,
    },
  };
};

export default PsychologicalTest;
