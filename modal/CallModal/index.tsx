import React, { useCallback } from 'react';
import styled from 'styled-components';

// import svg
import Phone from '../../public/icons/phone.svg';

// import components
import ModalLayout from '../ModalLayout';

const CallModalStyle = styled.div`
  position: absolute;
  bottom: 28px;
  background: #fff;
  width: 92.2%;
  border-radius: 26px;
  padding: 34px 20px 24px 20px;

  .phone-number-wrapper {
    display: flex;
    gap: 14px;
    align-items: center;
    .phone-number {
      display: flex;
      flex-direction: column;
      gap: 12px;
      color: var(--gray09, #222);
      font-family: 'Pretendard';
      font-style: normal;
      line-height: normal;
      letter-spacing: -0.44px;

      & > p:first-child {
        font-size: 22px;
        font-weight: 600;
      }

      & > p:last-child {
        font-size: 20px;
        font-weight: 500;
      }
    }
  }

  & > button {
    margin-top: 38px;
    width: 100%;
    padding: 4.9% 0;
    border: none;
    border-radius: 18px;
    background: var(--doranblue, #565bff);
    color: var(--white, #fff);
    font-family: 'Pretendard';
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.4px;
    cursor: pointer;
  }
`;

interface Props {
  name: string;
  callNumber: string;
  isModalOpen: boolean;
  onClosed: () => void;
}

const CallModal = ({ name, callNumber, isModalOpen, onClosed }: Props) => {
  const stopPropagation = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }, []);

  return (
    <ModalLayout show={isModalOpen} onClosed={onClosed}>
      <CallModalStyle onClick={stopPropagation}>
        <div className='phone-number-wrapper'>
          <Phone width={24} height={24} alt='phone' />
          <div className='phone-number'>
            <p>{name}</p>
            <p>{callNumber}</p>
          </div>
        </div>
        <button onClick={onClosed}>닫기</button>
      </CallModalStyle>
    </ModalLayout>
  );
};

export default CallModal;
