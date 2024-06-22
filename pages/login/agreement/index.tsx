'use client';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import useSWR from 'swr';

// import svg
import ArrowIcon from '../../../public/icons/arrow.svg';
import CheckIcon from '../../../public/icons/check.svg';
import ArrowUp from '../../../public/icons/chevron-up.svg';
import ArrowDown from '../../../public/icons/chevron-down.svg';

// import components
import Layout from '@/components/Layout';
import { joinAPI } from '@/pages/api/user';
import { USER_ACCOUNT_KEY } from '@/hooks/useUserAccount';
import AgreementContent from '@/components/AgreementContent';

const Header = styled.header`
  padding: 60px 20px 0 20px;
  color: #222;

  .icon-wrapper {
    display: inline-block;
    padding: 12px 8px;
    cursor: pointer;
  }
`;

const Content = styled.div`
  padding: 0 20px;
  margin-top: 22px;
  display: flex;
  flex-direction: column;

  .description {
    color: #222;
    font-family: 'Pretendard';
    font-size: clamp(20px, 6vw, 26px);
    font-weight: 600;
    margin-bottom: 22px;
  }

  .toggle-agreement {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--gray08, #444);
    font-family: 'Pretendard';
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.4px;
    padding: 20px 4px;
    cursor: pointer;
  }

  .agreement-content {
    overflow: auto;
    flex: 1;
    max-height: 53.3vh;
    visibility: hidden;
  }

  .visible {
    visibility: visible;
  }

  .check-box-section {
    display: flex;
    gap: 15px;
    align-items: center;
    padding: 20px 0;
    margin-bottom: 12px;

    & > p {
      color: var(--gray09, #222);
      font-family: 'Pretendard';
      font-size: clamp(18px, 4vw, 20px);
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
    margin-bottom: 68px;
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
  const { data: account } = useSWR(USER_ACCOUNT_KEY);

  const [checked, setChecked] = useState(false);
  const [enableButton, setEnableButton] = useState(false);
  const [agreementToggle, setAgreementToggle] = useState(false);

  useEffect(() => {
    if (checked) {
      setEnableButton(true);
    } else {
      setEnableButton(false);
    }
  }, [checked]);

  const agreementToggleHandler = useCallback(() => {
    setAgreementToggle((prev) => !prev);
  }, []);

  const onClickJoinHandler = useCallback(async () => {
    if (checked) {
      // 회원가입 api 적용
      const result = await joinAPI(
        account.name,
        account.phoneNumber,
        account.userAgency
      );

      console.log(result);
      if (result === 200) {
        router.push('/counsel');
      } else {
        console.error('회원가입 실패');
      }
    }
  }, [checked]);

  return (
    <Layout>
      <Header>
        <div
          className='icon-wrapper'
          onClick={() => {
            router.back();
          }}
        >
          <ArrowIcon width={21} height={21} alt={'prev'} stroke={'#666666'} />
        </div>
      </Header>
      <Content>
        <p className='description'>
          도란도란을 이용하기 위해
          <br />
          아래 서비스 이용약관에 동의해주세요.
        </p>
        <div className='toggle-agreement' onClick={agreementToggleHandler}>
          약관 내용 펼쳐보기
          {agreementToggle ? (
            <ArrowUp width={24} height={24} alt={'list-up'} />
          ) : (
            <ArrowDown width={24} height={24} alt={'list-down'} />
          )}
        </div>
        <div className={`agreement-content ${agreementToggle && 'visible'}`}>
          <AgreementContent />
        </div>
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
          <p>도란도란 챗봇 서비스 이용약관 (필수)</p>
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
