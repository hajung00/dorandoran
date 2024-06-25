'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import styled from 'styled-components';

// import svg
import CheckIcon from '../../../public/icons/check.svg';
import ArrowUp from '../../../public/icons/chevron-up.svg';
import ArrowDown from '../../../public/icons/chevron-down.svg';

// import components
import Layout from '@/components/Layout';
import AgreementContent from '@/components/AgreementContent';
import Header from '@/components/Header';
import Description from '@/components/Description';
import Button from '@/components/Button';

// import api
import { joinAPI } from '@/pages/api/user';

// import hooks
import { USER_ACCOUNT_KEY } from '@/hooks/useUserAccount';

const Content = styled.div`
  padding: 0 20px;
  margin-top: 22px;
  display: flex;
  flex-direction: column;
`;

const AgreementSection = styled.section`
  .toggle-agreement {
    margin-top: 22px;
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
    width: 100vw;
    transform: translateX(-20px);
    max-width: 512px;
  }

  .visible {
    visibility: visible;
  }
`;

const CheckBoxSection = styled.div`
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
`;

const Agreement = () => {
  const router = useRouter();
  const { data: account } = useSWR(USER_ACCOUNT_KEY); // 개인정보

  const [checked, setChecked] = useState(false); // 약관동의 체크 여부
  const [enableButton, setEnableButton] = useState(false); // 버튼 활성화
  const [agreementToggle, setAgreementToggle] = useState(false); // 약관동의 내용 toggle

  const agreementToggleHandler = useCallback(() => {
    setAgreementToggle((prev) => !prev);
  }, []);

  // 약관 동의 체크 여부에 따른 버튼 활성, 비활성화
  useEffect(() => {
    if (checked) {
      setEnableButton(true);
    } else {
      setEnableButton(false);
    }
  }, [checked]);

  // 회원가입 클릭 이벤트
  const onClickJoinHandler = useCallback(async () => {
    if (checked && account) {
      // 회원가입 api 적용
      const result = await joinAPI(
        account.name,
        account.phoneNumber,
        account.userAgency
      );

      if (result === 200) {
        router.push('/counsel');
      } else {
        console.error('회원가입 실패');
      }
    }
  }, [checked, account]);

  return (
    <Layout>
      <Header type={'prev'} />
      <Content>
        <Description
          desc={
            '도란도란을 이용하기 위해<br />아래 서비스 이용약관에 동의해주세요.'
          }
        />
        <AgreementSection>
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
        </AgreementSection>
        <CheckBoxSection
          onClick={() => {
            setChecked((prev) => !prev);
          }}
        >
          <div className={`check-box ${checked ? 'checked' : ''}`}>
            <CheckIcon
              width={20}
              height={20}
              alt={'check'}
              stroke={checked ? '#FFF' : '#B2B2B2'}
            />
          </div>
          <p>도란도란 챗봇 서비스 이용약관 (필수)</p>
        </CheckBoxSection>
        <Button
          text='회원가입 완료'
          type={enableButton}
          onClick={onClickJoinHandler}
        />
      </Content>
    </Layout>
  );
};

export default Agreement;
