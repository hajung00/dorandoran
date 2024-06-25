'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

// import svg
import AlertIcon from '../../public/icons/alert-circle.svg';

// import components
import Layout from '@/components/Layout';
import LoginAlertModal from '@/modal/LoginAlertModal';
import Header from '@/components/Header';
import Description from '@/components/Description';
import Button from '@/components/Button';
import VerificationCode from '@/components/VerificationCode';

// import api
import { requestSMSAPI } from '../api/user';

// import hooks
import { getCookieValue } from '@/utils/getCookieValue';

const Content = styled.div`
  padding: 0 20px;
  margin-top: 22px;
  margin-bottom: 35%;
`;

const InfoSection = styled.section`
  margin-top: 93px;
`;

export const InputWrapper = styled.div<{ bordercolor?: string }>`
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
    outline: none;
    border: ${(props: any) =>
      props.bordercolor === 'true' ? '1px solid #FF2020' : '1px solid #d9d9d9'};
    background: #fff;
    outline-color: ${(props: any) =>
      props.bordercolor === 'true' ? '#FF2020' : '#565bff'};
    color: ${(props: any) =>
      props.bordercolor === 'true' ? '#FF2020' : '#444'};
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

interface Props {
  token: string;
}

const Login = ({ token }: Props) => {
  const router = useRouter();

  const nameRegex = /^[ㄱ-ㅎ가-힣]*$/; // 이름 유효성(한글만 가능)
  const [name, setName] = useState('');
  const [nameRegexCheck, setNameRegexCheck] = useState(true); // 유효성 체크
  const [phoneNumber, setPhoneNumber] = useState('');
  const [requestAuthentication, setRequestAuthentication] = useState(false); // 인증번호 요청 여부
  const [timeLeft, setTimeLeft] = useState(300); // 인증번호 유효 시간
  const [enableRequestButton, setEnableRequestButton] = useState(false); // 인증번호 요청 버튼 활성화 여부

  const [loginAlertModal, setLoginAlertModal] = useState(false); // 로그인 오류 모달(이름, 휴대전화 불일치)

  // 이미 로그인한 경우 상담페이지로 이동
  useEffect(() => {
    if (token) {
      router.push('/counsel');
    }
  }, [token]);

  const onChangeName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  const onChangePhoneNumber = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPhoneNumber(e.target.value);
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
  }, [name, nameRegex]);

  // 인증번호 요청 버튼 활성화 여부 확인
  useEffect(() => {
    // 이름, 이름 유효성, 휴대전화가 조건에 부합하면 버튼 활성화
    if (name && !nameRegexCheck && phoneNumber.length === 11) {
      setEnableRequestButton(true);
    } else {
      setEnableRequestButton(false);
    }
  }, [name, phoneNumber, nameRegexCheck]);

  // 인증문자 받기, 인증문자 다시 받기 버튼 클릭
  const onClickReceiveButton = useCallback(async () => {
    if (enableRequestButton) {
      // 인증번호 요청 api 요청
      const valid = await requestSMSAPI(name, phoneNumber);

      // 유효한 이름과 휴대폰 번호일 경우 인증번호 시간 카운트
      if (valid === 200) {
        setTimeLeft(300); // 시간 초기화
        setRequestAuthentication(true);
      } else if (valid === 400) {
        // 유효하지 않은 이름과 휴대폰 번호일 경우 모달 오픈
        setLoginAlertModal(true);
      }
    }
  }, [name, phoneNumber, enableRequestButton]);

  // 인증문자 받기, 인증문자 다시 받기 버튼 클릭 후 유효 시간 설정
  useEffect(() => {
    if (requestAuthentication && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [requestAuthentication, timeLeft]);

  // 이름, 휴대폰 번호 일치하지 않을 시 alert 모달 toggle
  const loginAlertModalHandler = useCallback(() => {
    setLoginAlertModal((prev) => !prev);
  }, []);

  return (
    <Layout>
      <Header type={'close'} link={'/counsel'} />
      <Content>
        {!requestAuthentication ? (
          <Description
            desc={
              '내담자님만의 사연을 듣고 상담하고 싶어요.<br />휴대폰 번호로 로그인해주세요.'
            }
            subDesc={'내담자님의 정보는 안전하게 보관돼요.'}
          />
        ) : (
          <Description
            desc={
              '받으신 인증번호를 입력하시고,<br />아래 인증번호 확인 버튼을 눌러주세요.'
            }
            subDesc={
              '인증번호를 받지 못하셨다면<br />인증문자 다시 받기 버튼을 클릭해주세요.'
            }
          />
        )}
        <InfoSection>
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
                <>
                  <div className='alert-icon-wrapper'>
                    <AlertIcon width={24} height={24} alt={'alert'} />
                  </div>
                  <p className='alert'>이름을 정확히 입력해주세요</p>
                </>
              )}
            </div>
          </InputWrapper>
          <InputWrapper>
            <label>휴대폰번호</label>
            <div>
              <input
                type='number'
                placeholder="'-'없이 숫자만 입력해주세요."
                value={phoneNumber}
                onChange={onChangePhoneNumber}
                onInput={(el: any) => {
                  if (el.target.value.length > 11) {
                    el.target.value = el.target.value.substr(0, 11);
                  }
                }}
              />
            </div>
          </InputWrapper>
        </InfoSection>

        {!requestAuthentication ? (
          <Button
            text='인증문자 받기'
            type={enableRequestButton}
            onClick={onClickReceiveButton}
          />
        ) : (
          <Button
            text={`인증문자 다시 받기 (${Math.floor(
              timeLeft / 60
            )}분 ${Math.floor(timeLeft % 60)}초)`}
            type={'nomal'}
            onClick={onClickReceiveButton}
          />
        )}
        {requestAuthentication && (
          <VerificationCode name={name} phoneNumber={phoneNumber} />
        )}
      </Content>
      {loginAlertModal && <LoginAlertModal onClosed={loginAlertModalHandler} />}
    </Layout>
  );
};

export const getServerSideProps = async (context: any) => {
  // 로그인 여부 확인
  const cookie = context.req ? context.req.headers.cookie : '';

  let token = cookie ? getCookieValue(cookie, 'token') : null;

  return {
    props: {
      token,
    },
  };
};

export default Login;
