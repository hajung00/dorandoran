import React from 'react';
import styled from 'styled-components';

// import svg
import ArrowSVG from '../../../public/icons/arrow.svg';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';

const Header = styled.header`
  padding: 60px 20px 0 20px;
  color: #222;

  .icon-wrapper {
    padding: 10.5px 8px;
  }
`;

const Content = styled.div`
  padding: 0 20px;
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

  & > button {
    margin-top: 65%;
    margin-bottom: 64px;
    padding: 4.5% 4px;
    border-radius: 18px;
    background: var(--doranblue, #565bff);
    width: 100%;
    border: none;
    color: var(--white, #fff);
    font-family: 'Pretendard';
    font-size: clamp(18px, 4vw, 20px);
    font-weight: 600;
    letter-spacing: -0.4px;
  }

  .counselor-intro-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 47px;
    padding-top: 154px;

    .counselor-intro {
      position: relative;
      display: inline-flex;
      padding: 16px;
      justify-content: center;
      align-items: center;
      gap: 4px;
      border-radius: 16px;
      background: var(--gray02, #eaeaea);
      color: var(--gray09, #222);
      text-align: center;
      font-family: Pretendard;
      font-size: 20px;
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

const ChatIntro = () => {
  const router = useRouter();
  return (
    <Layout>
      <Header>
        <div
          className='icon-wrapper'
          onClick={() => {
            router.push('/counsel');
          }}
        >
          <ArrowSVG width={21} height={21} alt={'prev'} />
        </div>
      </Header>
      <Content>
        <p className='description'>도란도란의 AI상담원과 상담을 시작할게요.</p>
        <p className='sub-description'>대화내용은 안전하게 보관돼요.</p>
        <div className='counselor-intro-wrapper'>
          <div className='counselor-intro'>
            안녕하세요!
            <br />
            도란도란의 상담원A입니다.
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='26'
              height='23'
              viewBox='0 0 26 23'
              fill='none'
            >
              <path
                d='M13 23L0.00962073 0.499998L25.9904 0.5L13 23Z'
                fill='#EAEAEA'
              />
            </svg>
          </div>

          <div className='icon'></div>
        </div>
        <button
          onClick={() => {
            router.push('/counsel/chat');
          }}
        >
          상담 시작하기
        </button>
      </Content>
    </Layout>
  );
};

export default ChatIntro;
