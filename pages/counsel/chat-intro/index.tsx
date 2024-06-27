import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import Lottie from 'lottie-react';
import styled from 'styled-components';

// import animation
import CounselIntroAnimation from '../../../public/animation/counsel-intro.json';

// import components
import Layout from '@/components/Layout';
import Header from '@/components/Header';
import Description from '@/components/Description';
import Button from '@/components/Button';

// import api
import { startCounselAPI } from '@/pages/api/counsel';

// import hooks
import { getCookieValue } from '@/utils/getCookieValue';

const Content = styled.div`
  padding: 0 20px;
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-bottom: 12.5%;
`;

const AniMationSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .counselor-intro-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 44px;

    .counselor-intro {
      position: relative;
      display: inline-flex;
      padding: 16px;
      justify-content: center;
      align-items: center;
      gap: 4px;
      border-radius: 16px;
      background: var(--gray02, #f7f7f7);
      color: var(--gray09, #222);
      text-align: center;
      font-family: 'Pretendard';
      font-size: clamp(18px, 4vw, 20px);
      font-style: normal;
      font-weight: 500;
      line-height: 140%;
      letter-spacing: -0.4px;
    }
  }
`;

interface Props {
  token: string;
}

const ChatIntro = ({ token }: Props) => {
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token]);

  const startCounselHandler = useCallback(async () => {
    const result = await startCounselAPI(token);
    if (result) {
      router.push(`/counsel/chat/${result.counselId}`);
    }
  }, [token]);

  return (
    <Layout>
      <Header type='close' link='/counsel' />
      <Content>
        <Description
          desc='상담을 시작할게요.'
          subDesc='모든 대화내용은 안전하게 보관되니 걱정마세요!'
        />
        <AniMationSection>
          <div className='counselor-intro-wrapper'>
            <div className='counselor-intro'>
              안녕하세요!
              <br />
              도란도란의 상담원입니다.
            </div>
          </div>
          <Lottie
            style={{ width: 200 }}
            animationData={CounselIntroAnimation}
          />
        </AniMationSection>
        <Button
          text='상담 시작하기'
          type={true}
          onClick={startCounselHandler}
        />
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

export default ChatIntro;
