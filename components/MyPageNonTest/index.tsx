import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

const MyPageNonTestStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  transform: translateY(-7%);

  .icon {
    width: 80px;
    height: 80px;
    background: var(--gray02, #eaeaea);
    margin-bottom: 38px;
  }

  & > p {
    color: var(--gray09, #222);
    text-align: center;
    font-family: 'Pretendard';
    font-size: 22px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 33px */
    margin-bottom: 26px;
  }

  & > button {
    padding: 4.5% 60px;
    border-radius: 18px;
    background: var(--doranblue, #565bff);
    border: none;
    color: var(--white, #fff);
    font-family: 'Pretendard';
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.4px;
  }
`;

const MypageNonTest = () => {
  const router = useRouter();

  return (
    <MyPageNonTestStyle>
      <div className='icon'></div>
      <p>
        아직 심리검사를 하지 않으셨네요.
        <br />
        지금 바로 검사를 시작해보세요!
      </p>
      <button
        onClick={() => {
          router.push('/counsel/psychological-test-intro');
        }}
      >
        심리검사 하러가기
      </button>
    </MyPageNonTestStyle>
  );
};

export default MypageNonTest;
