'use client';
import React from 'react';
import styled from 'styled-components';
import Lottie from 'lottie-react';
import { useRouter } from 'next/router';

// import svg
import XSVG from '../../../public/icons/x.svg';
import PsychometryAnimation from '../../../public/animation/psychometry.json';

// import components
import Layout from '@/components/Layout';

const Header = styled.header`
  padding: 60px 20px 0 20px;
  color: #222;

  .icon-wrapper {
    padding: 12px 8px;
    cursor: pointer;
  }
`;

const Content = styled.div`
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1;

  .description {
    margin-top: 4.7%;
    color: var(--gray09, #222);
    font-family: 'Pretendard';
    font-size: clamp(22px, 5vw, 26px);
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 33px */
    letter-spacing: -0.44px;
  }

  .sub-description {
    margin-top: 8px;
    color: var(--gray07, #666);
    font-family: 'Pretendard';
    font-size: clamp(18px, 4vw, 20px);
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 28px */
  }

  .animation-section {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .animation-wrapper {
    width: 78%;
    aspect-ratio: 1 / 1;
    background: var(--gray02, #eaeaea);
  }

  .button-section {
    height: 130px;

    & > button {
      position: absolute;
      bottom: 64px;
      width: calc(100% - 40px);
      padding: 4.5% 4px;
      gap: 4px;
      border-radius: 18px;
      background: var(--doranblue, #565bff);
      color: var(--white, #fff);
      font-family: 'Pretendard';
      font-size: clamp(18px, 2vw, 22px);
      font-weight: 600;
      letter-spacing: -0.4px;
      border: none;
      cursor: pointer;
    }
  }
`;

const PsychologicalTestIntro = () => {
  const router = useRouter();

  return (
    <Layout>
      <Header>
        <div className='icon-wrapper' onClick={() => router.push('/counsel')}>
          <XSVG width={18} height={18} alt={'closed'} />
        </div>
      </Header>
      <Content>
        <p className='description'>
          심리검사를 통해
          <br />
          현재 마음상태를 확인해볼게요.
          <p className='sub-description'>
            나의 마음을 그대로 떠올리며 검사를 진행해주세요.
          </p>
        </p>
        <div className='animation-section'>
          <Lottie style={{ width: 300 }} animationData={PsychometryAnimation} />
        </div>
        <div className='button-section'>
          <button
            onClick={() => {
              router.push('/counsel/psychological-test');
            }}
          >
            심리검사 시작하기
          </button>
        </div>
      </Content>
    </Layout>
  );
};

export default PsychologicalTestIntro;
