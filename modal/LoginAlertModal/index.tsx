import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import styled from 'styled-components';
import ModalLayout from '../ModalLayout';

const LoginAlertModalStyle = styled.div`
  display: flex;
  padding: 40px 30px 26px 30px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 28px;
  border-radius: 18px;
  background: #fff;
  width: 84.4%;

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

  & > button {
    width: 100%;
    border: none;
    display: flex;
    height: 58px;
    padding: 15px 0px;
    justify-content: center;
    align-items: center;
    gap: 4px;
    border-radius: 14px;
    background: var(--doranblue, #565bff);
    color: var(--white, #fff);
    font-family: 'Pretendard';
    font-size: clamp(16px, 4vw, 18px);
    font-weight: 600;
    letter-spacing: -0.36px;
    cursor: pointer;
  }
`;

interface Props {
  onClosed: () => void;
}

const LoginAlertModal = ({ onClosed }: Props) => {
  const stopPropagation = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }, []);

  return (
    <ModalLayout onClosed={onClosed}>
      <LoginAlertModalStyle onClick={stopPropagation}>
        <div>
          <p className='main-description'>
            이름과 휴대폰번호가 일치하지 않아요.
          </p>
          <p className='sub-description'>다시 한번 입력해주세요.</p>
        </div>
        <button onClick={onClosed}>다시 입력하기</button>
      </LoginAlertModalStyle>
    </ModalLayout>
  );
};

export default LoginAlertModal;
