'use client';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

// import svg
import XIcon from '../../../public/icons/x.svg';
import CheckIcon from '../../../public/icons/check.svg';

// import components
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';

const Header = styled.header`
  padding: 60px 20px 0 20px;
  color: #222;

  .icon-wrapper {
    display: inline-block;
    padding: 12px 8px;
  }
`;

const Content = styled.div`
  padding: 0 20px;
  margin-top: 22px;
  margin-bottom: 12.5%;
  flex: 1;

  .description {
    color: #222;
    font-family: 'Pretendard';
    font-size: clamp(20px, 6vw, 26px);
    font-weight: 600;
    margin-bottom: 65px;
  }

  .sub-description {
    margin-top: 12px;
    margin-bottom: 48px;
    color: #666;
    font-family: 'Pretendard';
    font-size: clamp(16px, 5vw, 20px);
    font-weight: 400;
  }
  .point {
    display: block;
    margin-bottom: 20px;
    color: #222;
    font-family: 'Pretendard';
    font-size: clamp(20px, 6vw, 26px);
    font-weight: 600;
  }

  .agreement-content {
    height: 450px;
    margin-bottom: 50px;
  }

  .check-box-section {
    display: flex;
    gap: 15px;
    align-items: center;
    margin-bottom: 35px;

    & > p {
      color: var(--gray09, #222);
      font-family: 'Pretendard';
      font-size: 20px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      letter-spacing: -0.4px;
    }
  }

  .check-box {
    display: flex;
    width: 40px;
    height: 40px;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    border: 1px solid var(--gray05, #b2b2b2);
    background: var(--white, #fff);
  }

  .checked {
    background: var(--doranblue, #565bff);
  }

  & > button {
    width: 100%;
    border-radius: 18px;
    background: #e3e3e3;
    border: none;
    padding: 4.5%;
    color: #b2b2b2;
    font-family: 'Pretendard';
    font-size: clamp(18px, 4vw, 20px);
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.4px;
  }

  .enable {
    background: #565bff;
    color: #fff;
    cursor: pointer;
  }
`;

const Agreement = () => {
  const router = useRouter();

  const [checked, setChecked] = useState(false);
  const [enableButton, setEnableButton] = useState(false);

  useEffect(() => {
    if (checked) {
      setEnableButton(true);
    } else {
      setEnableButton(false);
    }
  }, [checked]);

  const onClickJoinHandler = useCallback(() => {
    if (enableButton) {
      // 회원가입 api 적용
    }
  }, [enableButton]);

  return (
    <Layout>
      <Header>
        <div
          className='icon-wrapper'
          onClick={() => {
            router.push('/counsel');
          }}
        >
          <XIcon width={18} height={18} alt={'cancel'} stroke={'#666666'} />
        </div>
      </Header>
      <Content>
        <p className='description'>서비스 이용약관에 동의해주세요.</p>
        <p className='sub-description'>
          <span className='point'>도란도란 서비스는</span>
          내담자님의 개인정보와 상담내역을 안전하게 보관해요. <br />위 항목들을
          보관하는것에 동의해주세요.
        </p>
        <div className='agreement-content'>이용 약관 내용</div>
        <div
          className='check-box-section'
          onClick={() => {
            setChecked((prev) => !prev);
          }}
        >
          <div className={`check-box ${checked ? 'checked' : ''}`}>
            {checked ? (
              <CheckIcon width={20} height={20} alt={'check'} stroke={'#FFF'} />
            ) : (
              <CheckIcon
                width={20}
                height={20}
                alt={'check'}
                stroke={'#B2B2B2'}
              />
            )}
          </div>
          <p>위 약관에 동의합니다.(필수)</p>
        </div>
        <button
          className={`${enableButton ? 'enable' : ''}`}
          onClick={onClickJoinHandler}
        >
          회원가입 완료
        </button>
      </Content>
    </Layout>
  );
};

export default Agreement;
