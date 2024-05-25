'use client';
import styled from 'styled-components';
import Footer from '../../components/Footer';
import Layout from '../../components/Layout';
import React, { use } from 'react';
import { useRouter } from 'next/router';

const Header = styled.header`
  padding: 54px 20px 0 20px;
  color: #222;
  font-family: 'Pretendard';
  font-size: 34px;
  font-weight: 700;
`;

const Content = styled.div`
  height: calc(100vh - 94px - 80px);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
`;

const NonLogin = () => {
  const NonLoginStyle = styled.div`
    transform: translateY(40%);
    width: 100%;
    padding: 0 2%;

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
      font-size: clamp(18px, 4.5vw, 22px);
      font-weight: 600;
      line-height: 140%; /* 30.8px */
      letter-spacing: -0.44px;

      & > p {
        width: 100%;
      }
    }

    & > button {
      margin-top: 50px;
      display: flex;
      width: 100%;
      padding: 4.7% 4px;
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
  `;
  const router = useRouter();
  return (
    <NonLoginStyle>
      <div className='description'>
        <div className='icon-wrapper'></div>
        <p>
          상담을 하기 위해서는 로그인 상태여야 해요! <br />
          아래 버튼을 눌러 로그인을 진행해주세요.
        </p>
      </div>
      <button
        onClick={() => {
          router.push('/login');
        }}
      >
        휴대폰 번호로 로그인하기
      </button>
    </NonLoginStyle>
  );
};

const NonTest = () => {
  const NonTestStyle = styled.div`
    width: 100%;
    margin-top: 30px;
    padding: 40px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 26px;
    background: var(--gray01, #f7f7f7);

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
  `;

  const router = useRouter();
  return (
    <NonTestStyle>
      <div className='description'>
        <div className='icon-wrapper'></div>
        <p>
          심리검사로 <br />
          현재 내 마음상태 알아보기
        </p>
      </div>
      <button
        onClick={() => {
          router.push('/counsel/psychological-test-intro');
        }}
      >
        심리검사 시작하기
      </button>
    </NonTestStyle>
  );
};
const Counsel = () => {
  const user = true;

  return (
    <Layout>
      <Header>상담</Header>
      <Content>{!user ? <NonLogin /> : <NonTest />}</Content>
      <Footer />
    </Layout>
  );
};

export default Counsel;
