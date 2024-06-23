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
    cursor: pointer;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;

  .description {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    justify-content: center;

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
      font-size: 26px;
      font-style: normal;
      font-weight: 600;
      line-height: 150%; /* 39px */
      letter-spacing: -0.52px;
      margin-bottom: 14px;
    }
    .sub-description {
      color: var(--gray08, #444);
      text-align: center;
      font-family: 'Pretendard';
      font-size: 20px;
      font-style: normal;
      font-weight: 500;
      line-height: 150%; /* 30px */
      margin-bottom: 22px;
    }
  }

  .button-section {
    padding: 0 20px;
    width: 100%;

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
      margin-bottom: 26px;
      padding: 4.5% 0;
      cursor: pointer;
    }
  }
`;
const DropOut2 = () => {
  const router = useRouter();

  return (
    <Layout>
      <Content>
        <div className='description'>
          <p className='main-description'>
            회원 탈퇴가 <br />
            정상적으로 처리되었어요.
          </p>
          <p className='sub-description'>
            다시 이야기하고 싶을 땐<br />
            언제든지 도란도란을 찾아와주세요!
          </p>
        </div>
        <div className='button-section'>
          <button
            onClick={() => {
              router.push('/counsel');
            }}
          >
            메인화면으로 이동
          </button>
        </div>
      </Content>
    </Layout>
  );
};

export default DropOut2;
