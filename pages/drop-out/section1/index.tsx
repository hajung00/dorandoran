import React, { useCallback } from 'react';
import styled from 'styled-components';

// import svg
import ArrowSVG from '../../../public/icons/arrow.svg';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import { getCookieValue } from '@/utils/getCookieValue';
import { dropOutAPI } from '@/pages/api/user';
import useSWR from 'swr';
import fetcher from '@/utils/fetchers';

const Header = styled.header`
  padding: 60px 20px 0 20px;
  color: #222;

  .icon-wrapper {
    padding: 10.5px 8px;
    cursor: pointer;
  }
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 20px;

  .title {
    margin-top: 24px;
    color: var(--gray09, #222);
    font-family: 'Pretendard';
    font-size: 26px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 39px */
    letter-spacing: -0.52px;

    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 22px;
      background: #f7f7f7;
      position: absolute;
      left: 0;
      margin-top: 24px;
      margin-bottom: 30px;
    }
  }

  .description {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: start;
    margin-top: 76px;

    .icon {
      width: 80px;
      height: 80px;
      background: var(--gray02, #eaeaea);
      margin-bottom: 33px;
    }
    .main-description {
      color: var(--gray09, #222);
      text-align: center;
      font-family: 'Pretendard';
      font-size: 22px;
      font-weight: 600;
      line-height: 150%; /* 33px */
      margin-bottom: 12px;
    }
    .sub-description {
      color: var(--gray06, #898989);
      font-family: 'Pretendard';
      font-size: 18px;
      font-style: normal;
      font-weight: 500;
      line-height: 150%; /* 27px */
      margin-bottom: 14px;
    }
  }

  & > button {
    width: 100%;
    border-radius: 18px;
    background: #565bff;
    border: none;
    color: #fff;
    font-family: 'Pretendard';
    font-size: 20px;
    font-weight: 600;
    letter-spacing: -0.4px;
    bottom: 0;
    margin-bottom: 26px;
    padding: 4.5% 0;
    cursor: pointer;
  }
`;

interface Props {
  token: string;
}
const DropOut1 = ({ token }: Props) => {
  const router = useRouter();
  const { data: userData } = useSWR('/api/mypage/main', (url) =>
    fetcher(url, token)
  );

  // 회원 탈퇴
  const DropOutHandler = useCallback(async () => {
    if (token) {
      const result = await dropOutAPI(token);
      console.log(result);
      if (result === 200) {
        router.push('/drop-out/section2');
      }
    }
  }, [token]);

  return (
    <Layout>
      <Header>
        <div
          className='icon-wrapper'
          onClick={() => {
            router.push('/mypage');
          }}
        >
          <ArrowSVG width={21} height={21} alt={'prev'} />
        </div>
      </Header>
      <Content>
        <div className='title'>
          {userData?.name}님,
          <br />
          헤어져야한다니 아쉬워요.
        </div>
        <div className='description'>
          <p className='main-description'>도란도란을 탈퇴하시게 되면,</p>
          <p className='sub-description'>
            도란도란에서 그동안 상담하셨던 내역들과
            <br />
            심리검사 결과 및 변화추이들이 모두 사라져요.
            <br />
          </p>
          <p className='sub-description'>정말 탈퇴하시겠어요?</p>
        </div>
        <button onClick={DropOutHandler}>탈퇴할게요</button>
      </Content>
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

export default DropOut1;
