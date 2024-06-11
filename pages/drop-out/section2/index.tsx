import React from 'react';
import styled from 'styled-components';

// import svg
import ArrowSVG from '../../../public/icons/arrow.svg';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';

const Header = styled.header`
  padding: 60px 20px 0 20px;
  color: #222;

  .icon-wrapper {
    padding: 10.5px 8px;
  }
`;

const Content = styled.div`
  height: calc(100vh - 105px);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  .description {
    display: flex;
    flex-direction: column;
    align-items: center;
    transform: translateY(-30%);

    .icon {
      width: 80px;
      height: 80px;
      background: var(--gray02, #eaeaea);
      margin-bottom: 33px;
    }
    .main-description {
      color: var(--gray09, #222);
      text-align: center;
      font-family: 'Pretendard';
      font-size: 22px;
      font-weight: 600;
      line-height: 150%; /* 33px */
      margin-bottom: 14px;
    }
    .sub-description {
      color: var(--gray06, #898989);
      text-align: center;
      font-family: Pretendard;
      font-size: 18px;
      font-style: normal;
      font-weight: 500;
      line-height: 150%; /* 27px */
      margin-bottom: 14px;
    }
  }

  & > button {
    width: 100%;
    border-radius: 18px;
    background: #565bff;
    border: none;
    color: #fff;
    font-family: 'Pretendard';
    font-size: 20px;
    font-weight: 600;
    letter-spacing: -0.4px;
    position: absolute;
    bottom: 0;
    margin-bottom: 26px;
    padding: 4.5% 0;
  }
`;
const DropOut2 = () => {
  const router = useRouter();

  return (
    <Layout>
      <Header>
        <div
          className='icon-wrapper'
          onClick={() => {
            router.push('/drop-out/section1');
          }}
        >
          <ArrowSVG width={21} height={21} alt={'prev'} />
        </div>
        <Content>
          <div className='description'>
            <div className='icon'></div>
            <p className='main-description'>다음에 또 만나요!</p>
            <p className='sub-description'>
              회원 탈퇴가 정상적으로 완료되었어요.
            </p>
          </div>
          <button
            onClick={() => {
              router.push('/counsel');
            }}
          >
            메인화면으로 이동
          </button>
        </Content>
      </Header>
    </Layout>
  );
};

export default DropOut2;
