'use client';
import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

// import svg
import ArrowSVG from '../../public/icons/arrow-right.svg';

// import components
import Layout from '../../components/Layout';
import Footer from '../../components/Footer';
import LogoutModal from '@/modal/LogoutModal';

// import hooks
import { getCookieValue } from '@/utils/getCookieValue';
import fetcher from '@/utils/fetchers';

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
      font: var(--Pretendard--20-600);
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

interface Props {
  token: string;
  userData: { [key: string]: any };
}

const MyPage = ({ token, userData }: Props) => {
  const router = useRouter();
  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token]);

  const [logoutModal, setLogoutModal] = useState(false);
  const logoutModalHandler = useCallback(() => {
    setLogoutModal((prev) => !prev);
  }, []);

  return (
    <Layout>
      <Header>
        <p>{userData?.name}님</p>
        <button onClick={logoutModalHandler}>로그아웃</button>
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
      {logoutModal && (
        <LogoutModal token={token} onClosed={logoutModalHandler} />
      )}
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

export default MyPage;
