import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

// import svg
import ArrowSVG from '../../../public/icons/arrow.svg';
import BarGraph from '@/components/BarGraph';
import useSWR from 'swr';
import fetcher from '@/utils/fetchers';
import MypageNonTest from '@/components/MyPageNonTest';

const Header = styled.header`
  padding: 60px 20px 0 20px;
  color: #222;

  .icon-wrapper {
    padding: 10.5px 8px;
  }
`;

const Content = styled.div`
  padding: 22px 20px 64px 20px;
  display: flex;
  flex-direction: column;
  flex: 1;

  .content-header {
    .title {
      margin-bottom: 8px;
      color: var(--gray09, #222);
      font-family: 'Pretendard';
      font-size: 26px;
      font-style: normal;
      font-weight: 600;
      line-height: 140%; /* 36.4px */
    }
  }
  .description {
    color: var(--gray07, #666);
    font-family: 'Pretendard';
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 25.2px */
    margin-bottom: 40px;
  }
`;

const CompleteSection = styled.div`
  margin-top: 87px;

  .title {
    margin-bottom: 18px;
    color: var(--gray07, #666);
    font-family: 'Pretendard';
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.36px;
    text-transform: uppercase;
  }

  .consel-wrapper {
    padding: 20px;
    border-radius: 16px;
    background: var(--gray01, #f7f7f7);
    display: flex;
    flex-direction: column;
    gap: 18px;

    .consel-title {
      color: var(--gray09, #222);
      font-family: 'Pretendard';
      font-size: 18px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      letter-spacing: -0.36px;
      text-transform: uppercase;
    }

    .consel-date {
      color: var(--gray09, #222);
      font-family: Pretendard;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: -0.32px;
      text-transform: uppercase;
    }
  }
`;
const TestChange = () => {
  const router = useRouter();
  const { data: testCheck } = useSWR('/api/assessment/has-result', fetcher);

  const [clickDate, setClickDate] = useState('');
  const handleClickDate = useCallback((date: string) => {
    setClickDate(date);
  }, []);

  useEffect(() => {
    // 선택한 날짜 바뀔 때마다 상담 정보 가져오기
  }, [clickDate]);

  return (
    <Layout>
      <Header>
        <div
          className='icon-wrapper'
          onClick={() => {
            router.push('/mypage');
          }}
        >
          <ArrowSVG width={21} height={21} alt={'prev'} />
        </div>
      </Header>
      <Content>
        <div className='content-header'>
          <p className='title'>나의 심리변화 추이</p>
        </div>
        {testCheck ? (
          <MypageNonTest />
        ) : (
          <>
            <p className='description'>
              상담 종료 후 도란도란에서 분석한
              <br />
              조성혁님의 심리변화 추이에요.
            </p>
            <BarGraph clickDate={clickDate} handleClickDate={handleClickDate} />
            <CompleteSection>
              <p className='title'>완료한 상담</p>
              {clickDate && (
                <div
                  className='consel-wrapper'
                  onClick={() => {
                    router.push('/history/1');
                  }}
                >
                  <p className='consel-title'>상담명</p>
                  <p className='consel-date'>{clickDate}</p>
                </div>
              )}
            </CompleteSection>
          </>
        )}
      </Content>
    </Layout>
  );
};

export default TestChange;
