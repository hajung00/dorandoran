import React, { useCallback, useEffect, useState } from 'react';
import useSWR from 'swr';
import styled from 'styled-components';

// import svg
import FileSVG from '../..//public/icons/file.svg';

// import hooks
import fetcher from '@/utils/fetchers';

const ResultDescription = styled.section<{ color: string }>`
  color: var(--gray09, #222);
  font: var(--Pretendard--26-600);

  .point {
    color: ${(props: any) =>
      props.color === '안정적'
        ? '#565BFF'
        : props.color === '불안정'
        ? '#BA9100'
        : '#F25151'};
  }
`;

const TestDate = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 6px;
  padding: 26px 0;
  margin-top: 50px;
  border-bottom: 1px solid #e3e3e3;
  color: var(--gray08, #444);
  font: var(--Pretendard--20-600);
`;

const TestItemSection = styled.section`
  margin-top: 26px;
  display: flex;
  flex-direction: column;
  gap: 40px;
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
      font-weight: 600;
      line-height: 140%;
    }

    .item-description {
      color: var(--gray08, #444);
      font-family: 'Pretendard';
      font-size: clamp(16px, 4vw, 20px);
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
    font: var(--Pretendard--20-600);
  }
`;

interface Props {
  token: string;
}

// 심리 상태에 따른 스타일
const typeByScore = [
  { background: '#E1E2FF', color: '#565BFF', text: '안정' },
  { background: '#FFF3C8', color: '#BA9100', text: '불안정' },
  { background: '#FDD', color: '#F25151', text: '위험' },
];

const PsychologicalTestResult = ({ token }: Props) => {
  const { data: testResult } = useSWR(
    '/api/mypage/first-assessment-result',
    (url) => fetcher(url, token)
  );

  // 심리 점수에 따른 상태 분류
  const sortScore = useCallback((score: number) => {
    if (score >= 80) {
      return typeByScore[0];
    } else if (score >= 40) {
      return typeByScore[1];
    } else {
      return typeByScore[2];
    }
  }, []);

  // 심리항목 영어 -> 한글
  const toKorean = useCallback((category: string) => {
    if (category === 'DEPRESSION') return '우울함';
    else if (category === 'STRESS') return '스트레스';
    else if (category === 'ANXIETY') return '불안감';
  }, []);

  const [psychologicalState, setPsychologicelState] = useState(''); // 전체적인 심리상태
  // 각 항목의 상태에 따른 전체적인 심리상태
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
    <div>
      <ResultDescription color={psychologicalState}>
        <p>
          심리검사 결과
          <br />
          {testResult?.name}님의 심리상태는{' '}
          <span className='point'>{psychologicalState}</span>
          {psychologicalState === '안정적' ? '이에요.' : '해요.'}
        </p>
      </ResultDescription>
      <TestDate>
        <FileSVG width={26} height={26} alt={'file'} />
        <span>{testResult?.testDate}의 심리검사 결과</span>
      </TestDate>
      <TestItemSection>
        {testResult?.result.map((item: { [key: string]: any }, i: number) => {
          const current = sortScore(item.score);
          return (
            <TestItem
              key={i}
              background={current.background}
              color={current.color}
            >
              <div className='item-wrapper'>
                <div className='item-title'>
                  <div className='item-type'>{toKorean(item.category)}</div>
                  <span>{current.text}</span>
                </div>
                <div className='item-description'>
                  표준보다 <span>{item.percent}% </span>
                  {toKorean(item.category)}을 느끼고 있어요.
                </div>
              </div>
              <div className='item-score'>{item.score}점</div>
            </TestItem>
          );
        })}
      </TestItemSection>
    </div>
  );
};

export default PsychologicalTestResult;
