import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import Layout from '@/components/Layout';

// import svg
import ArrowSVG from '../../../public/icons/arrow.svg';
import FileSVG from '../../../public/icons/file.svg';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import fetcher from '@/utils/fetchers';
import { getCookieValue } from '@/utils/getCookieValue';
import IntendSection from '@/components/IntendSection';
import Description from '@/components/Description';
import Header from '@/components/Header';

const Point = styled.span<{ color: string }>`
  color: ${(props: any) =>
    props.color === '안정적'
      ? '#565BFF'
      : props.color === '불안정'
      ? '#BA9100'
      : '#F25151'};
`;

const Content = styled.div`
  padding: 0 20px 0 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-bottom: 12.5%;

  .content-header {
    .title {
      color: #222;
      font: var(--Pretendard--26-600);
    }
  }

  .test-result-title {
    color: var(--gray09, #222);
    font-family: 'Pretendard';
    font-size: clamp(21px, 5vw, 26px);
    font-weight: 600;
    line-height: 140%; /* 36.4px */

    &::before {
      content: '';
      display: block;
      width: 100vw;
      max-width: 512px;
      height: 22px;
      background: #f7f7f7;
      transform: translateX(-20px);
      margin-top: 62px;
      margin-bottom: 54px;
    }
  }

  .test-date {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 6px;
    padding: 26px 0;
    margin-top: 53px;
    border-bottom: 1px solid #e3e3e3;
    color: var(--gray08, #444);
    font-family: 'Pretendard';
    font-size: clamp(18px, 4vw, 20px);
    font-style: normal;
    font-weight: 600;
    line-height: 140%;
    letter-spacing: -0.4px;
  }

  .test-item-section {
    margin-top: 33px;
    display: flex;
    flex-direction: column;
    gap: 47px;
  }

  .test-description {
    display: flex;
    width: 100%;
    padding: 16px 20px;
    /* justify-content: center; */
    align-items: center;
    gap: 4px;
    border-radius: 12px;
    background: var(--gray01, #f7f7f7);
    color: var(--gray06, #898989);
    font-family: Pretendard;
    font-size: clamp(15px, 4vw, 18px);
    font-style: normal;
    font-weight: 500;
    line-height: 140%;
    letter-spacing: -0.36px;
    margin-top: 120px;
  }

  & > button {
    width: 100%;
    border-radius: 18px;
    background: var(--doranblue, #565bff);
    display: flex;
    // height: 66px;
    padding: 4.5% 4px;
    justify-content: center;
    align-items: center;
    gap: 4px;
    border: none;
    color: var(--white, #fff);
    font-family: 'Pretendard';
    font-size: clamp(18px, 5vw, 20px);
    font-weight: 600;
    letter-spacing: -0.4px;
    margin-top: 53px;
    cursor: pointer;
  }
`;

