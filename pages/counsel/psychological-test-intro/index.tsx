'use client';
import React from 'react';
import styled from 'styled-components';

// import svg
import ArrowSVG from '../../../public/icons/arrow.svg';
import { useRouter } from 'next/router';

const Header = styled.header`
  padding: 60px 20px 0 20px;
  color: #222;

  .icon-wrapper {
    padding: 9.5px 8px;
  }
`;

const Content = styled.div`
  padding: 0 20px;

  .description {
    padding: 0 25px;
    margin-top: 55px;
    color: var(--gray09, #222);
    text-align: center;
    font-family: Pretendard;
    font-size: 22px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 33px */
    letter-spacing: -0.44px;
  }

  .animation-wrapper {
    width: 78%;
    aspect-ratio: 1 / 1;
    margin: 0 auto;
    margin-top: 108px;
    background: var(--gray02, #eaeaea);
  }

  & > button {
    margin-top: 216px;
    margin-bottom: 64px;
    width: 100%;
    height: 66px;
    padding: 4px;
    gap: 4px;
    border-radius: 18px;
    background: var(--doranblue, #565bff);
    color: var(--white, #fff);
    font-family: 'Pretendard';
    font-size: 20px;
    font-weight: 600;
    letter-spacing: -0.4px;
    border: none;
    cursor: pointer;
  }
`;

const PsychologicalTestIntro = () => {
  const route = useRouter();

  return (
    <div>
      <Header>
        <div className='icon-wrapper'>
          <ArrowSVG width={21} height={21} alt={'prev'} />
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
            route.push('/counsel/psychological-test');
          }}
        >
          심리검사 시작하기
        </button>
      </Content>
    </div>
  );
};

export default PsychologicalTestIntro;
