import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

// import components
import Layout from '@/components/Layout';
import Header from '@/components/Header';
import IntendSection from '@/components/IntendSection';
import Description from '@/components/Description';
import PsychologicalTestResult from '@/components/PsychologicalTestResult';

// import hooks
import fetcher from '@/utils/fetchers';
import { getCookieValue } from '@/utils/getCookieValue';

const Content = styled.div`
  padding: 0 20px 0 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-bottom: 12.5%;

  .test-result-section {
    flex: 1;
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
`;

interface Props {
  token: string;
  userData: { [key: string]: any };
}

const TestResult = ({ token, userData }: Props) => {
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token]);

  return (
    <Layout>
      <Header type={'prev'} />
      <Content>
        <Description
          desc={'나의 첫 심리검사 결과'}
          subDesc={
            userData
              ? `${userData?.name}님의 첫 심리검사 결과는 아래와 같아요.<br />심리검사 내용은 안전하게 보관돼요.`
              : ''
          }
        />
        {!userData?.hasPsychologicalAssessment ? (
          <IntendSection
            text='아직 심리검사를 하지 않으셨네요.<br/>지금 바로 검사를 시작해보세요!'
            src='/image/nontest.png'
            type='psychologicaltest'
            svgWidth={60}
            svgHeight={60}
          />
        ) : (
          <div className='test-result-section'>
            <PsychologicalTestResult token={token} />
          </div>
        )}
      </Content>
    </Layout>
  );
};

export const getServerSideProps = async (context: any) => {
  // 로그인 여부 확인
  const cookie = context.req ? context.req.headers.cookie : '';

  let token = cookie ? getCookieValue(cookie, 'token') : null;
  const userData = token ? await fetcher('/api/mypage/main', token) : null;

  return {
    props: {
      token,
      userData,
    },
  };
};

export default TestResult;
