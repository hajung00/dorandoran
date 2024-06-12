import React from 'react';
import styled from 'styled-components';

// import svg
import ArrowSVG from '../../public/icons/arrow.svg';
import Lottie from 'lottie-react';

const Header = styled.header`
  padding: 60px 20px 0 20px;
  color: #222;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;

  .icon-wrapper {
    padding: 13px 8px;
  }
`;

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
  animationData?: any;
}

const Loading = ({ text, animationData }: Props) => {
  return (
    <TestLoadingStyle>
      <Lottie style={{ width: '160px' }} animationData={animationData} />
      <p>
        {text.split('.')[0]}.
        <br />
        {text.split('.')[1]}
      </p>
    </TestLoadingStyle>
  );
};

export default Loading;
