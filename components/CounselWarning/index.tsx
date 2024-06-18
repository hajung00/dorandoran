import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

// import svg
import AlertSVG from '../../public/icons/alert-circle-counsel.svg';
import ArrowSVG from '../../public/icons/arrow-right.svg';

// import components
import CallModal from '@/modal/CallModal';

const CounselWarningStyle = styled.div`
  margin-top: 26px;
  border-radius: 16px;
  border: 1px solid var(--gray03, #e3e3e3);
  padding: 16px;

  .modal-title {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--gray08, #444);
    font-family: 'Pretendard';
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 140%; /* 25.2px */
    letter-spacing: -0.36px;
    text-transform: uppercase;
  }

  .description {
    color: var(--gray09, #222);
    font-family: 'Pretendard';
    font-size: clamp(17px, 4vw, 20px) !important;
    font-style: normal;
    font-weight: 500;
    line-height: 140%; /* 28px */
    letter-spacing: -0.4px;
    text-transform: uppercase;
    text-align: left !important;
    align-items: start !important;
  }

  .button-section {
    margin-top: 16px;
    display: flex;
    gap: 20px;

    & > a {
      text-decoration: none;
    }

    & > a,
    & > button {
      color: var(--doranblue, #565bff);
      font-family: 'Pretendard';
      font-size: clamp(12px, 4vw, 16px);
      font-style: normal;
      font-weight: 600;
      line-height: 140%;
      letter-spacing: -0.32px;
      text-transform: uppercase;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 6px;
      border-radius: 8px;
      border: none;
      background: var(--doranblue03, #f3f3ff);
      padding: 8px 6px 8px 12px;
      cursor: pointer;
    }
  }
`;

interface Props {
  comment: string;
}
const CounselWarning = ({ comment }: Props) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent =
      typeof navigator === 'undefined' ? '' : navigator.userAgent;
    const isMobileUserAgent = /android|ipad|iphone|ipod/i.test(userAgent);
    setIsMobile(isMobileUserAgent);
  }, []);

  const [callType, setCallType] = useState('');
  const [callNumber, setCallNumber] = useState('');

  const onClickHandler = useCallback(
    (callNumber: string, e: React.MouseEvent<HTMLButtonElement>) => {
      const target = e.target as HTMLLIElement;
      setCallType(target.innerText);
      setCallNumber(callNumber);
      callModalHandler();
    },
    []
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const callModalHandler = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, [callType, callNumber]);

  return (
    <CounselWarningStyle>
      <p className='modal-title'>
        <AlertSVG width={24} height={24} alt='alert' />
        알림
      </p>
      <p className='description'>{comment}</p>
      <div className='button-section'>
        {isMobile ? (
          <>
            <a href='tel:1577-0199'>
              정신건강 위기 상담 전화
              <ArrowSVG width={20} height={20} alt='arrow' />
            </a>
            <a href='tel:129'>
              보건복지 콜센터 <ArrowSVG width={20} height={20} alt='arrow' />
            </a>
          </>
        ) : (
          <>
            <button
              onClick={(e) => {
                onClickHandler('1599-0199', e);
              }}
            >
              정신건강 위기 상담 전화
              <ArrowSVG width={20} height={20} alt='arrow' />
            </button>
            <button
              onClick={(e) => {
                onClickHandler('국번없이 129', e);
              }}
            >
              보건복지 콜센터
              <ArrowSVG width={20} height={20} alt='arrow' />
            </button>
          </>
        )}
      </div>
      {isModalOpen && (
        <CallModal
          name={callType}
          callNumber={callNumber}
          onClosed={callModalHandler}
        />
      )}
    </CounselWarningStyle>
  );
};

export default CounselWarning;
