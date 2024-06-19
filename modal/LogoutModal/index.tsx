import React, { useCallback } from 'react';
import ModalLayout from '../ModalLayout';
import { useRouter } from 'next/router';
import { logoutAPI } from '@/pages/api/user';
import styled from 'styled-components';

const LogoutModalStyle = styled.div`
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
      color: var(--doranblue, #898989);
      border: 1px solid var(--doranblue, #e3e3e3);
    }

    & > button:last-child {
      background: var(--doranblue, #565bff);
      color: var(--white, #fff);
    }
  }
`;

interface Props {
  token: string;
  onClosed: () => void;
}

const LogoutModal = ({ token, onClosed }: Props) => {
  const router = useRouter();

  const stopPropagation = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }, []);

  const logoutHandler = useCallback(async () => {
    if (token) {
      const result = await logoutAPI(token);
      if (result === 200) {
        router.push('/counsel');
      }
    }
  }, [token]);

  return (
    <ModalLayout onClosed={onClosed}>
      <LogoutModalStyle onClick={stopPropagation}>
        <div>
          <p className='main-description'>로그아웃</p>
          <p className='sub-description'>정말 로그아웃 할까요?</p>
        </div>
        <div className='button-section'>
          <button onClick={onClosed}>닫기</button>
          <button onClick={logoutHandler}>로그아웃</button>
        </div>
      </LogoutModalStyle>
    </ModalLayout>
  );
};

export default LogoutModal;
