'use client';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect } from 'react';
import useSWR from 'swr';
import styled from 'styled-components';

// import components
import Layout from '@/components/Layout';
import PsychologicalTestResult from '@/components/PsychologicalTestResult';
import Button from '@/components/Button';

// import hooks
import { getCookieValue } from '@/utils/getCookieValue';

const Content = styled.div`
  padding: 0px 20px 0 20px;
  flex: 1;
  margin-bottom: 12.5%;

  .test-result-wrapper {
    margin-top: 26.7%;
  }

  .test-description {
    width: 100%;
    padding: 16px 20px;
    border-radius: 12px;
    background: var(--gray01, #f7f7f7);
    color: var(--gray06, #898989);
    font-family: Pretendard;
    font-size: clamp(15px, 4vw, 18px);
    font-weight: 500;
    line-height: 140%;
    letter-spacing: -0.36px;
    margin-top: 24%;
    margin-bottom: 11.3%;
  }
`;

interface Props {
  token: string;
}

const PsychologicalResult = ({ token }: Props) => {
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token]);

  const moveToChat = useCallback(() => {
    router.push('/counsel/chat-intro');
  }, []);

  return (
    <Layout>
      <Content>
        <div className='test-result-wrapper'>
          <PsychologicalTestResult token={token} />
        </div>
        <div className='test-description'>
          심리검사 결과는
          <br />
          ‘마이페이지 &gt; 나의 첫 심리검사 결과 조회하기’ 에서
          <br />
          다시 보실 수 있어요.
        </div>
        <Button text={'상담하여 해결하기'} type={true} onClick={moveToChat} />
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

export default PsychologicalResult;
