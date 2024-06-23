import { useRouter } from 'next/router';
import styled from 'styled-components';
import Image from 'next/image';

// import image
import NonLoginPNG from '../../public/image/nonlogin.png';

const NonLoginStyle = styled.div`
  width: 100%;
  padding: 0 2%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  justify-content: center;
  transform: translateY(-13%);

  .description {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 18px;
    border-radius: 16px;
    color: var(--gray09, #222);
    text-align: center;
    font-family: 'Pretendard';
    font-size: clamp(18px, 4.5vw, 22px);
    font-weight: 600;
    line-height: 140%; /* 30.8px */
    letter-spacing: -0.44px;

    & > p {
      width: 100%;
    }
  }

  & > button {
    min-width: fit-content;
    margin: 0 auto;
    margin-top: 50px;
    display: flex;
    width: 61%;
    padding: 4.7% 20px;
    justify-content: center;
    align-items: center;
    gap: 4px;
    border: none;
    border-radius: 18px;
    background: #565bff;
    color: var(--white, #fff);
    font-family: 'Pretendard';
    font-size: clamp(16px, 5vw, 20px);
    font-style: normal;
    font-weight: 600;
    letter-spacing: -0.4px;
    cursor: pointer;
  }
`;

const NonLogin = () => {
  const router = useRouter();

  return (
    <NonLoginStyle>
      <div className='description'>
        <Image
          src={NonLoginPNG}
          width={160}
          height={160}
          alt='non-login-image'
        />
        <p>
          상담을 하기 위해서는 로그인 상태여야 해요! <br />
          아래 버튼을 눌러 로그인을 진행해주세요.
        </p>
      </div>
      <button
        onClick={() => {
          router.push('/login');
        }}
      >
        휴대폰 번호로 로그인하기
      </button>
    </NonLoginStyle>
  );
};

export default NonLogin;
