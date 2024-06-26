import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

// import components
import Layout from '@/components/Layout';
import Button from '@/components/Button';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 20px;
  margin-bottom: 12.5%;

  .description {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    justify-content: center;
    font-family: 'Pretendard';

    .main-description {
      color: var(--gray09, #222);
      text-align: center;
      font: var(--Pretendard--26-600);
      line-height: 150%; /* 39px */
      margin-bottom: 14px;
    }
    .sub-description {
      color: var(--gray08, #444);
      text-align: center;
      font-size: 20px;
      font-weight: 500;
      line-height: 150%; /* 30px */
      margin-bottom: 22px;
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
        <Button
          text='메인화면으로 이동'
          type={true}
          onClick={() => {
            router.push('/counsel');
          }}
        />
      </Content>
    </Layout>
  );
};

export default DropOut2;
