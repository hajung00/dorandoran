import React, { useCallback, useEffect, useState } from 'react';

// import styles
import { InputWrapper } from '@/pages/login';

// import svg
import AlertIcon from '../../public/icons/alert-circle.svg';

// import components
import Button from '../Button';
import { useRouter } from 'next/router';
import useUserAccount from '@/hooks/useUserAccount';
import { loginAPI } from '@/pages/api/user';
import styled from 'styled-components';

const VerificationCodeStyle = styled.section`
  margin-top: 24px;
`;

interface Props {
  name: string;
  phoneNumber: string;
}

const VerificationCode = ({ name, phoneNumber }: Props) => {
  const router = useRouter();
  const { initializeUserAccount } = useUserAccount();

  const [verificationCode, setVerificationCode] = useState(''); // 인증번호
  const [authenticationError, setAuthenticationError] = useState(false); // 인증번호 확인
  const [enableCheckButton, setEnableCheckButton] = useState(false); // 인증번호 확인 버튼 활성화 여부

  const onChangeVerificationCode = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setVerificationCode(e.target.value);
      setAuthenticationError(false);
    },
    []
  );

  // 인증번호 확인 버튼 활성화 여부 확인
  useEffect(() => {
    if (verificationCode.length === 6) {
      setEnableCheckButton(true);
    } else {
      setEnableCheckButton(false);
    }
  }, [verificationCode]);

  // 인증문자 확인 버튼 클릭
  const onClickCheckButton = useCallback(async () => {
    if (enableCheckButton) {
      // 이름, 핸드폰 번호 전역으로 저장
      initializeUserAccount({
        name: name,
        phoneNumber: phoneNumber,
      });

      // 인증번호 확인, 로그인 api 요청
      const result = await loginAPI(phoneNumber, verificationCode);

      // 인증번호 확인 성공 및 로그인(토큰 O => 기존 회원)
      if (result.status === 200 && result.token) {
        return router.push('/counsel');
      } else if (result.status === 200 && !result.token) {
        // 인증번호 확인 성공 및 회원가입(토큰 X => 새로운 회원)
        return router.push('/login/select-organization');
      } else if (result === 400) {
        // 인증번호 확인 실패
        setAuthenticationError(true);
      }
    }
  }, [name, phoneNumber, enableCheckButton, verificationCode]);

  return (
    <VerificationCodeStyle>
      <InputWrapper bordercolor={`${authenticationError}`}>
        <label>인증번호</label>
        <div>
          <input
            type='number'
            placeholder='인증번호를 입력해주세요.'
            value={verificationCode}
            onChange={onChangeVerificationCode}
            onInput={(el: any) => {
              if (el.target.value.length > 6) {
                el.target.value = el.target.value.substr(0, 6);
              }
            }}
          />
          {authenticationError && (
            <>
              <div className='alert-icon-wrapper'>
                <AlertIcon width={24} height={24} alt={'alert'} />
              </div>
              <p className='alert'>
                인증번호가 정확하지 않아요. 다시 입력해주세요.
              </p>
            </>
          )}
        </div>
      </InputWrapper>
      <Button
        text='인증번호 확인'
        type={enableCheckButton}
        onClick={onClickCheckButton}
      />
    </VerificationCodeStyle>
  );
};

export default VerificationCode;
