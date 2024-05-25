import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import ModalLayout from '../ModalLayout';
import Loading from '@/components/Loading';
import { useRouter } from 'next/router';

const FinishCounselModalStyle = styled.div`
  display: flex;
  padding: 40px 30px 26px 30px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 28px;
  border-radius: 18px;
  background: #fff;

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
  }

  .main-description {
    font-family: 'Pretendard';
    color: var(--gray09, #222);
    font-size: 22px;
    font-weight: 600;
    letter-spacing: -0.44px;
  }

  .sub-description {
    font-family: 'Pretendard';
    color: var(--gray06, #898989);
    font-size: 18px;
    font-weight: 500;
    letter-spacing: -0.36px;
    text-align: center;
  }

  .button-section {
    flex-direction: row;
    width: 100%;

    & > button {
      width: 50%;
      border: none;
      display: flex;
      height: 58px;
      padding: 15px 0px;
      justify-content: center;
      align-items: center;
      gap: 4px;
      border-radius: 14px;
      font-family: 'Pretendard';
      font-size: 18px;
      font-weight: 600;
      letter-spacing: -0.36px;
      cursor: pointer;
    }

    & > button:first-child {
      background: var(--white, #fff);
      color: var(--doranblue, #565bff);
      border: 1px solid var(--doranblue, #565bff);
    }

    & > button:last-child {
      background: var(--doranblue, #565bff);
      color: var(--white, #fff);
    }
  }
`;

interface Props {
  onClosed: () => void;
}
const FinishCounselModal = ({ onClosed }: Props) => {
  const router = useRouter();

  const stopPropagation = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const finishCounsel = useCallback(() => {
    const timer = setTimeout(() => {
      setIsLoading((prev) => !prev);
      router.push('/counsel/result');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ModalLayout onClosed={onClosed}>
      <FinishCounselModalStyle onClick={stopPropagation}>
        <div>
          <p className='main-description'>상담을 종료할까요?</p>
          <p className='sub-description'>
            상담을 종료하면 심리 상태가 업데이트 되고
            <br /> 해당 상담은 다시 시작할 수 없어요.
          </p>
        </div>
        <div className='button-section'>
          <button onClick={onClosed}>계속할래요</button>
          <button onClick={finishCounsel}>네 종료할게요</button>
        </div>
      </FinishCounselModalStyle>
      {isLoading && (
        <Loading
          text='상담 결과를 분석중이에요.
        잠시만 기다려주세요!'
        />
      )}
    </ModalLayout>
  );
};

export default FinishCounselModal;
