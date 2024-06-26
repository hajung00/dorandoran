import React from 'react';
import styled from 'styled-components';
import Lottie from 'lottie-react';

// import animation
import LoadinganimationData from '../../public/animation/loading.json';

const TestLoadingStyle = styled.div`
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
  max-width: 512px;
  height: 100vh;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > p {
    margin-top: 21px;
    color: var(--gray09, #222);
    text-align: center;
    font-family: 'Pretendard';
    font-size: clamp(18px, 5vw, 22px);
    font-weight: 600;
    line-height: 150%; /* 33px */
  }
`;

interface Props {
  text: string;
}

const Loading = ({ text }: Props) => {
  return (
    <TestLoadingStyle>
      <Lottie style={{ width: '80px' }} animationData={LoadinganimationData} />
      <p>
        {text} 결과를 분석중이에요.
        <br />
        잠시만 기다려주세요!
      </p>
    </TestLoadingStyle>
  );
};

export default Loading;
