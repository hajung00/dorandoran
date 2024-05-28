'use client';
import styled from 'styled-components';
import Footer from '../../components/Footer';
import Layout from '../../components/Layout';
import React from 'react';
import Link from 'next/link';

// import svg
import ArrowSVG from '../../public/icons/arrow-right.svg';
import { useRouter } from 'next/router';

const Header = styled.header`
  padding: 24% 20px 30px 20px;
  display: flex;
  gap: 16px;
  border-bottom: 1px solid var(--gray03, #e3e3e3);
  background: var(--gray01, #f7f7f7);

  & > p {
    color: var(--gray09, #222);
    font-family: 'Pretendard';
    font-size: clamp(26px, 6vw, 30px);

    font-weight: 600;
  }

  & > button {
    padding: 8px 10px;
    border-radius: 8px;
    background: var(--gray02, #eaeaea);
    color: var(--gray06, #898989);
    font-family: 'Pretendard';
    font-size: clamp(14px, 4vw, 16px);
    font-weight: 600;
    border: none;
    cursor: pointer;
  }
`;

const Content = styled.div`
  padding: 26px 20px;

  .section {
    & > p {
      padding: 16px 0;
      color: var(--gray05, #b2b2b2);
      font-family: 'Pretendard';
      font-size: 18px;
      font-weight: 500;
      line-height: 140%; /* 25.2px */
    }

    & > ul {
      list-style: none;
    }

    & > ul > a {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 0;
      color: var(--gray09, #222);
      font-family: 'Pretendard';
      font-size: 20px;
      font-weight: 600;
      line-height: 140%; /* 28px */
      text-decoration: none;
    }

    &:first-child::after {
      content: '';
      display: block;
      widht: 100%;
      height: 1px;
      background: #e3e3e3;
      margin: 26px 0;
    }
  }
`;

const MyPage = () => {
  const router = useRouter();

  return (
    <Layout>
      <Header>
        <p>조성혁님</p>
        <button
          onClick={() => {
            router.push('/logout');
          }}
        >
          로그아웃
        </button>
      </Header>
      <Content>
        <div className='section'>
          <p>심리검사</p>
          <ul>
            <Link href='/mypage/test-result'>
              <li>나의 첫 심리검사 결과 조회하기</li>
              <ArrowSVG width={24} height={24} alt={'button'} />
            </Link>
            <Link href='/mypage/test-change'>
              <li>나의 심리변화 추이 확인하기</li>
              <ArrowSVG width={24} height={24} alt={'button'} />
            </Link>
          </ul>
        </div>
        <div className='section'>
          <p>회원정보</p>
          <ul>
            <Link href='/drop-out/section1'>
              <li>회원 탈퇴하기</li>
              <ArrowSVG width={24} height={24} alt={'button'} />
            </Link>
          </ul>
        </div>
      </Content>
      <Footer />
    </Layout>
  );
};

export default MyPage;
