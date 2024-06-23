import React, { useCallback } from 'react';
import styled from 'styled-components';

// import svg
import XSVG from '../../../public/icons/x.svg';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import Lottie from 'lottie-react';

// import animation
import CounselIntroAnimation from '../../../public/animation/counsel-intro.json';
import { startCounselAPI } from '@/pages/api/counsel';
import { getCookieValue } from '@/utils/getCookieValue';

const Header = styled.header`
  padding: 60px 20px 0 20px;
  color: #222;

  .icon-wrapper {
    padding: 10.5px 8px;
    cursor: pointer;
  }
`;

const Content = styled.div`
  padding: 0 20px;
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;

  .description {
    margin-top: 22px;
    color: #222;
    font-family: 'Pretendard';
    font-size: clamp(22px, 5.5vw, 26px);
    font-weight: 600;
  }

  .sub-description {
    margin-top: 12px;
    color: #666;
    font-family: 'Pretendard';
    font-size: clamp(18px, 4vw, 20px);
    font-weight: 400;
  }
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
    // padding-top: 32.7%;

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

      & > svg {
        position: absolute;
        bottom: -21px;
      }
    }

    .icon {
      width: 150px;
      height: 150px;
      background: var(--gray01, #f7f7f7);
    }
  }
`;
const ButtonSection = styled.div`
  height: 130px;

  & > button {
    position: absolute;
    bottom: 64px;
    padding: 4.12% 4px;
    border-radius: 18px;
    background: var(--doranblue, #565bff);
    width: calc(100% - 40px);
    border: none;
    color: var(--white, #fff);
    font-family: 'Pretendard';
    font-size: clamp(18px, 4vw, 20px);
    font-weight: 600;
    letter-spacing: -0.4px;
    cursor: pointer;
  }
`;
interface Props {
  token: string;
}

const ChatIntro = ({ token }: Props) => {
  const router = useRouter();

  const startCounselHandler = useCallback(async () => {
    const result = await startCounselAPI(token);
    if (result) {
      router.push(`/counsel/chat/${result.counselId}`);
    }
  }, [token]);

  return (
    <Layout>
      <Header>
        <div
          className='icon-wrapper'
          onClick={() => {
            router.push('/counsel');
          }}
        >
          <XSVG width={18} height={18} alt={'close'} />
        </div>
      </Header>
      <Content>
        <p className='description'>상담을 시작할게요.</p>
        <p className='sub-description'>
          모든 대화내용은 안전하게 보관되니 걱정마세요!
        </p>
        <AniMationSection>
          <div className='counselor-intro-wrapper'>
            <div className='counselor-intro'>
              안녕하세요!
              <br />
              도란도란의 상담원입니다.
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='26'
                height='23'
                viewBox='0 0 26 23'
                fill='none'
              >
                <path
                  d='M13 23L0.00962073 0.499998L25.9904 0.5L13 23Z'
                  fill='#f7f7f7'
                />
              </svg>
            </div>
          </div>

          <Lottie
            style={{ width: 200 }}
            animationData={CounselIntroAnimation}
          />
        </AniMationSection>
        <ButtonSection>
          <button onClick={startCounselHandler}>상담 시작하기</button>
        </ButtonSection>
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
