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
  padding: 0 20px;
  margin-top: 28px;

  .description {
    display: flex;
    height: 255px;
    padding: 10px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 18px;
    border-radius: 16px;
    background: #f7f7f7;
    color: #222;
    text-align: center;
    font-family: 'Pretendard';
    font-size: 1.25rem;
    font-weight: 500;
    letter-spacing: -0.4px;
  }

  .icon-wrapper {
    width: 80px;
    height: 80px;
    background: #eaeaea;
  }

  & > button {
    margin-top: 24px;
    display: flex;
    width: 100%;
    height: 66px;
    padding: 4px;
    justify-content: center;
    align-items: center;
    gap: 4px;
    border: none;
    border-radius: 18px;
    background: #565bff;
    color: white;
    font-family: 'Pretendard';
    font-size: 20px;
    font-weight: 600;
    letter-spacing: -0.4px;
    cursor: pointer;
  }
`;
const Counsel = () => {
  const user = true;
  const router = useRouter();

  return (
    <Layout>
      <Header>상담</Header>
      <Content>
        <div className='description'>
          <div className='icon-wrapper'></div>
          {!user ? (
            <p>
              상담을 하기 위해서는
              <br /> 내담자님의 정보가 필요해요.
            </p>
          ) : (
            <p>
              심리검사를 통해 현재 마음상태를 확인해볼게요.
              <br />
              나의 마음을 그대로 떠올리며 검사를 진행해주세요.
            </p>
          )}
        </div>
        {!user ? (
          <button
            onClick={() => {
              router.push('/login');
            }}
          >
            휴대폰 번호로 로그인하기
          </button>
        ) : (
          <button
            onClick={() => {
              router.push('/counsel/psychological-test');
            }}
          >
            심리검사 시작하기
          </button>
        )}
      </Content>
      <Footer />
    </Layout>
  );
};

export default Counsel;
