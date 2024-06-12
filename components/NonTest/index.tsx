import { useRouter } from 'next/router';
import styled from 'styled-components';

// import image
import NonTestPNG from '../../public/image/nontest.png';
import Image from 'next/image';

const NonTestStyle = styled.div`
  width: 100%;
  margin-top: 30px;
  padding: 40px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 26px;
  background: var(--gray01, #f7f7f7);
  height: 100%;

  .description {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
    border-radius: 16px;
    color: var(--gray09, #222);
    text-align: center;
    font-family: 'Pretendard';
    font-size: clamp(18px, 5vw, 22px);
    font-weight: 600;
    line-height: 140%; /* 30.8px */
    letter-spacing: -0.44px;
  }

  & > button {
    margin-top: 29px;
    display: flex;
    width: 260px;
    padding: 4.5% 4px;
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
  }
`;

const NonTest = () => {
  const router = useRouter();
  return (
    <NonTestStyle>
      <div className='description'>
        <Image src={NonTestPNG} width={80} height={80} alt='non-test-png' />
        <p>
          심리검사로 <br />
          현재 내 마음상태 알아보기
        </p>
      </div>
      <button
        onClick={() => {
          router.push('/counsel/psychological-test-intro');
        }}
      >
        심리검사 하러가기
      </button>
    </NonTestStyle>
  );
};

export default NonTest;
