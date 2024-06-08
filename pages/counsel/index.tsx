'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

// import components
import Footer from '../../components/Footer';
import Layout from '../../components/Layout';
import NonLogin from '@/components/NonLogin';
import NonTest from '@/components/NonTest';
import { getCookieValue } from '@/utils/getCookieValue';
import useSWR from 'swr';
import fetcher from '@/utils/fetchers';

const Header = styled.header`
  padding: 54px 20px 0 20px;
  color: #222;
  font-family: 'Pretendard';
  font-size: clamp(30px, 7vw, 34px);
  font-weight: 700;
`;

const Content = styled.div`
  height: calc(100vh - 94px - 74px);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
`;

const CounselStyle = styled.div`
  width: 100%;

  .counsel-start-section {
    width: 100%;
    margin-top: 30px;
    padding: 40px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 26px;
    background: var(--gray01, #f7f7f7);

    & > button {
      margin-top: 29px;
      display: flex;
      width: 260px;
      padding: 4.5% 4px;
      justify-content: center;
      align-items: center;
      gap: 4px;
      border: none;
      border-radius: 18px;
      background: #565bff;
      color: var(--white, #fff);
      font-family: 'Pretendard';
      font-size: clamp(16px, 5vw, 20px);
      font-style: normal;
      font-weight: 600;
      letter-spacing: -0.4px;
    }
  }

  .icon-wrapper {
    width: 80px;
    height: 80px;
    background: #eaeaea;
  }

  .description {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 18px;
    border-radius: 16px;
    color: var(--gray09, #222);
    text-align: center;
    font-family: 'Pretendard';
    font-size: clamp(18px, 5vw, 22px);
    font-weight: 600;
    line-height: 140%; /* 30.8px */
    letter-spacing: -0.44px;
  }

  .counsel-list-section {
    margin-top: 32px;
    margin-bottom: 200px;

    .title {
      color: var(--gray09, #222);
      font-family: 'Pretendard';
      font-size: clamp(20px, 5vw, 24px);
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }
  }

  .counsel-list-wrapper {
    display: flex;
    flex-direction: column;
    gap: 14px;
    margin-top: 20px;

    .counsel-list {
      padding: 20px;
      border-radius: 16px;
      background: var(--gray01, #f7f7f7);
      display: flex;
      flex-direction: column;
      gap: 14px;

      .counsel-title {
        color: #000;
        font-family: 'Pretendard';
        font-size: 18px;
        font-weight: 500;
        letter-spacing: -0.36px;
        text-transform: uppercase;
      }
      .counsel-date {
        color: #000;
        font-family: 'Pretendard';
        font-size: 16px;
        font-weight: 400;
        letter-spacing: -0.32px;
        text-transform: uppercase;
      }
    }
  }
`;

interface Props {
  token: string;
}

const Counsel = ({ token }: Props) => {
  const router = useRouter();
  const { data: testCheck } = useSWR('/api/assessment/has-result', fetcher);

  if (!token) {
    return router.push('/login');
  }

  const data = [
    { summary: '상담 내용 요약', date: '2024년 05월 20일' },
    { summary: '상담 내용 요약', date: '2024년 05월 25일' },
    { summary: '상담 내용 요약', date: '2024년 05월 25일' },
  ];

  return (
    <Layout>
      <Header>상담</Header>
      <Content>
        {!token ? (
          <NonLogin />
        ) : !testCheck ? (
          <NonTest />
        ) : (
          <CounselStyle>
            <div className='counsel-start-section'>
              <div className='description'>
                <div className='icon-wrapper'></div>
                <p>새로운 상담 시작하기</p>
              </div>
              <button
                onClick={() => {
                  router.push('/counsel/chat-intro');
                }}
              >
                상담 시작하기
              </button>
            </div>
            <div className='counsel-list-section'>
              <p className='title'>현재 진행중인 상담</p>
              <div className='counsel-list-wrapper'>
                {data.map((item, i) => (
                  <div
                    key={i}
                    className='counsel-list'
                    onClick={() => router.push('/history/1')}
                  >
                    <div className='counsel-title'>{item.summary}</div>
                    <div className='counsel-date'>{item.date}</div>
                  </div>
                ))}
              </div>
            </div>
          </CounselStyle>
        )}
      </Content>
      {token && <Footer />}
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

export default Counsel;
