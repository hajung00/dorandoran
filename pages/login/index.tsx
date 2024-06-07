'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

// import svg
import XIcon from '../../public/icons/x.svg';
import AlertIcon from '../../public/icons/alert-circle.svg';

// import components
import Layout from '@/components/Layout';
import LoginAlertModal from '@/modal/LoginAlertModal';
import { loginAPI, requestSMSAPI } from '../api/user';

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
  margin-bottom: 35%;

  .description {
    color: #222;
    font-family: 'Pretendard';
    font-size: clamp(20px, 6vw, 26px);
    font-weight: 600;
  }

  .sub-description {
    margin-top: 12px;
    margin-bottom: 93px;
    color: #666;
    font-family: 'Pretendard';
    font-size: clamp(16px, 5vw, 20px);
    font-weight: 400;
  }

  .enable {
    background: #565bff;
    color: #ffffff;
    cursor: pointer;
  }

  .disable {
    background: #e3e3e3;
    color: #b2b2b2;
  }

  .again-button {
    border: 1px solid var(--doranblue, #565bff);
    background: var(--white, #fff);
    color: var(--doranblue, #565bff);
  }
  & > button {
    margin-top: 28px;
    margin-bottom: 24px;
    display: flex;
    width: 100%;
    padding: 4.5% 20px;
    justify-content: center;
    align-items: center;
    gap: 4px;
    flex-shrink: 0;
    border: none;
    border-radius: 18px;
    font-family: 'Pretendard';
    font-size: clamp(18px, 5vw, 20px);
    font-weight: 600;
    letter-spacing: -0.4px;
  }
`;

const InputWrapper = styled.div<{ bordercolor?: string }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 28px;

  & > label {
    padding: 4px;
    color: #6b6b6b;
    font-family: 'Pretendard';
    font-size: 18px;
    font-weight: 500;
    letter-spacing: -0.36px;
  }

  & > div {
    position: relative;
  }
  & > div > input {
    display: flex;
    width: 100%;
    padding: 4.5% 20px;
    align-items: center;
    gap: 4px;
    border-radius: 18px;
    border: 1px solid #d9d9d9;
    background: #fff;
    outline-color: ${(props: any) =>
      props.bordercolor === 'true' ? '#FF2020' : '#565bff'};
    color: var(--gray08, #444);
    font-family: 'Pretendard';
    font-size: 20px;
    font-weight: 500;
    letter-spacing: -0.4px;
    &::placeholder {
      color: #d9d9d9;
    }
  }
  .alert-icon-wrapper {
    position: absolute;
    top: 20%;
    right: 20px;
  }
  .alert {
    color: #ff2020;
    font-family: 'Pretendard';
    font-size: 16px;
    font-weight: 400;
    letter-spacing: -0.32px;
    padding: 4px;
    margin-top: 4px;
  }
`;

const Login = () => {
  const router = useRouter();
  const nameRegex = /^[ㄱ-ㅎ|가-힣]/;
  const [nameRegexCheck, setNameRegexCheck] = useState(true);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [enableRequestButton, setEnableRequestButton] = useState(false); // 인증번호 요청 버튼 활성화 여부
  const [enableCheckButton, setEnableCheckButton] = useState(false); // 인증번호 확인 버튼 활성화 여부
  const [timeLeft, setTimeLeft] = useState(300);
  const [requestAuthentication, setRequestAuthentication] = useState(false); // 인증번호 요청 여부
  const [loginAlertModal, setLoginAlertModal] = useState(false);

  const onChangeName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  const onChangePhoneNumber = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPhoneNumber(e.target.value);
    },
    []
  );

  const onChangeVerificationCode = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setVerificationCode(e.target.value);
    },
    []
  );

  // 이름 유효성 확인
  useEffect(() => {
    if (name && !nameRegex.test(name)) {
      setNameRegexCheck(true);
    } else {
      setNameRegexCheck(false);
    }
  }, [name]);

  // 인증번호 요청 버튼 활성화 여부 확인
  useEffect(() => {
    if (name && phoneNumber.length === 11 && !nameRegexCheck) {
      setEnableRequestButton(true);
    } else {
      setEnableRequestButton(false);
    }
  }, [name, phoneNumber, nameRegexCheck]);

  // 인증번호 확인 버튼 활성화 여부 확인
  useEffect(() => {
    if (verificationCode.length === 6) {
      setEnableCheckButton(true);
    } else {
      setEnableCheckButton(false);
    }
  }, [verificationCode]);

  // 인증문자 받기 버튼 클릭
  const onClickReceiveButton = useCallback(async () => {
    // db로 부터 검증 한 후 인증번호 전송
    if (enableRequestButton) {
      // 인증번호 요청 api 요청
      const valid = await requestSMSAPI(name, phoneNumber);
      console.log('valid', valid);

      // 유효한 이름과 휴대폰 번호일 경우 인증번호 시간 카운트
      if (valid === 200) {
        setRequestAuthentication((prev) => !prev);
      } else if (valid === 400) {
        // 유효하지 않은 이름과 휴대폰 번호일 경우 모달 오픈
        setLoginAlertModal(true);
      }
    }
  }, [name, phoneNumber, enableRequestButton]);

  // 인증문자 받기 클릭 후 유효 시간 설정
  useEffect(() => {
    if (requestAuthentication && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [requestAuthentication, timeLeft]);

  // 인증문자 확인 버튼 클릭
  const onClickCheckButton = useCallback(async () => {
    if (enableCheckButton) {
      // 회원가입, 로그인 api 요청
      const result = await loginAPI(name, phoneNumber, verificationCode);
      console.log('result', result);

      // 인증번호 확인 성공
      if (result === 200) {
        return router.push('/counsel');
      } else {
        // 인증번호 확인 실패
        // 실패 이유 알려주는 모달이 필요해 보임.
      }
    }
  }, [name, phoneNumber, enableCheckButton, verificationCode]);

  // 이름, 휴대폰 번호 일치하지 않을 시 alert 모달 toggle
  const loginAlertModalHandler = useCallback(() => {
    setLoginAlertModal((prev) => !prev);
  }, []);

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
        {!requestAuthentication ? (
          <>
            <p className='description'>
              내담자님만의 사연을 듣고 상담하고 싶어요.
              <br />
              휴대폰 번호로 로그인해주세요.
            </p>
            <p className='sub-description'>
              내담자님의 정보는 안전하게 보관돼요.
            </p>
          </>
        ) : (
          <>
            <p className='description'>
              받으신 인증번호를 입력하시고,
              <br />
              아래 인증번호 확인 버튼을 눌러주세요.
            </p>
            <p className='sub-description'>
              인증번호를 받지 못하셨다면 <br />
              인증문자 다시 받기 버튼을 클릭해주세요.
            </p>
          </>
        )}
        <InputWrapper bordercolor={`${nameRegexCheck}`}>
          <label>이름</label>
          <div>
            <input
              type='text'
              placeholder='이름을 입력해주세요.'
              value={name}
              onChange={onChangeName}
            />
            {nameRegexCheck && (
              <div className='alert-icon-wrapper'>
                <AlertIcon width={24} height={24} alt={'alert'} />
              </div>
            )}
            {nameRegexCheck && (
              <p className='alert'>이름을 정확히 입력해주세요</p>
            )}
          </div>
        </InputWrapper>
        <InputWrapper>
          <label>휴대폰번호</label>
          <div>
            <input
              type='number'
              placeholder="'-'없이 숫자만 입력해주세요."
              onInput={(el: any) => {
                if (el.target.value.length > 11) {
                  el.target.value = el.target.value.substr(0, 11);
                }
              }}
              value={phoneNumber}
              onChange={onChangePhoneNumber}
            />
          </div>
        </InputWrapper>
        {!requestAuthentication ? (
          <button
            className={enableRequestButton ? 'enable' : 'disable'}
            onClick={onClickReceiveButton}
          >
            인증문자 받기
          </button>
        ) : (
          <>
            <button className='again-button'>
              인증문자 다시 받기 ({Math.floor(timeLeft / 60)}분{' '}
              {Math.floor(timeLeft % 60)}초)
            </button>
            <InputWrapper>
              <label>인증번호</label>
              <div>
                <input
                  type='number'
                  placeholder='인증번호를 입력해주세요.'
                  value={verificationCode}
                  onChange={onChangeVerificationCode}
                />
              </div>
            </InputWrapper>
            <button
              className={enableCheckButton ? 'enable' : 'disable'}
              onClick={onClickCheckButton}
            >
              인증번호 확인
            </button>
          </>
        )}
      </Content>
      {loginAlertModal && <LoginAlertModal onClosed={loginAlertModalHandler} />}
    </Layout>
  );
};

export default Login;
