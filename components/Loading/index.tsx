import React from 'react';
import styled from 'styled-components';

// import svg
import ArrowSVG from '../../public/icons/arrow.svg';

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
  height: 100vh;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .icon {
    width: 80px;
    height: 80px;
    background: var(--gray02, #eaeaea);
  }

  & > p {
    margin-top: 63px;
    color: var(--gray09, #222);
    text-align: center;
    font-family: 'Pretendard';
    font-size: 22px;
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
      <Header>
        <div className='icon-wrapper'>
          <ArrowSVG width={21} height={21} alt={'prev'} />
        </div>
      </Header>
      <div className='icon'></div>
      <p>
        {text.split('.')[0]}.
        <br />
        {text.split('.')[1]}
      </p>
    </TestLoadingStyle>
  );
};

export default Loading;
