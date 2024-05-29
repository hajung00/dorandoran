import React, { useCallback } from 'react';
import ModalLayout from '../ModalLayout';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const ContentModalStyle = styled.div`
  width: 84.4%;
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
    font-size: clamp(18px, 5vw, 22px);
    font-weight: 600;
    letter-spacing: -0.44px;
  }

  .sub-description {
    font-family: 'Pretendard';
    color: var(--gray06, #898989);
    font-size: clamp(16px, 4vw, 18px);
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
      font-size: clamp(16px, 4vw, 18px);
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
  type: string;
  onClosed: () => void;
}

const ContentModal = ({ type, onClosed }: Props) => {
  const router = useRouter();

  const stopPropagation = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }, []);

  return (
    <ModalLayout onClosed={onClosed}>
      <ContentModalStyle onClick={stopPropagation}>
        <div>
          <p className='main-description'>{type} 명상을 시작할까요?</p>
          <p className='sub-description'>
            명상으로 지친 마음을 훈련시켜 보아요.
          </p>
        </div>
        <div className='button-section'>
          <button onClick={onClosed}>다음에 할게요</button>
          <button
            onClick={() => {
              router.push(`/contents/${type}`);
            }}
          >
            네 시작할게요
          </button>
        </div>
      </ContentModalStyle>
    </ModalLayout>
  );
};

export default ContentModal;