const TestItem = styled.div<{ background: string; color: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .item-wrapper {
    width: calc(100% - 80px);

    .item-title {
      display: flex;
      align-items: center;
      gap: 10px;

      & > span {
        font-family: 'Pretendard';
        font-size: clamp(14px, 4vw, 18px);
        font-weight: 600;
        line-height: 140%; /* 25.2px */
        letter-spacing: -0.36px;
        color: ${(props: any) => props.color};
      }
    }

    .item-type {
      color: var(--gray09, #222);
      font-family: 'Pretendard';
      font-size: clamp(20px, 5vw, 24px);
      font-style: normal;
      font-weight: 600;
      line-height: 140%;
      letter-spacing: -0.48px;
    }

    .item-description {
      color: var(--gray08, #444);
      font-family: 'Pretendard';
      font-size: clamp(16px, 4vw, 20px);
      font-style: normal;
      font-weight: 500;
      line-height: 140%;

      & > span {
        font-weight: 600;
      }
    }
  }
  .item-score {
    width: 17%;
    aspect-ratio: 1 / 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${(props: any) => props.background};
    border-radius: 50%;
    color: ${(props: any) => props.color};
    font-family: 'Pretendard';
    font-size: clamp(16px, 4vw, 20px);
    font-weight: 600;
    line-height: 140%; /* 28px */
    letter-spacing: -0.4px;
  }
`;

interface Props {
  token: string;
}

const TestResult = ({ token }: Props) => {
  const router = useRouter();
  const { data: testCheck } = useSWR('/api/assessment/has-result', (url) =>
    fetcher(url, token)
  );
  const { data: testResult } = useSWR(
    '/api/mypage/first-assessment-result',
    (url) => fetcher(url, token)
  );

  const typeByScore = [
    { background: '#E1E2FF', color: '#565BFF', text: '안정' },
    { background: '#FFF3C8', color: '#BA9100', text: '불안정' },
    { background: '#FDD', color: '#F25151', text: '위험' },
  ];

  const sortScore = useCallback((score: number) => {
    if (score >= 80) {
      return typeByScore[0];
    } else if (score >= 40) {
      return typeByScore[1];
    } else {
      return typeByScore[2];
    }
  }, []);

  const toKorean = useCallback((category: string) => {
    if (category === 'DEPRESSION') return '우울함';
    else if (category === 'STRESS') return '스트레스';
    else if (category === 'ANXIETY') return '불안감';
  }, []);

  const [psychologicalState, setPsychologicelState] = useState('');
  const getPsychologicalState = () => {
    const standard = testResult?.result.map(
      (item: { [key: string]: any }) => item.standard
    );
    if (standard.includes('심각')) {
      setPsychologicelState('위험');
    } else if (standard.every((value: string) => value === '적음')) {
      setPsychologicelState('안정적');
    } else {
      setPsychologicelState('불안정');
    }
  };

  useEffect(() => {
    if (testResult) {
      getPsychologicalState();
    }
  }, [testResult]);

  return (
    <Layout>
      <Header type={'prev'} />
      <Content>
        {!testCheck ? (
          <>
            <div className='content-header'>
              <p className='title'>나의 첫 심리검사 결과</p>
            </div>
            <IntendSection
              text='아직 심리검사를 하지 않으셨네요.<br/>지금 바로 검사를 시작해보세요!'
              src='/image/nontest.png'
              type='psychologicaltest'
              svgWidth={60}
              svgHeight={60}
            />
          </>
        ) : (
          <>
            <Description
              desc={'나의 첫 심리검사 결과'}
              subDesc={`${testResult?.name}님의 첫 심리검사 결과는 아래와 같아요.<br />심리검사 내용은 안전하게 보관돼요.`}
            />
            <div className='test-result-title'>
              <p>심리검사 결과</p>
              <p>
                {testResult?.name}님의 심리상태는{' '}
                <Point color={psychologicalState}>{psychologicalState}</Point>
                {psychologicalState === '안정적' ? '이에요.' : '해요.'}
              </p>
            </div>
            <div className='test-date'>
              <FileSVG width={26} height={26} alt={'file'} />
              <span>{testResult?.testDate}의 심리검사 결과</span>
            </div>
            <div className='test-item-section'>
              {testResult?.result.map(
                (item: { [key: string]: any }, i: number) => {
                  const current = sortScore(item.score);
                  return (
                    <>
                      <TestItem
                        key={i}
                        background={current.background}
                        color={current.color}
                      >
                        <div className='item-wrapper'>
                          <div className='item-title'>
                            <div className='item-type'>
                              {toKorean(item.category)}
                            </div>
                            <span>{current.text}</span>
                          </div>
                          <div className='item-description'>
                            표준보다 <span>{item.percent}%</span>
                            {toKorean(item.category)}을 느끼고 있어요.
                          </div>
                        </div>
                        <div className='item-score'>{item.score}점</div>
                      </TestItem>
                    </>
                  );
                }
              )}
            </div>
          </>
        )}
      </Content>
    </Layout>
  );
};

export const getServerSideProps = async (context: any) => {
  // 로그인 여부 확인
  const cookie = context.req ? context.req.headers.cookie : '';

  let token = cookie ? getCookieValue(cookie, 'token') : null;

  return {
    props: {
      token,
    },
  };
};

export default TestResult;
