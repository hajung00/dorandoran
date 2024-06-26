import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const IntentSectionStyle = styled.section`
  width: 100%;
  padding: 0 2%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  justify-content: center;

  .description {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
    border-radius: 16px;
    color: var(--gray09, #222);
    text-align: center;
    font-family: 'Pretendard';
    font-size: clamp(18px, 5vw, 22px);
    font-weight: 600;
    line-height: 140%; /* 30.8px */
    letter-spacing: -0.44px;
  }

  & > button {
    min-width: fit-content;
    margin: 0 auto;
    margin-top: 29px;
    display: flex;
    width: 61%;
    padding: 4.7% 20px;
    justify-content: center;
    align-items: center;
    gap: 4px;
    border: none;
    border-radius: 18px;
    background: #565bff;
    color: var(--white, #fff);
    font: var(--Pretendard--20-600);
    letter-spacing: -0.4px;
    cursor: pointer;
  }
`;

interface Props {
  text: string;
  src: string;
  type: string;
  svgWidth: number;
  svgHeight: number;
}

const IntentSection = ({ text, src, type, svgWidth, svgHeight }: Props) => {
  const router = useRouter();

  const [buttonText, setButtonText] = useState('');

  useEffect(() => {
    if (type === 'login') {
      setButtonText('휴대폰 번호로 로그인하기');
    } else if (type === 'psychologicaltest') {
      setButtonText('심리검사 하러가기');
    } else if (type === 'counsel') {
      setButtonText('상담 시작하기');
    }
  }, [type]);

  const onClickHandler = useCallback(() => {
    if (type === 'login') {
      router.push('/login');
    } else if (type === 'psychologicaltest') {
      router.push('/psychological');
    } else if (type === 'counsel') {
      router.push('/counsel/chat-intro');
    }
  }, [type]);

  return (
    <IntentSectionStyle>
      <div className='description'>
        <Image src={src} width={svgWidth} height={svgHeight} alt={type} />
        <p dangerouslySetInnerHTML={{ __html: text }}></p>
      </div>
      <button onClick={onClickHandler}>{buttonText}</button>
    </IntentSectionStyle>
  );
};

export default IntentSection;
