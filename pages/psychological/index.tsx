'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Lottie from 'lottie-react';
import styled from 'styled-components';

// import animation
import PsychometryAnimation from '../../public/animation/psychometry.json';

// import components
import Layout from '@/components/Layout';
import Button from '@/components/Button';
import Header from '@/components/Header';
import Description from '@/components/Description';

// import hooks
import { getCookieValue } from '@/utils/getCookieValue';
import fetcher from '@/utils/fetchers';

const Content = styled.div`
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-bottom: 12.5%;

  .animation-section {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

interface Props {
  token: string;
  testCheck: { [key: string]: boolean };
}

const PsychologicalTestIntro = ({ token, testCheck }: Props) => {
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token]);

  useEffect(() => {
    if (testCheck) {
      router.push('/counsel');
    }
  }, [testCheck]);

  return (
    <Layout>
      <Header type={'close'} link={'/counsel'} />
      <Content>
        <Description
          desc={'심리검사를 통해<br />현재 마음상태를 확인해볼게요.'}
          subDesc={'나의 마음을 그대로 떠올리며 검사를 진행해주세요.'}
        />
        <div className='animation-section'>
          <Lottie style={{ width: 300 }} animationData={PsychometryAnimation} />
        </div>
        <Button
          text='심리검사 시작하기'
          type={true}
          onClick={() => {
            router.push('/psychological/test');
          }}
        />
      </Content>
    </Layout>
  );
};

export const getServerSideProps = async (context: any) => {
  // 로그인 여부 확인
  const cookie = context.req ? context.req.headers.cookie : '';

  let token = cookie ? getCookieValue(cookie, 'token') : null;
  const testCheck = token
    ? await fetcher('/api/assessment/has-result', token)
    : null;

  return {
    props: {
      token,
      testCheck,
    },
  };
};

export default PsychologicalTestIntro;
