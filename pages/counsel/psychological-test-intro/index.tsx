'use client';
import React from 'react';
import styled from 'styled-components';

// import svg
import XSVG from '../../../public/icons/x.svg';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';

const Header = styled.header`
  padding: 60px 20px 0 20px;
  color: #222;

  .icon-wrapper {
    padding: 12px 8px;
  }
`;

const Content = styled.div`
  padding: 0 20px;

  .description {
    padding: 0 25px;
    margin-top: 55px;
    color: var(--gray09, #222);
    text-align: center;
    font-family: 'Pretendard';
    font-size: clamp(18px, 5vw, 22px);
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 33px */
    letter-spacing: -0.44px;
  }

  .animation-wrapper {
    width: 78%;
    aspect-ratio: 1 / 1;
    margin: 0 auto;
    margin-top: 23%;
    background: var(--gray02, #eaeaea);
  }

  & > button {
    margin-top: 45.8%;
    margin-bottom: 13.7%;
    width: 100%;
    padding: 4.9% 4px;
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
          <br />
          나의 마음을 그대로 떠올리며 검사를 진행해주세요.
        </p>
        <div className='animation-wrapper'></div>
        <button
          onClick={() => {
            router.push('/counsel/psychological-test');
          }}
        >
          심리검사 시작하기
        </button>
      </Content>
    </Layout>
  );
};

export default PsychologicalTestIntro;
